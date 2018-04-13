<html>
	<head>
		<title>PHP Test</title>
	</head>

<body>

<table>

<?php 

date_default_timezone_set('Europe/Berlin' );

$foo=file_get_contents("../data_issues_2018_c.js");
$foo="[".$foo."]";
$arr=json_decode($foo);

$log_db = new PDO('sqlite:../GHdata_2018_1.db');
$sql = 'CREATE TABLE IF NOT EXISTS issue (id INTEGER PRIMARY KEY,issueno VARCHAR(8), issuetime TIMESTAMP, issuetimed INTEGER, issuetimeh INTEGER, author VARCHAR(32), state VARCHAR(32), title TEXT, message TEXT);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS event (id INTEGER PRIMARY KEY,issueno VARCHAR(8), eventtime TIMESTAMP,eventtimed INTEGER, eventtimeh INTEGER, author VARCHAR(32), kind VARCHAR(32), content TEXT, aux TEXT);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS commitdata (id INTEGER PRIMARY KEY,issueno VARCHAR(8), commentno INTEGER, eventno INTEGER, author VARCHAR(32), content TEXT);';
$log_db->exec($sql);

// For every issue
foreach($arr as $key => $issue){
	
		echo "<pre>";
		echo $issue->issuetitle;

		$query = $log_db->prepare('INSERT INTO issue(issueno,issuetime,issuetimed, issuetimeh, author, state, title, message) VALUES (:issueno,:issuetime,:issuetimed,:issuetimeh,:author,:state,:title,:message)');

		if($issue->time!="undefined"){
				$date1=date_create($issue->time);						
		}else{
				$date1=date_create("2014-01-01");;												
		}
		$date2=date_create("2014-01-01");
		$interval=date_diff($date1,$date2);
		$intervald=$interval->format("%a");
		$intervalh=$interval->format("%h");
				
		$query->bindParam(':issueno', $issue->issueno);
		$query->bindParam(':issuetime', $issue->time);
		$query->bindParam(':author', $issue->issueauthor);
		$query->bindParam(':state', $issue->state);
		$query->bindParam(':title', $issue->issuetitle);
		$query->bindParam(':message', $issue->message);
		$query->bindParam(':issuetimeh', $intervalh);
		$query->bindParam(':issuetimed', $intervald);
		$query->execute();
		
//		print_r($issue);
	
//		print_r($issue->events);
	
		foreach($issue->events as $ekey => $event){

				if($event->time!="undefined"){
						$date1=date_create($event->time);						
				}else{
						$date1=date_create("2014-01-01");;												
				}
				$date2=date_create("2014-01-01");

				$interval=date_diff($date1,$date2);
				$intervald=$interval->format("%a");
				$intervalh=$interval->format("%h");

				$kind=$event->kind;

				$content="UNK";
			
				$aux="UNK";

				$query = $log_db->prepare('INSERT INTO event(issueno, author, content,eventtime,eventtimed,eventtimeh,kind,aux) VALUES (:issueno,:author,:content,:eventtime,:eventtimed,:eventtimeh,:kind,:aux)');
				$query->bindParam(':issueno', $issue->issueno);
				$query->bindParam(':eventtime', $event->time);
				$query->bindParam(':eventtimed', $intervald);
				$query->bindParam(':eventtimeh', $intervalh);
				$query->bindParam(':author', $event->eventauthor);
				$query->bindParam(':kind', $event->text);
				$query->bindParam(':content', $content);
				$query->bindParam(':aux', $aux);			
				$query->execute();
			
				echo $issue->issueno."\n".$event->time."\n".$intervald."\n".$event->eventauthor."\n".$event->text."\n".$content;

			/*
			
				if($kind=="Commit"){
						$commits=explode(",",$event->commits);

						for ($i = 0; $i < count($commits)-1; $i+=2) {
								$query = $log_db->prepare('INSERT INTO commitdata(issueno, commentno, eventno, author, content) VALUES (:issueno,:commentno,:eventno,:author,:content)');
								$query->bindParam(':issueno', $issue->issueno);
								$query->bindParam(':commentno', $ckey);				
								$query->bindParam(':eventno', $ekey);				
								$query->bindParam(':author', $commits[$i+1]);
								$query->bindParam(':content', substr($commits[$i],-40,40));
								$query->execute();
						}	
				}
			*/


		}
				
}

echo "\n</pre>";

?> 

</table>

</body>
</html>