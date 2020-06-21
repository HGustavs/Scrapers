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
var $ = window.jQuery;
var req=null;
var timeout=null;
var timeoutDelay=4000;

var start=3001;
var stop=4000;
var year=2020;
var week=10;
var suffix="20200621";
var dataFile="data_issues_"+year+"_v"+week+"_"+start+"-"+stop
if(suffix!="")dataFile+="_"+suffix;
dataFile+=".js";
const serviceUrl="https://wwwlab.iit.his.se/brom/Scrapers/write_scrape_data.php";

var ignoreEvtArr=[
  "discussion-item-changes-marker",
  "form js-ajax-pagination",
  "js-timeline-progressive-focus-container",
  "details-container Details",
  "eak",
	"js-socket-channel js-updatable-content",
  "dge text-white bg-red",
  "dy"
];

var excludeIssuesArr=[5919];
var issue = '';
var issueno = '';

function response(response) {

        if(issueno<=start || issueno>stop){
          alert("Done scraping! The data is collected in "+dataFile)
        }else{
            req.abort();
        	timeout=setTimeout(function(){clearTimeout(timeout); window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno; }, timeoutDelay+Math.floor(Math.random()*1000));
        	//window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno;
        }
}

function ajaxCall(data) {
  try {
      req=GM.xmlHttpRequest({
      method: 'POST',
      url: serviceUrl,
      data: 'fname='+dataFile+'&str=' + encodeURIComponent(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onload: response

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
      if (iii != 0) ev += ',';

      ev += "{";
      ev += '"time":"' + etime + '",';
      ev += '"eventauthor":"' + evauth + '",';
      ev += '"text":"' + text +'",';
      ev += '"kind":"' + kind + '"';
    	ev += "}";

  		//alert(ev);
  		return ev;

}


(function() {
    'use strict';

// Test cases:
// Issue 19 - Reopen and Edit
// Issue 21 - multiple tags and person assignment.
// Finished: Tag / Closed / Reopened
// Issue 4 - Person Assignment
// .replace(/\s+/g,' ') remove all but one space
// 5984 Added to project

// alert($('.gh-header-meta a').text());
// alert($('.gh-header-meta relative-time').attr('datetime'));

$('.sticky-content').html("");
issueno = $('.gh-header-number').text();
issueno = issueno.substring(issueno.indexOf('#') + 1);
issueno++;
while(excludeIssuesArr.indexOf(issueno)!=-1){
  issueno++;
}


if(issueno>1) issue+=",";
issue += '{';
issue += '"issueno":"' + $('.gh-header-number').text() + '",';
issue += '"issuetitle":"' + writeContent($('.js-issue-title').text()) + '",';
var issueAuthor=writeContent($('.gh-header-meta .author').text());
issue += '"issueauthor":"' + issueAuthor + '",';

var issuetime=$('.gh-header-meta relative-time').attr('datetime');
if(typeof(issuetime) == "undefined"){
  issuetime=$('relative-time').attr('datetime');
}
issue += '"time":"' + issuetime + '",';

var stat = writeContent($('.State').first().text());
issue += '"state":"' + stat + '",';
var message=($('.gh-header-meta').text());
issue += '"message":"' + writeContent(message) + '",';
issue += '"events":[';
var iii = 0;
var backuptime="UNK";
$('.TimelineItem').each(function (i,tl) {
  	var tme = $(tl).find('relative-time').attr('datetime');
  	if(!tme){
       tme=issuetime;
    }
  	var usr=$(tl).find(".author").first().text();
  	if(usr==""){
       usr=issueAuthor;
    }
    var evtDescription=$(tl).find(".author").first()[0];
    if(evtDescription){
      //alert(evtDescription.nextSibling.textContent.trim().split(' ')[0])
      evtDescription=evtDescription.nextSibling.textContent.trim().split(' ')[0];
    }
  	var evt="UNK";
  	var svg=$(tl).find("svg");
  	if(svg){
      	svg=svg[0];
        evt=svg.getAttribute("class");
        evt=evt.substring(evt.indexOf("octicon-")+8)
        if(evtDescription && evtDescription!=""){
           evt+="-"+evtDescription;
        }
        evt=evt.trim();
    }

    //alert(i+":"+evt+":"+tme+":"+usr+":"+evtDescription)

    if((evt=="UNK")||evt=="circle-slash"){
      // Ignore evt
    }else if(evt==""){
      var txt=writeContent($(this).find(".discussion-item-ref-title").first().text());
      if(usr!=""){
        issue+=writeEvent(iii,tme,usr,"referenced",txt);
      }
    }else if(evt=="kebab-horizontal"){
      let txt=writeContent($(this).find(".comment-body").first().text());
      issue+=writeEvent(i,tme,usr,"comment",txt);
    }else if(/*evt=="discussion-item-assigned"*/ evt=="person-assigned"){
      let asr=$(tl).find(".author").next().text();
      issue+=writeEvent(i,tme,usr,"assigned",asr);
    }else if(/*evt=="discussion-item-assigned"*/ evt=="person-self-assigned"){
      let asr=$(tl).find(".author").next().text();
      issue+=writeEvent(i,tme,usr,"selfassigned",asr);
    }else if(/*evt=="discussion-item-unassigned"*/ evt=="person-unassigned"){
      //var usr=$(this).find(".author").first().text();
      let asr=$(tl).find(".author").next().text();
      issue+=writeEvent(i,tme,usr,"unassigned",asr);
    }else if(/*evt=="discussion-item-unassigned"*/ evt=="person-removed"){
      //var usr=$(this).find(".author").first().text();
      let asr=$(tl).find(".author").next().text();
      issue+=writeEvent(i,tme,usr,"removedselfassigned",asr);
    }else if(/*evt=="discussion-item-labeled"*/ evt=="tag-added"){
      let lbl=writeContent($(tl).find(".IssueLabel").first().text());
      issue+=writeEvent(i,tme,usr,"labeled",lbl);
    }else if(/*evt=="discussion-item-unlabeled"*/ evt=="tag-removed"){
      let lbl=writeContent($(tl).find(".IssueLabel").first().text());
      issue+=writeEvent(i,tme,usr,"unlabeled",lbl);
    }else if(/*evt=="discussion-item-closed"*/ evt=="circle-slash-closed"){
      issue+=writeEvent(i,tme,usr,"closed","UNK");
    }else if(/*evt=="discussion-commits"*/ evt=="git-commit"){
      //var commits=$(this).find(".commit-id").text();
      let commits=$(tl).find("code a").first().attr("href");
      commits=commits.substring(commits.lastIndexOf("/")+1)
      issue+=writeEvent(i,tme,usr,"commit",commits);
    }else if(evt=="discussion-item-head_ref_deleted"){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"deleted",txt);
    }else if(/*evt=="discussion-item-milestoned"*/ evt=="milestone-added"){
      let txt=writeContent($(tl).find(".TimelineItem-body").first().text());
      issue+=writeEvent(i,tme,usr,"milestone",txt);
    }else if(evt=="milestone-modified"){
      let txt=writeContent($(tl).find(".TimelineItem-body").first().text());
      issue+=writeEvent(i,tme,usr,"milestonemodified",txt);
    }else if(/*evt=="discussion-item-demilestoned"*/ evt=="milestone-removed"){ // Found in issue #470
        let txt=writeContent($(tl).find(".TimelineItem-body").first().text());
        issue+=writeEvent(iii,tme,usr,"demilestone",txt);
    }else if(evt=="discussion-item-renamed"){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"renamed",txt);
    }else if(evt=="discussion-item-head_ref_restored"){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"restored",txt);
    }else if(/*evt=="discussion-item-reopened"*/ evt=="dot-fill-reopened"){
      //var txt=$(tl).find(".TimelineItem-body").first().text().replace(/\s{2,}/g,' ').replace(/\n/g,' ');
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"reopened",writeContent(txt));
    }else if(evt=="discussion-item-review_requested"){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"reviewrequest",txt);
    }else if(evt=="discussion-item-base_ref_changed"){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"refchanged",txt);
    }else if(evt=="discussion-item-review_request_removed"){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"reviewremoved",txt);
    }else if(/*evt.indexOf("discussion-item-merged")!=-1*/ evt=="git-merge-merged"){
      //var txt=$(tl).find(".TimelineItem-body").first().text().replace(/\s{2,}/g,' ').replace(/\n/g,' ');
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"merged",writeContent(txt));
    }else if(/*evt.indexOf("discussion-item-added_to_project")!=-1*/ evt=="project-added"){
      //var txt=$(tl).find(".TimelineItem-body").first().text().replace(/\s{2,}/g,' ').replace(/\n/g,'');;
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"addedto",writeContent(txt));
    }else if(/*evt.indexOf("discussion-item-moved_columns_in_project")!=-1*/ evt=="project-moved"){
      //var txt=$(tl).find(".TimelineItem-body").first().text().replace(/\s{2,}/g,' ').replace(/\n/g,'');
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"movedcolumns",writeContent(txt));
    }else if(evt.indexOf("review mt-0")!=-1){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"reviewresult",txt);
    }else if(evt.indexOf("discussion-item-base_ref_force_pushed")!=-1){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"forcepush",txt);
    }else if(evt.indexOf("discussion-item-removed_from_project")!=-1){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"removed",txt);
    }else if(evt.indexOf("discussion-item-head_ref_force_pushed")!=-1){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"forcepush",txt);
    }else if(evt.indexOf("discussion-item-comment_deleted")!=-1){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"delcomment",txt);
    }else if(evt.indexOf("discussion-item-ready_for_review")!=-1){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"reviewready",txt);
    }else if(evt.indexOf("header f5")!=-1){
      let txt=writeContent($(this).find("h3").first().text());
      issue+=writeEvent(iii,tme,usr,"header",txt);
    }
  	//
  	// New? events
  	//
  	else if(evt=="bookmark-linked"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"pullrequestlinked",writeContent(txt));
    }else if(evt=="cross-reference-added"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"mentionedissue",writeContent(txt));
    }else if(evt=="cross-reference-mentioned"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"mentionedissue",writeContent(txt));
    }else if(evt=="cross-reference-pushed"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"crossreferencepushed",writeContent(txt));
    }else if(evt=="cross-reference-referenced"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"mentionedissue",writeContent(txt));
    }else if(evt=="cross-reference"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"crossreference",writeContent(txt));	// Found in issue #141
    }else if(evt=="git-branch-deleted"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"branchdeleted",writeContent(txt));
    }else if(evt=="pencil-changed"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"pencilchanged",writeContent(txt));
    }else if(evt=="repo-push-added"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"repopushadded",writeContent(txt));		// Found in issue #30
    }else if(evt=="repo-push-and"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"repopushand",writeContent(txt));		// Found in issue #54
    }else if(evt=="project"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"project",writeContent(txt));		// Found in issue #465
    }else if(evt=="project-removed"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"projectremoved",writeContent(txt));		// Found in issue #496
    }else if(evt=="git-branch-restored"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"gitbranchrestored",writeContent(txt));		// Found in issue #575
    }else if(evt=="smiley"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"smiley",writeContent(txt));		// Found in issue #704
    }else if(evt=="unfold position-relative mr-1"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"unfold",writeContent(txt));		// Found in issue #712
    }else if(evt=="eye"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"eye",writeContent(txt));		// Found in issue #891
    }else if(evt=="fold"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"fold",writeContent(txt));		// Found in pull #891
    }else if(evt=="eye-requested"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"eyerequested",writeContent(txt));		// Found in pull #3002
    }else if(evt=="check"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"check",writeContent(txt));		// Found in pull #3008
    }else if(evt=="diff"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"diff",writeContent(txt));		// Found in pull #3008
    }else if(evt=="eye-self-requested"){
      let txt=$(tl).find(".TimelineItem-body").first().text();
      issue+=writeEvent(i,tme,usr,"eyeselfrequested",writeContent(txt));		// Found in pull #3037
    }else{
      alert("Unknown Event: "+evt+"\n\n"+tl.innerHTML);
    }
});

/*
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

							//if(evt=="discussion-item-changes-marker")||(evt.indexOf("form js-ajax-pagination")!=-1) || (evt.indexOf("js-timeline-progressive-focus-container")!=-1) || (evt.indexOf("details-container Details")!=-1)||(evt=="eak")||(evt.indexOf("js-socket-channel js-updatable-content")!=-1) || (evt.indexOf("dge text-white bg-red")!=-1){
							if(ignoreEvtArr.indexOf(evt)!=1){
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
							}else if(evt.indexOf("discussion-item-comment_deleted")!=-1){
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"delcomment",txt);
							}else if(evt.indexOf("discussion-item-ready_for_review")!=-1){
									var txt=writeContent($(this).find("h3").first().text());
                	issue+=writeEvent(iii,tme,usr,"reviewready",txt);
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
*/
// End of events
issue += ']';
issue += '}\n';

// alert(issue);

ajaxCall(issue);
})();
