<html>
	<head>
		<title>PHP Test</title>
	</head>

<body>

<?php 

require 'substitution.php';

$commits=Array();
$spaces=Array("FIRST");

// We look for latest empty space in spaces array
function findLatestSpace($itemid)
{
    global $spaces;

    for($i=0;$i<count($spaces);$i++){
        if($spaces[$i]==""){
            $spaces[$i]=$itemid;
            return $i;
        }
    }

    $spaces[$i]=$itemid;
    return $i;

}

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
            $commitid=trim($parents[1]);
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

echo count($commits);
echo "</pre>";

$free=Array();

$i=0;
echo "<table style='font-family:courier;font-size:12px;' border=1>";
foreach($commits as &$commit){
    // Variables
    $commitid=$commit['commitid'];
    $parents=$commit['parents'];
    $parentcnt=count($commit['parents']);

    // Update parents with reference to child
    foreach($parents as $parentid){
        $parent=&$commits[trim($parentid)];
        array_push($parent['children'],$commitid);
        unset($parent);
    }

    if($i==0){
        $commit['space']=0;
        $commit['time']=0;
    }else{
        if($parentcnt==1){
            // If a branch
            $parent=$commits[trim($parentid)];
            $commit['space']=$parent['space']+1;
            if(count($parent['children'])==1){
                $commit['time']=$parent['time'];
            }else{
              $commit['time']=findLatestSpace($commitid);
            }
          }else{
            // If a merge
            $parentA=$commits[trim($commit['parents'][0])];
            $parentB=$commits[trim($commit['parents'][1])];
            $parentAChildCount=count($parentA['children']);
            $parentBChildCount=count($parentB['children']);

            // Default -1
            $commit['time']=-1;

            // Kinds of merges
            if(($parentAChildCount==1)&&($parentBChildCount==1)){
                // Both branches have no additional children - we continue from lowest
                if($parentA['time']>=$parentB['time']){
                    // Close ParentA use ParentB
                    $commit['time']=$parentB['time'];    
                }else{
                    // Close ParentB use ParentA
                    $commit['time']=$parentA['time'];    
                }
                $type="A";
            }else if(($parentAChildCount>1)&&($parentBChildCount==1)){
                // Parent A has multiple Children - but parent B does not - No closing
                $commit['time']=$parentB['time'];                 
                $type="B";
             }else if(($parentAChildCount==1)&&($parentBChildCount>1)){
                // Parent B has multiple Children - but parent A does not - No closing
                $commit['time']=$parentA['time'];                 
                $type="C";
             }else{
                // Neither can directly be a parent - generate new space
                $commit['time']=findLatestSpace($commitid);
                $type="A";
             }

            echo "<div>";
            echo substr($commitid,0,4)." ".$type." A ".$parentA['space']." B ".$parentB['space'];
            echo "</div>";            
            
            // We pick the front commit as the x coordinate of new commit
            $commit['space']=max($parentA['space'],$parentB['space'])+1;
        }
    }
    
    if($i++==75) break;

    unset($commit);
}
echo "</table>";

$i=0;

$str="<svg width='2000' height='1000' viewBox='-100 -100 2000 1000' >";

echo "<table style='font-family:courier;font-size:12px;' border=1>";
echo "<tr><th>ID</th><th>space</th><th>time</th><th>parents</th><th>children</th></tr>";
foreach($commits as $commitid => $commit){

    if($i++==75) break;

    echo "<tr>";
    echo "<td>".substr($commitid,0,4)."</td>";

    echo "<td>".$commit['space']."</td>";    
    echo "<td>".$commit['time']."</td>";

    $cx=$commit['space']*25;
    $cy=$commit['time']*28;

    $str.="<text x='".$cx."' y='".($cy-10)."' alignment-baseline='middle' text-anchor='middle' font-family='Arial Narrow' font-size='12' >".substr($commitid,0,4)."</text>";
    $str.="<circle cx='".$cx."' cy='".$cy."' r='5'/>";

    echo "<td>";
    foreach($commit['parents'] as $parent){
        echo "<div>".substr($parent,0,4)."</div>";
        $px=$commits[trim($parent)]['space']*25;
        $py=$commits[trim($parent)]['time']*28;
        $str.="<line x1='".$cx."'  y1='".$cy."' x2='".$px."' y2='".$py."' style='stroke:rgb(255,0,0);stroke-width:2' />";
    }
    echo "</td>";

    echo "<td>";
    foreach($commit['children'] as $child){
        echo "<div>".substr($child,0,4)."</div>";
    }
    echo "</td>";

    echo "</tr>";
}
echo "</table>";

echo $str;

?>


</body>
</html>
