<html>
	<head>
		<title>PHP Test</title>
	</head>

<body>

<?php 

require 'substitution.php';

$commits=Array();

echo "<pre>";

$handle = fopen("../gitlog.txt", "r");
if ($handle) {
    $i=0;
    while (($line = fgets($handle)) !== false) {
        $i++;
        // if($i>400) break;

        //$parents=Array();
        $login="";

        if(strpos($line,"commit")===0){
            $parents=explode(" ",$line);
            $commitid=$parents[1];
            array_shift($parents);
            array_shift($parents);
        }
        if(strpos($line,"Author")===0){
            $author=substr($line,8);
            $authorname=substr($author,0,strpos($author,"<")-1);
            $author=substr($author,strpos($author,"<")+1,strpos($author,">")-strpos($author,"<")-1);
            $author=substr($author,0,strpos($author,"@"));

            if(strpos($author,"+")>0) $author=substr($author,strpos($author,"+")+1);
            //echo $author." ".$authorname."\n";
            if(strlen($author)==8){
                $login=$author;
            }else{
                $login=$authorname;
            }
            if(isset($substitution[$author])){
                $login=$substitution[$author];
            }
            if(isset($substitution[$authorname])){
                $login=$substitution[$authorname];
            }            
            // if(strlen($login)!=8) echo $author." ".$authorname." ".$commitid."\n";
        }

        $commit=Array();
        $commit['parents']=$parents;
        $commit['author']=$login;
        $commit['commitid']=$commitid;
        $commit['children']=Array();

        $commits[$commitid]=$commit;
    }
    fclose($handle);
} else {
    // error opening the file.
} 

// Space is advanced for each new branch from a specific parent space=parent[space]+parent[children];
// If only one parent yk=parent[yk] xk=current++;

echo count($commits);

echo "</pre>";

$free=Array();

$i=0;
echo "<table style='font-family:courier;font-size:12px;' border=1>";
foreach($commits as $commit){

    if($i++==20) break;

    if($i==0){
        $commit['space']=0;
        $commit['time']=0;
    }
    
    $commitid=$commit['commitid'];
    $parents=$commit['parents'];

    if(count($parents)==1){
        // Normal
        $parent=$commits[$parents[0]];
        array_push($parent['children'],$commitid);
    }else if(count($parents)==2){

    }
}
echo "</table>";

$i=0;
echo "<table style='font-family:courier;font-size:12px;' border=1>";
foreach($commits as $commit){

    if($i++==20) break;

    echo "<tr>";
    echo "<td>".$commit['commitid']."</td>";
    echo "<td>".$commit['space']."</td>";
    echo "<td>".$commit['time']."</td>";
    
    echo "<td>";
    foreach($commit['parent'] as $parent){
        echo "<div>".$parent."</div>";
    }
    echo "</td>";

    echo "<td>";
    foreach($commit['children'] as $child){
        echo "<div>".$child."</div>";
    }
    echo "</td>";

    echo "</tr>";
}
echo "</table>";


?>


</body>
</html>
