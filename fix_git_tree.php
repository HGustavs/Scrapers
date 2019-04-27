<?php 
header("Content-type: text/plain");
header("Content-Disposition: attachment; filename=savethis.txt");
ini_set("auto_detect_line_endings", true);
		//	echo "<pre>";

		echo "[\n";

		$handle = fopen("../GHData/data_commits_2019_2_unfixed.js", "r");
		$i=0;
		if ($handle) {
				$i++;
				while (($line = fgets($handle)) !== false) {
						$objlist=explode('},',$line);
						$end = end($objlist);
						foreach($objlist as $key => $value){
								echo $value;
								if($end!=$value) echo "},\n";
						}
				}
		}

		echo "\n]\n";

		// echo "</pre>";

/*
$content=file_get_contents("../GHData/data_commits_2018_1_unfixed.js");
$objlist=explode('},',$content);



foreach($objlist as $key => $value){
		echo $value;
		echo "},\n";
}
*/
// echo "</pre>";

?>