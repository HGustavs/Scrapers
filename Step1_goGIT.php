<html>
	<head>
		<title>PHP Test</title>
	</head>

<body>

<table>

<?php 

/*

This is just commits from the graph data file

*/

date_default_timezone_set('Europe/Berlin' );

$foo=file_get_contents("../GitCommitsOld.js");
$arr=json_decode($foo);

$log_db = new PDO('sqlite:../GHdata_2018_1.db');
$sql = 'CREATE TABLE IF NOT EXISTS commitgit(id INTEGER PRIMARY KEY,cid VARCHAR(40),p1id VARCHAR(40),p2id VARCHAR(40),author VARCHAR(32),authornme VARCHAR(32),thedate TIMESTAMP,p1start INTEGER,p1end INTEGER,p2start INTEGER,p2end INTEGER, space INTEGER, thetime TIMESTAMP, thetimed INTEGER, thetimeh INTEGER,message TEXT);';
$log_db->exec($sql);

// For every issue
foreach($arr as $key => $commit){

		$p1ID="UNK";
		$p2ID="UNK";
		$p1Start="UNK";
		$p2Start="UNK";
		$p1End="UNK";
		$p2End="UNK";
		
		// Commit or merge
		if(isset($commit->parents[0])){
				if(isset($commit->parents[1])){
						$p2ID=$commit->parents[1][0];
						$p2Start=$commit->parents[1][1];;
						$p2End=$commit->parents[1][2];;
				}
				$p1ID=$commit->parents[0][0];
				$p1Start=$commit->parents[0][1];;
				$p1End=$commit->parents[0][2];;
		}
		$author=$commit->author;
		$login=$commit->login;
		$date=$commit->date;
		$space=$commit->space;
		
		$time=$commit->time;
		$date1=date_create($commit->date);						
		$date2=date_create("2014-01-01");
		$interval=date_diff($date1,$date2);
		$intervald=$interval->format("%a");
		$intervalh=$interval->format("%h");
		
		
		$id=$commit->id;
		$message=$commit->message;
		
		$query = $log_db->prepare('INSERT INTO commitgit(cid,p1id,p2id,p1start,p2start,p1end,p2end,space,thetime,thetimed,thetimeh,thedate,author,authornme,message) VALUES (:cid,:p1id,:p2id,:p1start,:p2start,:p1end,:p2end,:space,:thetime,:thetimed,:thetimeh,:thedate,:author,:authornme,:message);');
		
		$query->bindParam(':cid', $id);
		$query->bindParam(':p1id', $p1ID);
		$query->bindParam(':p2id', $p2ID);
		$query->bindParam(':p1start', $p1Start);
		$query->bindParam(':p2start', $p2Start);
		$query->bindParam(':p1end', $p1End);
		$query->bindParam(':p2end', $p2End);

		$query->bindParam(':space', $space);
		$query->bindParam(':thetime', $time);
		$query->bindParam(':thetimed', $intervald);
		$query->bindParam(':thetimeh', $intervalh);

		$query->bindParam(':thedate', $date);
		
		$query->bindParam(':authornme', $author);
		$query->bindParam(':message', $message);
		$query->bindParam(':author', $login);

		$query->execute();

}

$foo=file_get_contents("../GitCommits2018_1.js");
$arr=json_decode($foo);

$sql = 'CREATE TABLE IF NOT EXISTS commitgit(id INTEGER PRIMARY KEY,cid VARCHAR(40),p1id VARCHAR(40),p2id VARCHAR(40),author VARCHAR(32),authornme VARCHAR(32),thedate TIMESTAMP,p1start INTEGER,p1end INTEGER,p2start INTEGER,p2end INTEGER, space INTEGER, thetime TIMESTAMP, thetimed INTEGER, thetimeh INTEGER,message TEXT);';
$log_db->exec($sql);

// For every issue
foreach($arr as $key => $commit){
			
		$p1ID="UNK";
		$p2ID="UNK";
		$p1Start="UNK";
		$p2Start="UNK";
		$p1End="UNK";
		$p2End="UNK";
		
		// Commit or merge
		if(isset($commit->parents[0])){
				if(isset($commit->parents[1])){
						$p2ID=$commit->parents[1][0];
						$p2Start=$commit->parents[1][1];;
						$p2End=$commit->parents[1][2];;
				}
				$p1ID=$commit->parents[0][0];
				$p1Start=$commit->parents[0][1];;
				$p1End=$commit->parents[0][2];;
		}
		$author=$commit->author;
		$login=$commit->login;
		$date=$commit->date;
		$space=$commit->space;
		
		$time=$commit->time;
		$date1=date_create($commit->date);						
		$date2=date_create("2014-01-01");
		$interval=date_diff($date1,$date2);
		$intervald=$interval->format("%a");
		$intervalh=$interval->format("%h");
		
		
		$id=$commit->id;
		$message=$commit->message;
		
		$query = $log_db->prepare('INSERT INTO commitgit(cid,p1id,p2id,p1start,p2start,p1end,p2end,space,thetime,thetimed,thetimeh,thedate,author,authornme,message) VALUES (:cid,:p1id,:p2id,:p1start,:p2start,:p1end,:p2end,:space,:thetime,:thetimed,:thetimeh,:thedate,:author,:authornme,:message);');

		$p1Start+=2733;
		if($p2Start!="UNK") $p2Start+=2733;
		$time+=2733;
	
		$query->bindParam(':cid', $id);
		$query->bindParam(':p1id', $p1ID);
		$query->bindParam(':p2id', $p2ID);
		$query->bindParam(':p1start', $p1Start);
		$query->bindParam(':p2start', $p2Start);
		$query->bindParam(':p1end', $p1End);
		$query->bindParam(':p2end', $p2End);

		$query->bindParam(':space', $space);
		$query->bindParam(':thetime', $time);
		$query->bindParam(':thetimed', $intervald);
		$query->bindParam(':thetimeh', $intervalh);

		$query->bindParam(':thedate', $date);
		
		$query->bindParam(':authornme', $author);
		$query->bindParam(':message', $message);
		$query->bindParam(':author', $login);

		echo "<tr>";
		echo "<td>".$p1Start."</td>";
		echo "<td>".$p2Start."</td>";
		echo "<td>".$time."</td>";
		echo "</tr>";

		$query->execute();

}
	
?> 

</table>

</body>
</html>