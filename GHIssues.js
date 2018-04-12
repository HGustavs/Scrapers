// ==UserScript==
// @name        Issue_Scraper_Script
// @namespace   toddlerK
// @description Jajjamensan!
// @include     https://github.com/HGustavs/LenaSYS/issues/*
// @include     https://github.com/HGustavs/LenaSYS/pull/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1
// @grant       GM.xmlHttpRequest
// ==/UserScript==

var dataFile="data_issues_2018_1.js";

function ajaxCall(data) {
  try {
    GM.xmlHttpRequest({
      method: 'POST',
      url: 'http://localhost/Scrapers/write_scrape_data.php',
      data: 'fname='+dataFile+'&str=' + encodeURIComponent(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onload: function (response) {
        //console.log('Success!');
        //setTimeout(function(){ window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno; }, 3000);
        //window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno;
      }
    });
  } catch (ex1) {
    console.log(ex1);
  }
}
function writeContent(strr)
{
  strr = $.trim(strr);
  strr = strr.replace(/</g, '__');  
  strr = strr.replace(/>/g, '**');  
  strr = strr.replace(/\//g, '');  
  strr = strr.replace(/\\/g, '');  
  strr = strr.replace(/{/g, '');  
  strr = strr.replace(/}/g, '');  
  strr = strr.replace(/"/g, '');
  strr = strr.replace(/'/g, '');
  strr = strr.replace(/\s/g, ' ');
  strr = strr.replace(/\s+/g, ' ');
  return strr;
}

function writeEvent(iii,etime,evauth,kind,text)
{
  		var ev="";    
  
  		// Add commas if we have an event and it is not the first one
      if (iii != 0) ev += ',';

      ev += "{";
      ev += '"time":"' + etime + '",';
      ev += '"eventauthor":"' + evauth + '",';
      ev += '"text":"' + text +'"';  
    	ev += "}";
  
  		alert(ev);
  		return ev;
  
}


// Test cases: 
// Issue 19 - Reopen and Edit
// Issue 21 - multiple tags and person assignment.
// Finished: Tag / Closed / Reopened
// Issue 4 - Person Assignment
// .replace(/\s+/g,' ') remove all but one space

// alert($('.gh-header-meta a').text());
// alert($('.gh-header-meta relative-time').attr('datetime'));

var issue = '';
var issueno = '';
issueno = $('.gh-header-number').text();
issueno = issueno.substring(issueno.indexOf('#') + 1);
issueno++;
if(issueno>1) issue+=",";
issue += '{';
issue += '"issueno":"' + $('.gh-header-number').text() + '",';
issue += '"issuetitle":"' + writeContent($('.js-issue-title').text()) + '",';
issue += '"issueauthor":"' + writeContent($('.gh-header-meta a').text()) + '",';

var issuetime=$('.gh-header-meta relative-time').attr('datetime');
if(typeof(issuetime) == "undefined"){
  issuetime=$('relative-time').attr('datetime');
}
issue += '"time":"' + issuetime + '",';

var stat = writeContent($('.State').text());
issue += '"state":"' + stat + '",';
var message=($('.gh-header-meta').text());
issue += '"message":"' + writeContent(message) + '",';
issue += '"events":[';
var iii = 0;
var backuptime="UNK";
$('.js-discussion').children().each(function () {
  
  var cls=this.className;
  
  if((this.id=="js-timeline-progressive-loader")||(cls.indexOf("js-timeline-marker")!=-1)){
  		// alert("irrelevant! "+cls);
  }else if(cls.indexOf(("js-timeline-item")!=-1)||(cls.indexOf("js-comment-container")!=-1)){
    
    	var etime = $(this).find('relative-time').attr('datetime');
      var evauth = $(this).find('.author').first().text();
      if(typeof(etime) == "undefined"){
          etime=backuptime;
      }else{
      		backuptime=etime;
      }
        
  		if($(this).find("*").hasClass('js-comment-body')){
        	var ctext=writeContent($(this).find(".markdown-body").first().text());
          iii++;
        	issue+=writeEvent(iii,etime,evauth,"comment",ctext);
      }else{
        	// discussion-item
      		alert("EVENT: "+etime+" "+evauth+"\n"+cls);
          console.log(this);
      }  
  

  }else{
  		alert("Other Class: "+cls);
  }  

}
);
// End of events
issue += ']';
issue += '}\n';


ajaxCall(issue);
