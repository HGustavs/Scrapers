<?php 

$handle = fopen("../issues.txt", "r");
$commit=NULL;
$commitid=NULL;
if ($handle) {
    $i=0;
    $workstr="";
    while (($line = fgets($handle)) !== false) {
        $pos=strpos($line,'{"issueno"');
        if($pos>=0&&$pos<=1){
          echo $workstr;
          $workstr=$line;
          $i++;
        }else{
          $workstr.=$line;
        }
        if($i>1000) break;
    }
    fclose($handle);
} else {
    // error opening the file.
}    

?>