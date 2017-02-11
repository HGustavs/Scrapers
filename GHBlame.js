// ==UserScript==
// @name        Blame_Scraper_Script
// @namespace   blameScraper
// @description Scraping Blame like a Boss
// @include     https://github.com/HGustavs/LenaSYS/blame/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==
function ajaxCall(data) {
  try {
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://localhost/testwritefile/writefile4.php',
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

var filearr=[
  "accessed.js","master/DuggaSys/accessed.js",
  "accessed.php","master/DuggaSys/accessed.php",
  "accessedservice.php","master/DuggaSys/accessedservice.php",
            ];

var blame = '';
var blamefile = '';

blame += '{';

hr=location.href;
filename=(hr.slice(hr.lastIndexOf("/")+1));
purl=(hr.slice(0,hr.lastIndexOf("blame")+6));
path=(hr.slice(hr.lastIndexOf("blame")+6));
path=path.slice(0,path.lastIndexOf("/")+1);

fileind=filearr.indexOf(filename);

if(fileind>-1){
blame += '"purl":"' + purl + '",\n';
blame += '"path":"' + path + '",\n';
blame += '"filename":"' + filename + '",\n';
blame += '"fileinfo":"' + writeContent($('.file-info').text()) + '",\n';

//file-info-divider
// file-info

blame += '"blames":[';

var i=0;
$('.blame-container > .blame-hunk').each(function () {

  if(i>0) blame+=",";
  blame+="{";

  blame+='"blamedate":"'+writeContent($(this).find('.blame-commit-date > time-ago').attr('datetime'))+'",';   
  blame+='"blameuser":"'+writeContent($(this).find('.blame-commit-avatar').attr('alt'))+'",';
  blame+='"href":"'+writeContent($(this).find('.blame-commit-title > .message').attr('href'))+'",'; 
  blame+='"mess":"'+writeContent($(this).find('.blame-commit-title > .message').attr('title'))+'",'; 
  blame+='"rowcnt":"'+writeContent($(this).find('.blame-commit-info').attr('rowspan')-1)+'",'; 
  blame +='"rows":[';
  var ii=0;
  $(this).find('.blame-line').each(function () {
    if(ii>0) blame+=",";
    blame+="{";
    blame+='"row":"'+writeContent($(this).find('.blame-blob-num').text())+'",'; 
    blame+='"code":"'+writeContent($(this).find('.blob-code-inner').text())+'"'; 
    
    
    blame+="}";
    ii++;
  });
  blame+="]";  

  blame+="}";
  i++;

});


// End of blame
blame+="]\n";

blame += '},\n';

ajaxCall(blame);

if(fileind+2<filearr.length){
    location.href=purl+filearr[fileind+3];
}else{
  alert("end of scrape "+filename)
}
  
}else{
  alert(filename+" not found in array");
}

