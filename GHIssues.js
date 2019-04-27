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

var dataFile="data_issues_2019_3.js";

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
        if(issueno==1) alert(issueno);
        setTimeout(function(){ window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno; }, 500);
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
	strr = strr.replace(/\(/g,' ');
	strr = strr.replace(/\)/g,' ');
	strr = strr.replace(/\,/g,' ');
  return strr;
}

function writeEvent(iii,etime,evauth,kind,text)
{
  		var ev="";    
  
  		// Add commas if we have an event and it is not the first one
      if (iii != 1) ev += ',';

      ev += "{";
      ev += '"time":"' + etime + '",';
      ev += '"eventauthor":"' + evauth + '",';
      ev += '"text":"' + text +'",';  
      ev += '"kind":"' + kind + '"';
    	ev += "}";
  
  		// alert(ev);
  		return ev;
  
}

// Test cases: 
// Issue 19 - Reopen and Edit
// Issue 21 - multiple tags and person assignment.
// Finished: Tag / Closed / Reopened
// Issue 4 - Person Assignment
// .replace(/\s+/g,' ') remove all but one space
// 5984 Added to project

// alert($('.gh-header-meta a').text());
// alert($('.gh-header-meta relative-time').attr('datetime'));

var issue = '';
var issueno = '';
$('.sticky-content').html("");
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
					$(this).children().each(function () {
            	iii++;
							var evt=this.className.substring(this.className.indexOf("discussion-item")+16);
              var usr=$(this).find(".author").first().text();
              var tme = $(this).find('relative-time').attr('datetime');            

            	if((evt=="discussion-item-changes-marker")||(evt.indexOf("form js-ajax-pagination")!=-1)){
              		// Ignore evt
              }else if(evt==""){
                console.log(this);
                var txt=writeContent($(this).find(".discussion-item-ref-title").first().text());
                if(usr!=""){
                  issue+=writeEvent(iii,tme,usr,"referenced",txt);
                }
              }else if(evt=="discussion-item-assigned"){
									var asr=$(this).find(".author").eq(1).text();								
                	issue+=writeEvent(iii,tme,usr,"assigned",asr);
               }else if(evt=="discussion-item-unassigned"){
									var usr=$(this).find(".author").first().text();
									var asr=$(this).find(".author").eq(1).text();								
                	issue+=writeEvent(iii,tme,usr,"unassigned",asr);
              }else if(evt=="discussion-item-labeled"){
									var lbl=writeContent($(this).find(".IssueLabel").first().text());
                	issue+=writeEvent(iii,tme,usr,"labeled",lbl);
              }else if(evt=="discussion-item-unlabeled"){
									var lbl=writeContent($(this).find(".IssueLabel").first().text());
                	issue+=writeEvent(iii,tme,usr,"unlabeled",lbl);
              }else if(evt=="discussion-item-closed"){
                	issue+=writeEvent(iii,tme,usr,"closed","UNK");
              }else if(evt=="discussion-commits"){
                	var commits=$(this).find(".commit-id").text();
									issue+=writeEvent(iii,tme,usr,"commit",commits);
              }else if(evt=="discussion-item-head_ref_deleted"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"deleted",txt);
              }else if(evt=="discussion-item-milestoned"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"milestone",txt);
              }else if(evt=="discussion-item-demilestoned"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"demilestone",txt);
              }else if(evt=="discussion-item-renamed"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"renamed",txt);
              }else if(evt=="discussion-item-head_ref_restored"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"restored",txt);
              }else if(evt=="discussion-item-reopened"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"reopened",txt);
              }else if(evt=="discussion-item-review_requested"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"reviewrequest",txt);
              }else if(evt=="discussion-item-base_ref_changed"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"refchanged",txt);
              }else if(evt=="discussion-item-review_request_removed"){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"reviewremoved",txt);
							}else if(evt.indexOf("discussion-item-merged")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"merged",txt);
							}else if(evt.indexOf("discussion-item-added_to_project")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"addedto",txt);
							}else if(evt.indexOf("discussion-item-moved_columns_in_project")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"movedcolumns",txt);
							}else if(evt.indexOf("review mt-0")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"reviewresult",txt);
							}else if(evt.indexOf("discussion-item-base_ref_force_pushed")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"forcepush",txt);
							}else if(evt.indexOf("discussion-item-removed_from_project")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"removed",txt);								
							}else if(evt.indexOf("discussion-item-head_ref_force_pushed")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"forcepush",txt);															
							}else if(evt.indexOf("header f5")!=-1){ 
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"header",txt);		
							}else{
            			alert("Unknown Event: "+evt);              
              }

          });
      }  
  

  }else{
  		alert("Other Class: "+cls);
  }  

}
);
// End of events
issue += ']';
issue += '}\n';

// alert(issue);

ajaxCall(issue);