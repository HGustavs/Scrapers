<?php 
header("Content-type: text/plain");
header("Content-Disposition: attachment; filename=savethis.txt");

$content=file_get_contents("../gitTree2018_1.js");
$objlist=explode('},',$content);

// echo "<pre>";

foreach($objlist as $key => $value){
		echo $value;
		echo "},\n";
}

// echo "</pre>";

?>