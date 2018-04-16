<html>
	<head>
		<title>PHP Test</title>
		<style>
				table {
				    border-collapse: collapse;
				}
				
				table, th, td {
				    border: 1px solid black;
				    vertical-align: top;
				    padding-left:6px;
				}
		</style>	
	</head>

<body>

<table style="">

<?php 

// Tables
// ---------
// file
//
// File
// 		purl
// 		path
//		filename
//		fileinfo
//		harvestdate
//		filelines
//		filesize
// Blame
//		blamedate
//		blameuser  <- author varchar(32)
//		href
// 		mess
//		rowcnt
//		fileid
// Row
//		rowno
//		code
//		blameid
//		blameuser  <- author varchar(32)
        
date_default_timezone_set('Europe/Berlin' );
    
set_time_limit (5000);

$foo=file_get_contents("../GHData/data_blame_2018_1.js");

$log_db = new PDO('sqlite:../GHData/GHdata_2018_1.db');
$sql = 'CREATE TABLE IF NOT EXISTS Bfile (id INTEGER PRIMARY KEY, purl TEXT, path TEXT, filename VARCHAR(256), filesize REAL, filelines INTEGER, harvestdate TIMESTAMP);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS Blame (id INTEGER PRIMARY KEY, blamedate TIMESTAMP, blameuser VARCHAR(32), href VARCHAR(64),mess TEXT, rowcnt INTEGER, fileid INTEGER);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS CodeRow(id INTEGER PRIMARY KEY, fileid INTEGER, blameid INTEGER, blameuser VARCHAR(32), rowno INTEGER, code TEXT);';
$log_db->exec($sql);

$startpos=1;
$endpos=strlen($foo);

$j=0;
$i=$startpos;

while($i < $endpos){
		set_time_limit ( 10 );
		$workstr="";
		$cnt=0;
		$fo=0;
		while($fo==0){
			$workchr=substr($foo,$i,1);
			if($workchr=="{"){
					$cnt++;	
			}else if($workchr=="}"){
					$cnt--;
					if($cnt==0){
							$fo=1;
							$i++;
					}
			}
			if($foo==0) $workstr.=$workchr;
		
			$i++;
			
		}

		$fileo=json_decode($workstr);
		$j++;

		$purl=$fileo->purl;
		$path=$fileo->path;
		$filename=$fileo->filename;
		$fileinfo=$fileo->fileinfo;
		$fileinfo=substr($fileinfo,7);
		$filelines=substr($fileinfo,0,strpos($fileinfo," "));
		$filez=substr($fileinfo,0,strrpos($fileinfo," "));
		$filesize=substr($filez,strrpos($filez," "));
		
		$harvestdate=date('Y-m-d H:i:s');
		
		echo "<tr>";
		echo "<td>".$purl."</td>";
		echo "<td>".$path."</td>";
		echo "<td>".$filename."</td>";
		echo "<td>".$filelines."</td>";
		echo "<td>".$filesize."</td>";
		echo "<td>".$harvestdate."</td>";
		echo "<td>".$i."</td>";
		echo "</tr>";
		
		$query = $log_db->prepare('INSERT INTO Bfile(purl,path,filename, filesize, filelines, harvestdate) VALUES (:purl,:path,:filename,:filesize,:filelines,:harvestdate)');
		$query->bindParam(':purl', $purl);
		$query->bindParam(':path', $path);
		$query->bindParam(':filename', $filename);
		$query->bindParam(':filelines', $filelines);
		$query->bindParam(':filesize', $filesize);
		$query->bindParam(':harvestdate', $harvestdate);
		$query->execute();
		
		$fileid=$log_db->lastInsertId(); 
		
		foreach($fileo->blames as $bkey => $blame){		
				$rowcnt=$blame->rowcnt;				
				$blamedate=$blame->blamedate;
				$blameuser=$blame->blameuser;	
				$blameuser=$blameuser;		
				$href=substr($blame->href,21);
				$mess=$blame->mess;
				
				$query = $log_db->prepare('INSERT INTO Blame(blamedate,blameuser,href,mess,rowcnt,fileid) VALUES (:blamedate,:blameuser,:href,:mess,:rowcnt,:fileid)');

				$query->bindParam(':blamedate', $blamedate);
				$query->bindParam(':blameuser', $blameuser);
				$query->bindParam(':href', $href);
				$query->bindParam(':mess', $mess);
				$query->bindParam(':rowcnt', $rowcnt);
				$query->bindParam(':fileid', $fileid);

				$query->execute();
				$blameid=$log_db->lastInsertId(); 
				
				foreach($blame->rows as $rkey => $row){		
						echo "<tr>";

						$rowno=$row->row;
						$code=$row->code;
						
						$code=str_replace("__","&lt;",$code);
						$code=str_replace("**","&gt;",$code);

						$query = $log_db->prepare('INSERT INTO CodeRow(fileid,blameid,blameuser,rowno,code) VALUES (:fileid,:blameid,:blameuser,:rowno,:code)');
		
						$query->bindParam(':fileid', $fileid);
						$query->bindParam(':blameid', $blameid);
						$query->bindParam(':blameuser', $blameuser);
						$query->bindParam(':rowno', $rowno);
						$query->bindParam(':code', $code);
						$query->execute();
				}
				
		}

}


?> 

</table>

</body>
</html>