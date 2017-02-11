// ==UserScript==
// @name        IPLocator
// @namespace   IPLocator
// @include     https://www.iplocation.net/*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function ajaxCall(data) {
  try {
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://localhost/testwritefile/writefile2.php',
      data: 'str=' + encodeURIComponent(data),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onload: function (response) {
        console.log('Success!');
      }
    });
  } catch (ex1) {
    console.log(ex1);
  }
}

function writeContent(strr)
{
  strr = $.trim(strr);
  strr = strr.replace(/"/g, '');
  strr = strr.replace(/\s/g, ' ');
  strr = strr.replace(/\s+/g, ' ');
  return strr;
}

var issue = '';
issue += '{';
issue += '"locations":[';

var iii=0;
var tablist=document.getElementsByTagName("table");

for(var hc=0;hc<tablist.length;hc++){
  var table1rows=tablist[hc].rows;
  if(hc==0||hc==1){
     if(iii>0) issue+=",";
     issue+="{"; 
     for(var ic=0;ic<table1rows.length;ic++){
          var tds=table1rows[ic].childNodes;
          if(ic==1){
              issue+='"ip":"'+tds[0].textContent+'",';
              issue+='"country":"'+tds[1].textContent.trim()+'",';            
              issue+='"region":"'+tds[3].textContent.trim()+'",';            
              issue+='"city":"'+tds[4].textContent.trim()+'",';            
              issue+='"prov":"'+hc+'",';
          }else if(ic==2){
              issue+='"isp":"'+tds[0].textContent+'",';             
              issue+='"latitude":"'+tds[3].textContent+'",';             
              issue+='"longitude":"'+tds[4].textContent+'"';             
          }
        }
     issue+="}";
     iii++;
  }
}

issue+=']';

issue += '},\n';

if (iii>0){
  //alert(issue);
  ajaxCall(issue);
} 


