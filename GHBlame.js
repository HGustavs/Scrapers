// ==UserScript==
// @name        Blame_Scraper_Script
// @namespace   blameScraper
// @description Scraping Blame like a Boss
// @include     https://github.com/HGustavs/LenaSYS/blame/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1
// @grant       GM.xmlHttpRequest
// ==/UserScript==
function ajaxCall(data) {
  try {
    GM.xmlHttpRequest({
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
  strr = strr.replace(/\@/g, '');
  return strr;
}


var filearr=[
  "install.php","master/install/install.php",
  "init_db.sql","master/install/SQL/init_db.sql",
  "keywords_html.sql","master/install/SQL/keywords_html.sql",
  "keywords_java.sql","master/install/SQL/keywords_java.sql",
  "keywords_php.sql","master/install/SQL/keywords_php.sql",
  "keywords_plain.sql","master/install/SQL/keywords_plain.sql",
  "keywords_sql.sql","master/install/SQL/keywords_sql.sql",
  "keywords_sr.sql","master/install/SQL/keywords_sr.sql",
  "temptable.sql","master/install/SQL/temptable.sql",
  "testdata.sql","master/install/SQL/testdata.sql",

	"accessed.js","master/DuggaSys/accessed.js",
  "accessed.php","master/DuggaSys/accessed.php",
  "accessedservice.php","master/DuggaSys/accessedservice.php",
  "clickcounter.js","master/DuggaSys/clickcounter.js",
  "codeviewer.js","master/DuggaSys/codeviewer.js",
  "codeviewer.php","master/DuggaSys/codeviewer.php",
  "codeviewerService.php","master/DuggaSys/codeviewerService.php",
  "contribution.js","master/DuggaSys/contribution.js",
  "contribution.php","master/DuggaSys/contribution.php",
  "contributionservice.php","master/DuggaSys/contributionservice.php",
  "courseed.js","master/DuggaSys/courseed.js",
  "courseed.php","master/DuggaSys/courseed.php",
  "courseedservice.php","master/DuggaSys/courseedservice.php",
  "cronjob.php","master/DuggaSys/cronjob.php",
	"diagram.js","master/DuggaSys/diagram.js",
  "diagram.php","master/DuggaSys/diagram.php",
  "diagram_example.js","master/DuggaSys/diagram_example.js",
  "diagram_figure.js","master/DuggaSys/diagram_figure.js",
  "diagram_symbol.js","master/DuggaSys/diagram_symbol.js",
	"diagram_toolbox.js","master/DuggaSys/diagram_toolbox.js",
  "diagram_IOHandler.js","master/DuggaSys/diagram_IOHandler.js",
  "diagram_IOHandler.php","master/DuggaSys/diagram_IOHandler.php",
  "diagram_mouse.js","master/DuggaSys/diagram_mouse.js",
  "diagram_dialog.js","master/DuggaSys/diagram_dialog.js",
  "diagramservice.php","master/DuggaSys/diagramservice.php",
  "duggaed.js","master/DuggaSys/duggaed.js",
  "duggaed.php","master/DuggaSys/duggaed.php",
  "duggaedservice.php","master/DuggaSys/duggaedservice.php",
	"fileed.js","master/DuggaSys/fileed.js",
  "fileed.php","master/DuggaSys/fileed.php",
  "fileedservice.php","master/DuggaSys/fileedservice.php",
  "filereceive.php","master/DuggaSys/filereceive.php",
  "filereceive_dugga.php","master/DuggaSys/filereceive_dugga.php",
  "migration.php","master/DuggaSys/migration.php",
  "highscoreservice.php","master/DuggaSys/highscoreservice.php",
  "profile.php","master/DuggaSys/profile.php",
  "profile.js","master/DuggaSys/profile.js",
	"preview.php","master/DuggaSys/preview.php",
  "pushnotifications.js","master/DuggaSys/pushnotifications.js",
  "pushnotifications.php","master/DuggaSys/pushnotifications.php",
  "pushnotificationsserviceworker.js","master/DuggaSys/pushnotificationsserviceworker.js",
  "resulted.js","master/DuggaSys/resulted.js",
  "resulted.php","master/DuggaSys/resulted.php",
  "resultedservice.php","master/DuggaSys/resultedservice.php",
  "sectioned.js","master/DuggaSys/sectioned.js",
  "sectioned.php","master/DuggaSys/sectioned.php",
  "sectionedservice.php","master/DuggaSys/sectionedservice.php",
  "showDugga.php","master/DuggaSys/showDugga.php",
  "showDuggaservice.php","master/DuggaSys/showDuggaservice.php",
  "showdoc.php","master/DuggaSys/showdoc.php",
	"stats.php","master/DuggaSys/stats.php",
  "stats.js","master/DuggaSys/stats.js",
  "swimlane.php","master/DuggaSys/swimlane.php",
  "swimlaneservice.php","master/DuggaSys/swimlaneservice.php",
  "swimlane.js","master/DuggaSys/showdoc.js",
  "testDugga.php","master/DuggaSys/testDugga.php",
  "timer.js","master/DuggaSys/timer.js",
  
	"3d-dugga.html","master/DuggaSys/templates/3d-dugga.html",
  "3d-dugga.js","master/DuggaSys/templates/3d-dugga.js",
  "XMLAPI_report1.html","master/DuggaSys/templates/XMLAPI_report1.html",
  "XMLAPI_report1_file_receive.js","master/DuggaSys/templates/XMLAPI_report1_file_receive.js",
  "bit-dugga.html","master/DuggaSys/templates/bit-dugga.html",
  "bit-dugga.js","master/DuggaSys/templates/bit-dugga.js",
  "boxmodell.html","master/DuggaSys/templates/boxmodell.html",
  "boxmodell.js","master/DuggaSys/templates/boxmodell.js",
  "color-dugga.html","master/DuggaSys/templates/color-dugga.html",
  "color-dugga.js","master/DuggaSys/templates/color-dugga.js",
  "curve-dugga.html","master/DuggaSys/templates/curve-dugga.html",
  "curve-dugga.js","master/DuggaSys/templates/curve-dugga.js",
  "default.js","master/DuggaSys/templates/default.js",
  "feedback_dugga.html","master/DuggaSys/templates/feedback_dugga.html",
  "feedback_dugga.js","master/DuggaSys/templates/feedback_dugga.js",
	"generic_dugga_file_receive.html","master/DuggaSys/templates/generic_dugga_file_receive.html",
  "generic_dugga_file_receive.js","master/DuggaSys/templates/generic_dugga_file_receive.js",
  "html_css_dugga.html","master/DuggaSys/templates/html_css_dugga.html",
  "html_css_dugga.js","master/DuggaSys/templates/html_css_dugga.js",
  "html_css_dugga_light.html","master/DuggaSys/templates/html_css_dugga_light.html",
  "html_css_dugga_light.js","master/DuggaSys/templates/html_css_dugga_light.js",
  "kryss.html","master/DuggaSys/templates/kryss.html",
  "kryss.js","master/DuggaSys/templates/kryss.js",
  "placeholder_dugga.html","master/DuggaSys/templates/placeholder_dugga.html",
  "placeholder_dugga.js","master/DuggaSys/templates/placeholder_dugga.js",
  "shapes-dugga.html","master/DuggaSys/templates/shapes-dugga.html",
  "shapes-dugga.js","master/DuggaSys/templates/shapes-dugga.js",
  "transforms.html","master/DuggaSys/templates/transforms.html",

	"blackTheme.css","master/Shared/css/blackTheme.css",
  "blank.css","master/Shared/css/blank.css",
  "codeviewer.css","master/Shared/css/codeviewer.css",
  "colorblind.css","master/Shared/css/colorblind.css",
  "dugga.css","master/Shared/css/dugga.css",
  "markdown.css","master/Shared/css/markdown.css",
  "style.css","master/Shared/css/style.css",
  "template1.css","master/Shared/css/template1.css",
  "template2.css","master/Shared/css/template2.css",
  "template3.css","master/Shared/css/template3.css",
  "template4.css","master/Shared/css/template4.css",
  "template5.css","master/Shared/css/template5.css",
  "template6.css","master/Shared/css/template6.css",
  "template7.css","master/Shared/css/template7.css",
  "template8.css","master/Shared/css/template8.css",
  "template9.css","master/Shared/css/template9.css",
  "whiteTheme.css","master/Shared/css/whiteTheme.css",
	
  "backup.py","master/Shared/backup.py",
  "basic.php","master/Shared/basic.php",
  "constants.php","master/Shared/constants.php",
  "courses.php","master/Shared/courses.php",
  "coursesyspw.php","master/Shared/coursesyspw.php",
  "database.php","master/Shared/database.php",
  "dugga.js","master/Shared/dugga.js",
  "loginbox.php","master/Shared/loginbox.php",
  "loginlogout.php","master/Shared/loginlogout.php",
  "markdown.js","master/Shared/markdown.js",
  "navheader.php","master/Shared/navheader.php",
  "sessions.php","master/Shared/sessions.php",
  "swimlane.php","master/Shared/swimlane.php",  
  "resetpw.php","master/Shared/resetpw.php",  
	"pushnotificationshelper.php","master/Shared/pushnotificationshelper.php",  
  
	"branch_merge_strategy.md","master/branch_merge_strategy.md",
	"code_standard.md","master/code_standard.md",
	"lenasys-markdown.txt","master/lenasys-markdown.txt"
	
];

var blame = '';
var blamefile = '';


hr=location.href;
filename=(hr.slice(hr.lastIndexOf("/")+1));
purl=(hr.slice(0,hr.lastIndexOf("blame")+6));
path=(hr.slice(hr.lastIndexOf("blame")+6));
path=path.slice(0,path.lastIndexOf("/")+1);

fileind=filearr.indexOf(filename);

if(fileind>-1){
    if(fileind==0){
        blame += '[';
    }
    blame += '{';
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
      blame+='"blameuser":"'+writeContent($(this).find('.avatar > img').attr('alt'))+'",';
      blame+='"href":"'+writeContent($(this).find('.blame-commit-message > .message').attr('href'))+'",'; 
      blame+='"mess":"'+writeContent($(this).find('.blame-commit-message > .message').attr('title'))+'",'; 
      blame +='"rows":[';
      var ii=0;
      $(this).find('.width-full > .flex-items-start').each(function () {
        if(ii>0) blame+=",";
        blame+="{";
        blame+='"row":"'+writeContent($(this).find('.blame-blob-num').text())+'",'; 
        blame+='"code":"'+writeContent($(this).find('.blob-code-inner').text())+'"'; 
        
        
        blame+="}";
        ii++;
      });
      blame+="]";  
      blame+=',"rowcnt":"'+writeContent(ii)+'"'; 

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
