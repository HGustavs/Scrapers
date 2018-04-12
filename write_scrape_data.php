<?php
    if(isset($_POST['fname'])){
        $file="../".$_POST['fname'];
    }else{
        $file="../scrapeData.js";	
		}

		echo $file;

    $fp=fopen($file,"a");
  	fputs ($fp, $_POST['str']);
    fclose ($fp);	
?>