<?php 

// Git Log ... git log --reverse --all --date=iso --parents

require 'substitution.php';

$commits=Array();
$spaces=Array("FIRST");

$colors=Array("#246","#26A","#4BA","#59C","#DE7","#FB5","#FD5","#E64","#85A","#45A");


// We look for latest empty space in spaces array
function findLatestSpace($itemid,$currdate)
{
    global $spaces;
    $treshold=90;
    $currdate=date_create($currdate);

    for($i=1;$i<count($spaces);$i++){
        if($spaces[$i]=="UNK"){
            $spaces[$i]=Array($itemid,$currdate);
            return $i;
        }else{
            $interval=$currdate->diff($spaces[$i][1])->format("%a");            ;
            if($interval>$treshold){
                $spaces[$i]=Array($itemid,$currdate);
                return $i;              
            }
        }
    }

    $spaces[$i]=Array($itemid,$currdate);

    return $i;
}

function clearLatestSpace($ind)
{
    global $spaces;
    if(isset($spaces[$ind])) $spaces[$ind]="UNK";
}

// X is Commit Order Y is Commit Nesting
function svgline($x1,$y1,$x2,$y2,$xmul,$ymul)
{
    global $colors;
    $str="";
    $strokew=$xmul*0.1;
    
    $col=$colors[$y1%count($colors)];

    if((abs($x2-$x1)>1)&&($y1!=$y2)){
        $str.="<line x1='".($x1*$xmul)."'  y1='".($y1*$ymul)."' x2='".(($x2-1)*$xmul)."' y2='".($y1*$ymul)."' stroke='".$col."' style='stroke-width:".$strokew."' />";
        $str.="<line x1='".(($x2-1)*$xmul)."'  y1='".($y1*$ymul)."' x2='".($x2*$xmul)."' y2='".($y2*$ymul)."' stroke='".$col."' style='stroke-width:".$strokew."' />";
    }else{
        $str.="<line x1='".($x1*$xmul)."'  y1='".($y1*$ymul)."' x2='".($x2*$xmul)."' y2='".($y2*$ymul)."' stroke='".$col."' style='stroke-width:".$strokew."' />";
    }

    return($str);
}

function svgcirc($cx,$cy,$xmul,$ymul,$texty,$intext)
{
  $str="";
  //$str.="<text x='".($cx*$xmul)."' y='".(($cy*$ymul)-$texty)."' alignment-baseline='middle' text-anchor='middle' font-family='Arial Narrow' font-size='12' >";
  //$str.=$intext;
  //$str.="</text>";
  $str.="<circle id='".$intext."' cx='".($cx*$xmul)."' cy='".($cy*$ymul)."' r='0.1'/>";      
  return $str;
}

$handle = fopen("../gitlog.txt", "r");
$commit=NULL;
$commitid=NULL;
if ($handle) {
    $i=0;
    $commitrow=0;
    $message="UNK";
    while (($line = fgets($handle)) !== false) {
        $i++;
        $login="";
        $commitrow++;

        if(strpos($line,"commit")===0){
            
            if($commit!==NULL){
                $commits[$commitid]=$commit;
            }
            $commit=Array();

            $parents=explode(" ",$line);
            $commitid=trim($parents[1]);
            array_shift($parents);
            array_shift($parents);
            $commitrow=0;
            $content="";

            $commit['commitid']=$commitid;
            $commit['parents']=$parents;  
            $commit['children']=Array();
            $commit['message']=$message; 
            $commit['space']=-100;
            $commit['time']=-100;
            
            $message="UNK";
        }else if(strpos($line,"Author")===0){
            $author=substr($line,8);
            $authorname=substr($author,0,strpos($author,"<")-1);
            $author=substr($author,strpos($author,"<")+1,strpos($author,">")-strpos($author,"<")-1);
            $author=substr($author,0,strpos($author,"@"));
            $author=str_replace(' ', '', $author);

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
            $commit['author']=$login;            
            // if(strlen($login)!=8) echo $author." ".$authorname." ".$commitid."\n";
        }else if(strpos($line,"Date")===0){
            $cdate=substr($line,7);
            $commit['cdate']=trim($cdate);
        }else if(strpos($line,"Merge")===0){
            $commitrow--;
        }else{
            if($commitrow==4){
                $message=str_replace(array("\n", "\r"),"",trim($line));
                $message=str_replace(array("<", ">",'"',"'","\\","/"),"",$message);                
              }else{
                $content.=str_replace(array("\n", "\r"),"",trim($line));
            }
        }

    }
    fclose($handle);
} else {
    // error opening the file.
}

$free=Array();

