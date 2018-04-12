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
      url: 'http://localhost/Scrapers/write_issues.php',
      data: 'fname='+dataFile+'&str=' + encodeURIComponent(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onload: function (response) {
        //console.log('Success!');
        //setTimeout(function(){ window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno; }, 3000);
        window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno;
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
issue += '"comments":[';
var iii = 0;
$('.js-discussion > .timeline-comment-wrapper').each(function () {
  if (iii != 0) issue += ',';
  iii++;
  issue += '{';
  issue += '"commentauthor":"' + $(this).find('.author').text() + '",';
  issue += '"content":"' + writeContent($(this).find('.comment-body').text()) + '",';
  issue += '"time":"' + writeContent($(this).find('.timestamp > relative-time').attr('datetime')) + '",';
  var backuptime=$(this).find('.timestamp > relative-time').attr('datetime');
  var doit = 0;
  var fluffy = $(this);
  var auth = $(this).find('.author').text();
  var jjj = 0;
  issue += '"events":[';
  // Each event
  $(this).nextAll().each(function () {

    // Do not process the following
    if ($(this).has(":not([class])") || $(this).is("#js-timeline-progressive-loader") || $(this).hasClass('js-timeline-progressive-focus-container') || $(this).hasClass('timeline-progressive-disclosure-container') || $(this).hasClass('outdated-diff-comment-container') || $(this).hasClass('discussion-item-integrations-callout') || $(this).hasClass('closed-banner') || $(this).hasClass('js-comment-container') || $(this).hasClass('js-timeline-marker') || $(this).hasClass('partial-timeline-marker')) {

      

    }else{

      // Start of event
      if (jjj == 0) {
        issue += '{';
      } else {
        issue += ',{';
      }
            
      var etime = $(this).find('relative-time').attr('datetime');
      var evauth = $(this).find('.author').first().text();

      if(typeof(etime) == "undefined"){
          etime=backuptime;
      }
      
      issue += '"time":"' + etime + '",';
      issue += '"eventauthor":"' + evauth + '",';
      
      if($(this).hasClass('discussion-item-closed')){
        issue += '"kind":"Closed"}';
      }else if($(this).hasClass('discussion-item-reopened')){
        issue += '"kind":"Reopened"}';
      }else if($(this).hasClass('discussion-item-labeled')){
        issue += '"kind":"Labeled"';
        issue += ',"label":"';
        $(this).find('.label-color').each(function () {
          issue+=$(this).text()+",";
        });
        issue+='"}';
      }else if($(this).hasClass('discussion-item-unlabeled')){
        issue += '"kind":"Unlabeled"';
        issue += ',"label":"';
        $(this).find('.label-color').each(function () {
          issue+=$(this).text()+",";
        });
        issue+='"}';
      }else if($(this).hasClass('discussion-item-assigned')){
        issue += '"kind":"Assigned"';
        issue += ',"by":"'+$(this).find('.discussion-item-entity').text()+'"}';
      }else if($(this).hasClass('discussion-item-ref')){
        issue += '"kind":"Referenced"';
        issue += ',"in":"'+writeContent($(this).find('.issue-num').text())+'"}';
      }else if($(this).hasClass('discussion-item-unassigned')){
        issue += '"kind":"Unassigned"}';
      }else if($(this).hasClass('discussion-item-changes-marker')){
        issue += '"kind":"Changes"}';
      }else if($(this).hasClass('discussion-item-milestoned')){
        issue += '"kind":"Milestone"';
        issue += ',"Stone":"'+$(this).find('.discussion-item-entity').text()+'"}';        
      }else if($(this).hasClass('discussion-item-demilestoned')){
        issue += '"kind":"Milestone"';
        issue += ',"Stone":"'+$(this).find('.discussion-item-entity').text()+'"}';        
      }else if($(this).hasClass('discussion-item-merged')){
        issue += '"kind":"Merge"';
        issue += ',"commit":"'+$(this).find('.discussion-item-entity').text()+'"';
        issue += ',"into":"'+writeContent($(this).find('.user-select-contain').text())+'"}';        
      }else if($(this).hasClass('discussion-item discussion-item-head_ref_deleted')){
        issue += '"kind":"Deleted"';        
        issue += ',"branch":"'+writeContent($(this).find('.user-select-contain').text())+'"}';
      }else if($(this).hasClass('discussion-item discussion-commits')){
        issue += '"kind":"Commit"';        
        issue += ',"commits":"';
        $(this).find('.commit').each(function () {
          issue+=$(this).find('.commit-id').attr("href")+","+$(this).find('.author').text()+",";
        });
        issue+='"}';
      }else if($(this).hasClass('discussion-item discussion-item-renamed')){
        issue += '"kind":"Renamed"';        
        issue += ',"from":"'+writeContent($(this).find('.renamed-was').text())+'"';
        issue += ',"to":"'+writeContent($(this).find('.renamed-is').text())+'"}';
      }else if($(this).hasClass('discussion-item discussion-item-head_ref_restored')){
        issue += '"kind":"Restored"';        
        issue += ',"branch":"'+writeContent($(this).find('.user-select-contain').text())+'"}';
      }else if($(this).hasClass('discussion-item-review_requested')){
        issue += '"kind":"Requested"';
        issue += ',"from":"'+$(this).find('.discussion-item-entity').text()+'"}';
      }else if($(this).hasClass('discussion-item-review')){
        issue += '"kind":"Reviewed"';
        issue += ',"summary":"'+writeContent($(this).find('.review-summary').text())+'"';
        issue += ',"by":"'+$(this).find('.discussion-item-entity').text()+'"}';
      }else if($(this).hasClass('discussion-item discussion-item-base_ref_changed')){
        issue += '"kind":"Rebase"';
        issue += ',"summary":"'+writeContent($(this).text())+'"}';
      }else if($(this).hasClass('discussion-item discussion-item-review_request_removed')){
        issue += '"kind":"Unreview"';
        issue += ',"summary":"'+writeContent($(this).text())+'"';
        issue += ',"by":"'+$(this).find('.discussion-item-entity').text()+'"}';
      }else{
        alert("Unknown Event: "+$(this).attr('class')+"\n\n"+$(this).html());      
      }
    
      jjj++;
      
      // End of skip-over event else
    }
    
    // End of event foreach
  }
  );
  // End of events
  issue += ']';
  // End of comment
  issue += '}';
}
);
// End of comments
issue += ']';
issue += '}\n';


ajaxCall(issue);
window.location.href = "https://github.com/HGustavs/LenaSYS/issues/"+issueno;
