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

/*

"purl":"https://github.com/HGustavs/LenaSYS/blame/",
"path":"master/DuggaSys/",
"filename":"accessed.js",
"fileinfo":"100644 142 lines (114 sloc) 4.61 KB",
"blames":[{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"4","rows":[{"row":"1","code":"var sessionkind=0;"},{"row":"2","code":"var querystring=parseGet();"},{"row":"3","code":"var versions;"},{"row":"4","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"1","rows":[{"row":"5","code":"AJAXService(GET,cid:querystring[cid],coursevers:querystring[coursevers],ACCESS);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"7","rows":[{"row":"6","code":""},{"row":"7","code":"----------------------------------------"},{"row":"8","code":" Commands:"},{"row":"9","code":"----------------------------------------"},{"row":"10","code":""},{"row":"11","code":"function addUsers()"},{"row":"12","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"5","rows":[{"row":"13","code":"var newUsersArr = new Array();"},{"row":"14","code":"newusers=$(#import).val();"},{"row":"15","code":"var myArr=newusers.split(n);"},{"row":"16","code":"for (var i=0; i__myArr.length; i++)"},{"row":"17","code":"newUsersArr.push(myArr[i].split(t));"}]},{"blamedate":"2016-04-12T14:06:14Z","blameuser":"@a14nikau","href":"HGustavsLenaSYScommitec4686a3405f7bf72e8e4976805bd118182c9058","mess":"Implemented new IDM, and access for quick users.","rowcnt":"1","rows":[{"row":"18","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"3","rows":[{"row":"19","code":"var newUserJSON = JSON.stringify(newUsersArr);"},{"row":"20","code":"AJAXService(ADDUSR,cid:querystring[cid],newusers:newUserJSON,coursevers:querystring[coursevers],ACCESS);"},{"row":"21","code":"$(#createUsers).css(display,none);"}]},{"blamedate":"2016-04-07T12:13:19Z","blameuser":"@a14nikau","href":"HGustavsLenaSYScommit135d58e9478314d1e8781479590813a4a60329cc","mess":"A working version of the new add user system","rowcnt":"2","rows":[{"row":"22","code":""},{"row":"23","code":""}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"2","rows":[{"row":"24","code":"function showCreateUsersPopup()"},{"row":"25","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"26","code":"$(#createUsers).css(display,block);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"4","rows":[{"row":"27","code":""},{"row":"28","code":""},{"row":"29","code":"function hideCreateUsersPopup()"},{"row":"30","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"31","code":"$(#createUsers).css(display,none);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"4","rows":[{"row":"32","code":""},{"row":"33","code":""},{"row":"34","code":"function changeAccess(cid,uid,val)"},{"row":"35","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"1","rows":[{"row":"36","code":"AJAXService(ACCESS,cid:cid,uid:uid,val:val,coursevers:querystring[coursevers],ACCESS);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"4","rows":[{"row":"37","code":""},{"row":"38","code":""},{"row":"39","code":"function selectUser(uid,username,ssn,firstname,lastname,access)"},{"row":"40","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"41","code":" Set Name"}]},{"blamedate":"2015-05-12T08:06:10Z","blameuser":"@b13alebr","href":"HGustavsLenaSYScommit2b6f21769eb6f84981c3987209f91f6157c39947","mess":"Update accessed.js Updated function selectUser so it sets values to input fields properly.","rowcnt":"2","rows":[{"row":"42","code":"$(#firstname).val(firstname);"},{"row":"43","code":"$(#lastname).val(lastname);"}]},{"blamedate":"2015-04-16T08:00:27Z","blameuser":"@c13chrjo","href":"HGustavsLenaSYScommitacfb3ade80d4d2ef7cc70810ecf6ede96f9963f1","mess":"Update accessed.js","rowcnt":"1","rows":[{"row":"44","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"45","code":" Set User name"}]},{"blamedate":"2015-05-12T08:06:10Z","blameuser":"@b13alebr","href":"HGustavsLenaSYScommit2b6f21769eb6f84981c3987209f91f6157c39947","mess":"Update accessed.js Updated function selectUser so it sets values to input fields properly.","rowcnt":"1","rows":[{"row":"46","code":"$(#usrnme).val(username);"}]},{"blamedate":"2015-04-16T08:00:27Z","blameuser":"@c13chrjo","href":"HGustavsLenaSYScommitacfb3ade80d4d2ef7cc70810ecf6ede96f9963f1","mess":"Update accessed.js","rowcnt":"1","rows":[{"row":"47","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"48","code":"Set SSN"}]},{"blamedate":"2015-05-12T08:06:10Z","blameuser":"@b13alebr","href":"HGustavsLenaSYScommit2b6f21769eb6f84981c3987209f91f6157c39947","mess":"Update accessed.js Updated function selectUser so it sets values to input fields properly.","rowcnt":"2","rows":[{"row":"49","code":"$(#ussn).val(ssn);"},{"row":"50","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"2","rows":[{"row":"51","code":"$(#uid).val(uid);"},{"row":"52","code":"$(#editUsers).css(display,block);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"4","rows":[{"row":"53","code":""},{"row":"54","code":""},{"row":"55","code":"function updateUser()"},{"row":"56","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"6","rows":[{"row":"57","code":"var ussn=$(#ussn).val();"},{"row":"58","code":"var usrnme=$(#usrnme).val();"},{"row":"59","code":"var firstname=$(#firstname).val();"},{"row":"60","code":"var lastname=$(#lastname).val();"},{"row":"61","code":"var uid=$(#uid).val();"},{"row":"62","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"1","rows":[{"row":"63","code":"AJAXService(UPDATE,ssn:ussn,uid:uid,firstname:firstname,lastname:lastname,username:usrnme,cid:querystring[cid],coursevers:querystring[coursevers],ACCESS);"}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"2","rows":[{"row":"64","code":""},{"row":"65","code":"$(#editUsers).css(display,none);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"4","rows":[{"row":"66","code":""},{"row":"67","code":""},{"row":"68","code":"function closeEdituser()"},{"row":"69","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"70","code":"$(#editUsers).css(display,none);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"4","rows":[{"row":"71","code":""},{"row":"72","code":""},{"row":"73","code":"function resetPw(uid,username)"},{"row":"74","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"75","code":"rnd=randomstring();"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"1","rows":[{"row":"76","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"1","rows":[{"row":"77","code":"window.location=mailto:+username+@student.his.se?Subject=LENASys%20Password%20Reset&body=Your%20new%20password%20for%20LENASys%20is:%20+rnd+%0A%0ALENASys Administrators;"}]},{"blamedate":"2016-04-07T12:13:19Z","blameuser":"@a14nikau","href":"HGustavsLenaSYScommit135d58e9478314d1e8781479590813a4a60329cc","mess":"A working version of the new add user system","rowcnt":"1","rows":[{"row":"78","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"1","rows":[{"row":"79","code":"AJAXService(CHPWD,cid:querystring[cid],uid:uid,pw:rnd,coursevers:querystring[coursevers],ACCESS);"}]},{"blamedate":"2016-04-07T12:13:19Z","blameuser":"@a14nikau","href":"HGustavsLenaSYScommit135d58e9478314d1e8781479590813a4a60329cc","mess":"A working version of the new add user system","rowcnt":"2","rows":[{"row":"80","code":""},{"row":"81","code":""}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"5","rows":[{"row":"82","code":"----------------------------------------"},{"row":"83","code":" Renderer"},{"row":"84","code":"----------------------------------------"},{"row":"85","code":"function returnedAccess(data)"},{"row":"86","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"6","rows":[{"row":"87","code":" Fill section list with information"},{"row":"88","code":"str=;"},{"row":"89","code":"if (data[entries].length ** 0) "},{"row":"90","code":""},{"row":"91","code":"str+=__table class=list**;"},{"row":"92","code":""}]},{"blamedate":"2015-05-26T07:47:06Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit9e47c4d255ebeb70fbd3617faf9b29d6c82f981c","mess":"Added fixed sizes widths and changed the order","rowcnt":"1","rows":[{"row":"93","code":"str+=__tr**__th class=first style=text-align:left; padding-left:8px; width:140px;**Username__th**__th style=text-align:left; padding-left:8px; width:150px;**SSN__th**__th style=text-align:left; padding-left:8px;**First Name__th**__th style=text-align:left; padding-left:8px;**Last Name__th**__th style=text-align:left; padding-left:8px; width:100px;**Modified__th**__th style=text-align:left; padding-left:8px; width:90px;**Access__th**__th style=text-align:left; padding-left:8px; width:90px;**Settings__th**__th class=last style=text-align:left; padding-left:8px; width:120px;**Password__th**__tr**;"}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"2","rows":[{"row":"94","code":"for(i=0;i__data[entries].length;i++)"},{"row":"95","code":"var item=data[entries][i];"}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"8","rows":[{"row":"96","code":""},{"row":"97","code":" If this"},{"row":"98","code":"if(parseFloat(item[newly])__10)"},{"row":"99","code":"str+=__tr style=background:#efd;**;"},{"row":"100","code":"else"},{"row":"101","code":"str+=__tr**;"},{"row":"102","code":""},{"row":"103","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"24","rows":[{"row":"104","code":"str+=__td**+item[username]+__td**;"},{"row":"105","code":"str+=__td**+item[ssn]+__td**;"},{"row":"106","code":"str+=__td**+item[firstname]+__td**;"},{"row":"107","code":"str+=__td**+item[lastname]+__td**;"},{"row":"108","code":"str+=__td**+item[modified].substr(0,10)+__td**;"},{"row":"109","code":""},{"row":"110","code":"str+=__td valign=center**__select onChange=changeAccess(+querystring[cid]+,+item[uid]+,this.value); onclick=return false; id=+item[uid]+**;"},{"row":"111","code":""},{"row":"112","code":"if(item[access]==R)"},{"row":"113","code":"str+=__option selected=selected value=R**Student__option**;"},{"row":"114","code":"else"},{"row":"115","code":"str+=__option value=R**Student__option**;"},{"row":"116","code":""},{"row":"117","code":"if(item[access]==W)"},{"row":"118","code":"str+=__option selected=selected value=W**Teacher__option**;"},{"row":"119","code":"else"},{"row":"120","code":"str+=__option value=W**Teacher__option**;"},{"row":"121","code":""},{"row":"122","code":"if(item[access]==N)"},{"row":"123","code":"str+=__option selected=selected value=N**None__option**"},{"row":"124","code":"else"},{"row":"125","code":"str+=__option value=N**None__option**;"},{"row":"126","code":""},{"row":"127","code":"str+=__select**;"}]},{"blamedate":"2015-05-26T07:47:06Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit9e47c4d255ebeb70fbd3617faf9b29d6c82f981c","mess":"Added fixed sizes widths and changed the order","rowcnt":"2","rows":[{"row":"128","code":""},{"row":"129","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"1","rows":[{"row":"130","code":"str+=__td**__img id=dorf style=float:none; margin-right:4px; src=..SharediconsCogwheel.svg ;"}]},{"blamedate":"2015-05-26T07:47:06Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit9e47c4d255ebeb70fbd3617faf9b29d6c82f981c","mess":"Added fixed sizes widths and changed the order","rowcnt":"2","rows":[{"row":"131","code":"str+= onclick=selectUser(+item[uid]+,+item[username]+,+item[ssn]+,+item[firstname]+,+item[lastname]+,+item[access]+);**__td**;"},{"row":"132","code":"str+=__td**__input class=submit-button type=button value=Reset PW onclick=if(confirm(Reset Password for +item[username]+ ?)) resetPw(+item[uid]+,+item[username]+); return false; style=float:none;**__td**;"}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"1","rows":[{"row":"133","code":"str+=__tr**;"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"1","rows":[{"row":"134","code":""}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"2","rows":[{"row":"135","code":"str+=__table**;"},{"row":"136","code":""}]},{"blamedate":"2016-12-12T13:11:59Z","blameuser":"@a97marbr","href":"HGustavsLenaSYScommitabd440f69b00850a424e776fbf9b76678f22538e","mess":"This is the changes made in parallel with the project during spring 2016 and the development done during fall 2016.","rowcnt":"2","rows":[{"row":"137","code":"var slist=document.getElementById(accessedcontent);"},{"row":"138","code":"slist.innerHTML=str;"}]},{"blamedate":"2015-05-04T07:24:47Z","blameuser":"@a13denli","href":"HGustavsLenaSYScommit579d23159e189bbcf0be1403cfcaeddef2eee2e5","mess":"Indentation fix","rowcnt":"2","rows":[{"row":"139","code":""},{"row":"140","code":"if(data[debug]!=NONE!) alert(data[debug]);"}]},{"blamedate":"2014-09-03T14:49:45Z","blameuser":"@HGustavs","href":"HGustavsLenaSYScommit50a600915956d7bee00aa1d0d5e7590191f6e989","mess":"Big duggaSYS update. Redacted the existing code, coalescing functionality. Simplified core services such as login. Tried to remove as much cruft as possible. AddedRe-engineered missing services such as results service.","rowcnt":"1","rows":[{"row":"141","code":""}]}]
},

*/
        