$i=0;
$latestspace=0;
foreach($commits as &$commit){
    $commitid=$commit['commitid'];
    $parents=$commit['parents'];
    $parentcnt=count($commit['parents']);
    $commitdate=$commit['cdate'];

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
            $parent=$commits[trim($parents[0])];
            if($parent['space']==-100){
                // If parent comes after child (rare)
                $commit['time']=findLatestSpace($commitid,$commitdate);
                $commit['space']=$latestspace;
            }else{
                $commit['space']=$parent['space']+1;
                // Save latest branch space
                $latestspace=$commit['space'];
                if(count($parent['children'])==1){
                    $commit['time']=$parent['time'];
                }else{
                  $commit['time']=findLatestSpace($commitid,$commitdate);
                }
            }
          }else{
            // If a merge
            $parentA=$commits[trim($commit['parents'][0])];
            $parentB=$commits[trim($commit['parents'][1])];
            $parentAChildCount=count($parentA['children']);
            $parentBChildCount=count($parentB['children']);

            // Default -1
            $commit['time']=-1;

            if($parentA['space']==-100){
                $parentA['space']=$latestspace;
            }
            if($parentB['space']==-100){
                $parentB['space']=$latestspace;
            }
            if($parentA['time']==-100){
                $parentA['time']=findLatestSpace($commitid,$commitdate);
            }
            if($parentB['time']==-100){
                $parentB['time']=findLatestSpace($commitid,$commitdate);
            }

            // Kinds of merges
            if(($parentAChildCount==1)&&($parentBChildCount==1)){
                // Both branches have no additional children - we continue from lowest
                if($parentA['time']>=$parentB['time']){
                    // Close ParentA use ParentB
                    $commit['time']=$parentB['time'];
                    clearLatestSpace($parentA['time']);    
                }else{
                    // Close ParentB use ParentA
                    $commit['time']=$parentA['time'];    
                    clearLatestSpace($parentB['time']);    
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
                // Neither can directly be a parent - generate new space - No closing
                $commit['time']=findLatestSpace($commitid,$commitdate);
                $type="D";
             }

            // We pick the front commit as the x coordinate of new commit
            $commit['space']=max($parentA['space'],$parentB['space'])+1;
        }
        //echo "<div>".$commitid."</div>";
        if($commitid=="a95eb2ada40fc3f17d03b40bc498956565da0b0f"){
            $commit['time']=0;
        }
    }
   
    $i++;
    //if($i>2350) break;

    unset($commit);
}

$i=0;

$str="<svg width='2000' height='1000' viewBox='-100 -100 2000 1000' >";

$json="[";

$tab="<table style='font-family:courier;font-size:12px;' border=1>";
$tab.="<tr><th>ID</th><th>space</th><th>time</th><th>parents</th><th>children</th></tr>";
foreach($commits as $commitid => $commit){
    $i++;
    // if($i>2350) break;
    if($i!=1) $json.=",\n";
    $json.="{\n";

    if(!isset($commit['message'])) print_r($commit);

    $json.='"id":"'.$commit['commitid'].'",'."\n";    
    $json.='"author":"'.$commit['author'].'",'."\n";
    $json.='"message":"'.$commit['message'].'",'."\n";    
    $json.='"space":"'.$commit['time'].'",'."\n";
    $json.='"time":"'.$commit['space'].'",'."\n";
    $json.='"date":"'.$commit['cdate'].'",'."\n";

    $json.='"parents":[';
    $j=0;
    foreach($commit['parents'] as $parent){
        if($j!=0) $json.=",";
        $json.='"'.trim($parent).'"';
        $j++;
    }
    $json.="],\n";

    $json.='"children":[';
    $j=0;
    foreach($commit['children'] as $child){
        if($j!=0) $json.=",";
        $json.='"'.trim($child).'"';
        $j++;
    }
    $json.="]\n";

    $tab.= "<tr>";
    $tab.= "<td>".substr($commitid,0,4)."</td>";


    $tab.= "<td>".$commit['space']."</td>";    
    $tab.= "<td>".$commit['time']."</td>";

    $cx=$commit['space'];
    $cy=$commit['time'];

    $str.=svgcirc($cx,$cy,0.5,0.5,-10,substr($commitid,0,4));

    $tab.= "<td>";
    foreach($commit['parents'] as $parent){
        $tab.= "<div>".substr($parent,0,4)."</div>";
        $px=$commits[trim($parent)]['space'];
        $py=$commits[trim($parent)]['time'];
        $str.=svgline($px,$py,$cx,$cy,0.5,0.5);
    }
    $tab.= "</td>";

    $tab.= "<td>";
    foreach($commit['children'] as $child){
        $tab.= "<div>".substr($child,0,4)."</div>";
    }
    $tab.= "</td>";

    $tab.= "</tr>";
    $json.="}";
}
$tab.= "</table>";

$json.="]\n";

// echo $tab;
//echo $str;

header('Content-Type: application/json'); 
//header('Content-Type: application/txt'); 
echo $json;

/*
echo "<table>";
foreach($spaces as $key=>$item){
    if($key>0){
        echo "<tr>";
        echo "<td>".$key."</td>";
        echo "<td>".$item[0]."</td>";
        echo "<td>".$item[1]->format('Y-m-d H:i:s')."</td>";
        echo "</tr>";
    }
}
echo "</table>";
*/

// echo $str;



?>