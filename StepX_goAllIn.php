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

set_time_limit (5000);

//$gittags=array(2014=>"v0.4",2015=>"v0.7",2016=>"v0.85",2017=>"v0.95",2018=>"v0.105");
//$gittags=array(2015=>"v0.7",2016=>"v0.85",2017=>"v0.95",2018=>"v0.105",2019=>"v0.115");
	
date_default_timezone_set('Europe/Berlin' );

$gittags=array(2019=>"v0.115");

$dbname="2021_03";

echo "<h3>".$dbname."</h3>";
	
//$foo=file_get_contents("../GHData/data_commits_Old.js");
//$arr=json_decode($foo);

$log_db = new PDO('sqlite:../GHData/GHdata_'.$dbname.'.db');
// $log_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = 'CREATE TABLE IF NOT EXISTS commitgit(id INTEGER PRIMARY KEY,cid VARCHAR(40) NOT NULL UNIQUE,p1id VARCHAR(40),p2id VARCHAR(40),author VARCHAR(32),thedate TIMESTAMP,p1start INTEGER,p1end INTEGER,p2start INTEGER,p2end INTEGER, space INTEGER, thetime TIMESTAMP, thetimed INTEGER, thetimeh INTEGER,message TEXT);';
$log_db->exec($sql);
	
$sql = 'CREATE TABLE IF NOT EXISTS Bfile (id INTEGER PRIMARY KEY, purl TEXT, path TEXT, filename VARCHAR(256), filesize REAL, filelines INTEGER, harvestdate TIMESTAMP, gittag VARCHAR(16), courseyear VARCHAR(8));';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS Blame (id INTEGER PRIMARY KEY, blamedate TIMESTAMP, blameuser VARCHAR(32), href VARCHAR(64),mess TEXT, rowcnt INTEGER, fileid INTEGER, gittag VARCHAR(16), courseyear VARCHAR(8));';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS CodeRow(id INTEGER PRIMARY KEY, fileid INTEGER, blameid INTEGER, blameuser VARCHAR(32), rowno INTEGER, code TEXT, gittag VARCHAR(16), courseyear VARCHAR(8));';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS issue (id INTEGER PRIMARY KEY,issueno VARCHAR(8), issuetime TIMESTAMP, issuetimed INTEGER, issuetimeh INTEGER, author VARCHAR(32), state VARCHAR(32), title TEXT, message TEXT);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS event (id INTEGER PRIMARY KEY,issueno VARCHAR(8), eventtime TIMESTAMP,eventtimed INTEGER, eventtimeh INTEGER, author VARCHAR(32), kind VARCHAR(32), content TEXT, aux TEXT);';
$log_db->exec($sql);

$sql = 'CREATE TABLE IF NOT EXISTS commitdata (id INTEGER PRIMARY KEY,issueno VARCHAR(8), commentno INTEGER, eventno INTEGER, author VARCHAR(32), content TEXT);';
$log_db->exec($sql);

$foo=file_get_contents("./commits/data_commits_".$dbname.".js");
$arr=json_decode($foo);	

// For every commit
$cont=0;
foreach($arr as $key => $commit){
			
		$p1ID="UNK";
		$p2ID="UNK";
		$p1Start="UNK";
		$p2Start="UNK";
		$p1End="UNK";
		$p2End="UNK";
		
		// Commit or merge
		//print_r($commit);
		if(isset($commit->parents[0])){
				if(isset($commit->parents[1])){
						$p2ID=$commit->parents[1];
						//$p2Start=$commit->parents[1][1];;
						//$p2End=$commit->parents[1][2];;
				}
				$p1ID=$commit->parents[0];
				//$p1Start=$commit->parents[0][1];;
				//$p1End=$commit->parents[0][2];;
		}
		$author=$commit->author;
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
		
		$query = $log_db->prepare('INSERT INTO commitgit(cid,p1id,p2id,p1start,p2start,p1end,p2end,space,thetime,thetimed,thetimeh,thedate,author,message) VALUES (:cid,:p1id,:p2id,:p1start,:p2start,:p1end,:p2end,:space,:thetime,:thetimed,:thetimeh,:thedate,:author,:message);');
	
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

		$query->bindParam(':message', $message);
		$query->bindParam(':author', $login);

		$query->execute();
	
		echo "<tr><td>N</td>";
		echo "<td>".$cont."</td>";
		echo "<td>".$p1ID."</td>";
		echo "<td>".$p2ID."</td>";
		echo "<td>".$time."</td>";
		echo "<td>".$space."</td>";    
		echo "<td style='color:purple;'>".$date."</td>";
		echo "</tr>";	
	
		$cont++;
}

// ---------------================############### Here comes Issues ############==================------------------------------