date_default_timezone_set('Europe/Berlin' );
    
set_time_limit (5000);

$foo=file_get_contents("../data_blame_2018_1.js");

$log_db = new PDO('sqlite:../GHdata_2018_1.db');
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
				$blameuser=substr($blameuser,1);		
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




//strpos ( string $haystack , mixed $needle [, int $offset = 0 ] )


/*

// For every issue
foreach($arr as $key => $fileo){
		echo "<tr>";
		
		$purl=$fileo->purl;
		$path=$fileo->path;
		$filename=$fileo->filename;
		$fileinfo=$fileo->fileinfo;
		$fileinfo=substr($fileinfo,7);
		$filelines=substr($fileinfo,0,strpos($fileinfo," "));
		$filez=substr($fileinfo,0,strrpos($fileinfo," "));
		$filesize=substr($filez,strrpos($filez," "));
		
		$harvestdate=date('Y-m-d H:i:s');
		
		echo "<td>".$purl."</td>";
		echo "<td>".$path."</td>";
		echo "<td>".$filename."</td>";
		echo "<td>".$filelines."</td>";
		echo "<td>".$filesize."</td>";
		echo "<td>".$harvestdate."</td>";
		
		$query = $log_db->prepare('INSERT INTO Bfile(purl,path,filename, filesize, filelines, harvestdate) VALUES (:purl,:path,:filename,:filesize,:filelines,:harvestdate)');
		$query->bindParam(':purl', $purl);
		$query->bindParam(':path', $path);
		$query->bindParam(':filename', $filename);
		$query->bindParam(':filelines', $filelines);
		$query->bindParam(':filesize', $filesize);
		$query->bindParam(':harvestdate', $harvestdate);
		$query->execute();
		
		$fileid=$log_db->lastInsertId(); 
		
		echo "<td><table>";
		foreach($fileo->blames as $bkey => $blame){		
				echo "<tr>";

				$rowcnt=$blame->rowcnt;				
				$blamedate=$blame->blamedate;
				$blameuser=$blame->blameuser;	
				$blameuser=substr($blameuser,1);		
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

				echo "<td>".$fileid."</td>";
				echo "<td>".$blamedate."</td>";
				echo "<td>".$blameuser."</td>";
				echo "<td>".$href."</td>";

				echo "<td><table>";
				
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

						echo "<td>".$rowno."</td>";
						echo "<td>".$code."</td>";
						
						echo "</tr>";

				}
				
				echo "</table></td>";

				echo "</tr>";
		}
		echo "</table></td>";

		echo "</tr>";
				
}
*/

?> 

</table>

</body>
</html>