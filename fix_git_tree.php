<?php 
header("Content-type: text/plain");
header("Content-Disposition: attachment; filename=savethis.txt");
ini_set("auto_detect_line_endings", true);
		//	echo "<pre>";

		echo "[\n";

		$handle = fopen("../GHData/data_commits_unfixed_2019_10.js", "r");
		$i=0;
		if ($handle) {
				$i++;
				while (($line = fgets($handle)) !== false) {
						$objlist=explode('},',$line);
						$end = end($objlist);
						foreach($objlist as $key => $value){
								$value=str_replace('{"commits":[',"",$value);
								//echo substr($value,-3,2); 
								if(substr($value,-2,1)=="}"){
									$value=str_replace('}]}','},',$value);
									echo $value;
								}else{
									echo $value;
									if($end!=$value) echo "},\n";
								}
						}
				}
		}

		echo "\n]\n";

?>