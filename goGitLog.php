<html>
	<head>
		<title>PHP Test</title>
	</head>

<body>

<?php 

require 'substitution.php';

$commits=Array();


$handle = fopen("../gitlog.txt", "r");
if ($handle) {
    $i=0;
    while (($line = fgets($handle)) !== false) {
        $i++;
        // if($i>400) break;

        $parents=Array();
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

        $commits[$commitid]=$commit;
    }
    fclose($handle);
} else {
    // error opening the file.
} 

echo count($commits);

echo "</pre>"

echo "<table style='font-family:courier;font-size:12px;' border=1>";
foreach($commits as $commit){
    echo "<tr>";
    echo "<td>".$commit['commitid']."</td>";

    echo "<td>";
    foreach($commit['parents'] as $parent){
        echo "<div>".$parent."</div>";
    }
    echo "</td>";

    echo "</tr>";
}
echo "</table>";

?>

</body>
</html>
