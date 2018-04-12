<html>
	<head>
		<title>PHP Test</title>
	</head>

<body>

<table>

<?php 

date_default_timezone_set('Europe/Berlin' );

$foo=file_get_contents("../data_issues_2018_1.js");
$arr=json_decode($foo);

$log_db = new PDO('sqlite:../GHdata_2018_1.db');
$sql = 'CREATE TABLE IF NOT EXISTS issue (id INTEGER PRIMARY KEY,issueno VARCHAR(8), issuetime TIMESTAMP, issuetimed INTEGER, issuetimeh INTEGER, author VARCHAR(32), state VARCHAR(32), title TEXT, message TEXT);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS comment (id INTEGER PRIMARY KEY,issueno VARCHAR(8), commentno INTEGER, commenttime TIMESTAMP,commenttimed INTEGER, commenttimeh INTEGER,author VARCHAR(32), content TEXT);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS event (id INTEGER PRIMARY KEY,issueno VARCHAR(8), commentno INTEGER, eventno INTEGER, eventtime TIMESTAMP,eventtimed INTEGER, eventtimeh INTEGER, author VARCHAR(32), kind VARCHAR(32), content TEXT);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS commitdata (id INTEGER PRIMARY KEY,issueno VARCHAR(8), commentno INTEGER, eventno INTEGER, author VARCHAR(32), content TEXT);';
$log_db->exec($sql);

// For every issue
foreach($arr as $key => $issue){
	
		echo "<pre>";
		echo $issue->issuetitle;
		echo "\n</pre>";

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
		
		foreach($issue->comments as $ckey => $comment){		

				$date1=date_create($comment->time);
				$date2=date_create("2014-01-01");
				$interval=date_diff($date1,$date2);
				$intervald=$interval->format("%a");
				$intervalh=$interval->format("%h");

				$query = $log_db->prepare('INSERT INTO comment(issueno, commentno, author, content, commenttime,commenttimed,commenttimeh) VALUES (:issueno,:commentno,:author,:content,:ctime,:ctimed,:ctimeh)');
				$query->bindParam(':issueno', $issue->issueno);
				$query->bindParam(':content', $comment->content);
				$query->bindParam(':author', $comment->commentauthor);
				$query->bindParam(':ctime', $comment->time);
				$query->bindParam(':ctimed', $intervald);
				$query->bindParam(':ctimeh', $intervalh);
				$query->bindParam(':commentno', $ckey);				
				$query->execute();

				foreach($comment->events as $ekey => $event){
					
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
						if($kind=="Labeled"){
								$content=$event->label;
						}else if($kind=="Referenced"){
								$content=$event->in;						
						}else if($kind=="Assigned"){
								$content=$event->by;
						}else if($kind=="Merge"){
								$content=$event->commit;
						}else if($kind=="Deleted"){
								$content=$event->branch;
						}else if($kind=="Milestone"){
								$content=$event->Stone;
						}else if($kind=="Renamed"){
								$content=$event->from."___".$event->to;
						}
					
						$query = $log_db->prepare('INSERT INTO event(issueno, commentno, eventno, author, content,eventtime,eventtimed,eventtimeh,kind) VALUES (:issueno,:commentno,:eventno,:author,:content,:eventtime,:eventtimed,:eventtimeh,:kind)');
						$query->bindParam(':issueno', $issue->issueno);
						$query->bindParam(':commentno', $ckey);				
						$query->bindParam(':eventno', $ekey);				
						$query->bindParam(':eventtime', $event->time);
						$query->bindParam(':eventtimed', $intervald);
						$query->bindParam(':eventtimeh', $intervalh);
						$query->bindParam(':author', $event->eventauthor);
						$query->bindParam(':kind', $event->kind);
						$query->bindParam(':content', $content);
						$query->execute();

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
						
						
				}
		}
				
}

?> 

</table>

</body>
</html>