echo "<tr><td style='font-family:20px;font-weight:bold;'>ISSUES!</td></tr>";
	
$foo=file_get_contents("../GHData/data_issues_".$dbname.".js");
$foo=substr($foo, 1);
$foo="[".$foo."]";

$arr=json_decode($foo);	

echo "<tr><td>";
   echo json_last_error_msg() ;
echo "</td></tr>";

// For every issue
foreach($arr as $key => $issue){
	
		echo "<tr><td>".$issue->issueno."</td><td>".$issue->issuetitle."</td></tr>";

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
				$query->bindParam(':kind', $event->kind);
				$query->bindParam(':content', $event->text);
				$query->bindParam(':aux', $aux);			
				$query->execute();
			
				echo "<tr><td>".$issue->issueno."</td><td>".$event->time."</td><td>".$intervald."</td><td>".$event->eventauthor."</td><td>".$event->text."</td><td>".$content."</tr>";


		}
				
}

/*

// ---------------================############### Here comes Blame ############==================------------------------------

echo "<tr><td style='font-family:20px;font-weight:bold;'>Blame!</td></tr>";

echo "<tr>";
echo "<td>url</td>";
echo "<td>path</td>";
echo "<td>filename</td>";
echo "<td># lines</td>";
echo "<td>size</td>";
echo "<td>scrape date</td>";
echo "<td>file pos</td>";
echo "</tr>";
foreach($gittags as $courseyear => $gittag){
  echo "<tr><td colspan='7'>Processing: ".$gittag."</td></tr>";
  $foo=file_get_contents("../GHData/data_blame_".$gittag.".js");
  $startpos=1;
  $endpos=strlen($foo);
	
  $j=0;
  $i=$startpos;
  
  while($i < $endpos){
      //set_time_limit ( 100 );      
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
				
				if($i>=$endpos) break;
        
      }
		
			// echo $workstr."\n";
  
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
      
      $query = $log_db->prepare('INSERT INTO Bfile(purl,path,filename, filesize, filelines, harvestdate,courseyear,gittag) VALUES (:purl,:path,:filename,:filesize,:filelines,:harvestdate,:courseyear,:gittag)');
      $query->bindParam(':purl', $purl);
      $query->bindParam(':path', $path);
      $query->bindParam(':filename', $filename);
      $query->bindParam(':filelines', $filelines);
      $query->bindParam(':filesize', $filesize);
      $query->bindParam(':harvestdate', $harvestdate);
      $query->bindParam(':courseyear', $courseyear);
      $query->bindParam(':gittag', $gittag);
      $query->execute();
      
      $fileid=$log_db->lastInsertId(); 
      
      foreach($fileo->blames as $bkey => $blame){		
          $rowcnt=$blame->rowcnt;				
          $blamedate=$blame->blamedate;
          $blameuser=$blame->blameuser;	
          $blameuser=$blameuser;		
          $href=substr($blame->href,21);
          $mess=$blame->mess;
          
          $query = $log_db->prepare('INSERT INTO Blame(blamedate,blameuser,href,mess,rowcnt,fileid,courseyear,gittag) VALUES (:blamedate,:blameuser,:href,:mess,:rowcnt,:fileid,:courseyear,:gittag)');
  
          $query->bindParam(':blamedate', $blamedate);
          $query->bindParam(':blameuser', $blameuser);
          $query->bindParam(':href', $href);
          $query->bindParam(':mess', $mess);
          $query->bindParam(':rowcnt', $rowcnt);
          $query->bindParam(':fileid', $fileid);
          $query->bindParam(':courseyear', $courseyear);
          $query->bindParam(':gittag', $gittag);
  
          $query->execute();
          $blameid=$log_db->lastInsertId(); 
          
          foreach($blame->rows as $rkey => $row){		
              $rowno=$row->row;
              $code=$row->code;
              
              $code=str_replace("__","&lt;",$code);
              $code=str_replace("**","&gt;",$code);
  
              $query = $log_db->prepare('INSERT INTO CodeRow(fileid,blameid,blameuser,rowno,code,courseyear,gittag) VALUES (:fileid,:blameid,:blameuser,:rowno,:code,:courseyear,:gittag)');
      
              $query->bindParam(':fileid', $fileid);
              $query->bindParam(':blameid', $blameid);
              $query->bindParam(':blameuser', $blameuser);
              $query->bindParam(':rowno', $rowno);
              $query->bindParam(':code', $code);
              $query->bindParam(':courseyear', $courseyear);
              $query->bindParam(':gittag', $gittag);    
              $query->execute();
          }
          
      }
  
  }
  echo "<tr><td colspan='7'>Finished processing: ".$gittag."</td></tr>";
}

*/
	
?> 

</table>

</body>
</html>
