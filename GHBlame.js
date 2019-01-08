// ==UserScript==
// @name        Blame_Scraper_Script
// @namespace   blameScraper
// @description Scraping Blame like a Boss
// @include     https://github.com/HGustavs/LenaSYS/blame/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1
// @grant       GM.xmlHttpRequest
// ==/UserScript==

var dataFile="data_blame_2018_1.js";
var fileind="";
var repo="v0.85"
var repos=["v0.6","v0.7","0.8","v0.85","v0.9","v0.95","v0.10","v0.105","master"]

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
        console.log('Success!',response);
        if(fileind+2<filearr.length){
            location.href=purl+filearr[fileind+3];
        }else{
          alert("end of scrape "+filename)
        }        
        
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
  "install.php",repo+"/install/install.php",
  "init_db.sql",repo+"/install/SQL/init_db.sql",
  "keywords_html.sql",repo+"/install/SQL/keywords_html.sql",
  "keywords_java.sql",repo+"/install/SQL/keywords_java.sql",
  "keywords_php.sql",repo+"/install/SQL/keywords_php.sql",
  "keywords_plain.sql",repo+"/install/SQL/keywords_plain.sql",
  "keywords_sql.sql",repo+"/install/SQL/keywords_sql.sql",
  "keywords_sr.sql",repo+"/install/SQL/keywords_sr.sql",
  "temptable.sql",repo+"/install/SQL/temptable.sql",
  "testdata.sql",repo+"/install/SQL/testdata.sql",

	"accessed.js",repo+"/DuggaSys/accessed.js",
  "accessed.php",repo+"/DuggaSys/accessed.php",
  "accessedservice.php",repo+"/DuggaSys/accessedservice.php",
  "clickcounter.js",repo+"/DuggaSys/clickcounter.js",
  "codeviewer.js",repo+"/DuggaSys/codeviewer.js",
  "codeviewer.php",repo+"/DuggaSys/codeviewer.php",
  "codeviewerService.php",repo+"/DuggaSys/codeviewerService.php",
  "contribution.js",repo+"/DuggaSys/contribution.js",
  "contribution.php",repo+"/DuggaSys/contribution.php",
  "contributionservice.php",repo+"/DuggaSys/contributionservice.php",
  "courseed.js",repo+"/DuggaSys/courseed.js",
  "courseed.php",repo+"/DuggaSys/courseed.php",
  "courseedservice.php",repo+"/DuggaSys/courseedservice.php",
  "cronjob.php",repo+"/DuggaSys/cronjob.php",
	"diagram.js",repo+"/DuggaSys/diagram.js",
  "diagram.php",repo+"/DuggaSys/diagram.php",
  "diagram_example.js",repo+"/DuggaSys/diagram_example.js",
  "diagram_figure.js",repo+"/DuggaSys/diagram_figure.js",
  "diagram_symbol.js",repo+"/DuggaSys/diagram_symbol.js",
	"diagram_toolbox.js",repo+"/DuggaSys/diagram_toolbox.js",
  "diagram_IOHandler.js",repo+"/DuggaSys/diagram_IOHandler.js",
  "diagram_IOHandler.php",repo+"/DuggaSys/diagram_IOHandler.php",
  "diagram_mouse.js",repo+"/DuggaSys/diagram_mouse.js",
  "diagram_dialog.js",repo+"/DuggaSys/diagram_dialog.js",
  "diagramservice.php",repo+"/DuggaSys/diagramservice.php",
  "duggaed.js",repo+"/DuggaSys/duggaed.js",
  "duggaed.php",repo+"/DuggaSys/duggaed.php",
  "duggaedservice.php",repo+"/DuggaSys/duggaedservice.php",
	"fileed.js",repo+"/DuggaSys/fileed.js",
  "fileed.php",repo+"/DuggaSys/fileed.php",
  "fileedservice.php",repo+"/DuggaSys/fileedservice.php",
  "filereceive.php",repo+"/DuggaSys/filereceive.php",
  "filereceive_dugga.php",repo+"/DuggaSys/filereceive_dugga.php",
  "migration.php",repo+"/DuggaSys/migration.php",
  "highscoreservice.php",repo+"/DuggaSys/highscoreservice.php",
  "profile.php",repo+"/DuggaSys/profile.php",
  "profile.js",repo+"/DuggaSys/profile.js",
	"preview.php",repo+"/DuggaSys/preview.php",
  "pushnotifications.js",repo+"/DuggaSys/pushnotifications.js",
  "pushnotifications.php",repo+"/DuggaSys/pushnotifications.php",
  "pushnotificationsserviceworker.js",repo+"/DuggaSys/pushnotificationsserviceworker.js",
  "resulted.js",repo+"/DuggaSys/resulted.js",
  "resulted.php",repo+"/DuggaSys/resulted.php",
  "resultedservice.php",repo+"/DuggaSys/resultedservice.php",
  "sectioned.js",repo+"/DuggaSys/sectioned.js",
  "sectioned.php",repo+"/DuggaSys/sectioned.php",
  "sectionedservice.php",repo+"/DuggaSys/sectionedservice.php",
  "showDugga.php",repo+"/DuggaSys/showDugga.php",
  "showDuggaservice.php",repo+"/DuggaSys/showDuggaservice.php",
  "showdoc.php",repo+"/DuggaSys/showdoc.php",
	"stats.php",repo+"/DuggaSys/stats.php",
  "stats.js",repo+"/DuggaSys/stats.js",
  "swimlane.php",repo+"/DuggaSys/swimlane.php",
  "swimlaneservice.php",repo+"/DuggaSys/swimlaneservice.php",
  "swimlane.js",repo+"/DuggaSys/swimlane.js",
  "testDugga.php",repo+"/DuggaSys/testDugga.php",
  "timer.js",repo+"/DuggaSys/timer.js",
  
	"3d-dugga.html",repo+"/DuggaSys/templates/3d-dugga.html",
  "3d-dugga.js",repo+"/DuggaSys/templates/3d-dugga.js",
  "XMLAPI_report1.html",repo+"/DuggaSys/templates/XMLAPI_report1.html",
  "XMLAPI_report1_file_receive.js",repo+"/DuggaSys/templates/XMLAPI_report1_file_receive.js",
  "bit-dugga.html",repo+"/DuggaSys/templates/bit-dugga.html",
  "bit-dugga.js",repo+"/DuggaSys/templates/bit-dugga.js",
  "boxmodell.html",repo+"/DuggaSys/templates/boxmodell.html",
  "boxmodell.js",repo+"/DuggaSys/templates/boxmodell.js",
  "color-dugga.html",repo+"/DuggaSys/templates/color-dugga.html",
  "color-dugga.js",repo+"/DuggaSys/templates/color-dugga.js",
  "curve-dugga.html",repo+"/DuggaSys/templates/curve-dugga.html",
  "curve-dugga.js",repo+"/DuggaSys/templates/curve-dugga.js",
  "default.js",repo+"/DuggaSys/templates/default.js",
  "feedback_dugga.html",repo+"/DuggaSys/templates/feedback_dugga.html",
  "feedback_dugga.js",repo+"/DuggaSys/templates/feedback_dugga.js",
	"generic_dugga_file_receive.html",repo+"/DuggaSys/templates/generic_dugga_file_receive.html",
  "generic_dugga_file_receive.js",repo+"/DuggaSys/templates/generic_dugga_file_receive.js",
  "html_css_dugga.html",repo+"/DuggaSys/templates/html_css_dugga.html",
  "html_css_dugga.js",repo+"/DuggaSys/templates/html_css_dugga.js",
  "html_css_dugga_light.html",repo+"/DuggaSys/templates/html_css_dugga_light.html",
  "html_css_dugga_light.js",repo+"/DuggaSys/templates/html_css_dugga_light.js",
  "kryss.html",repo+"/DuggaSys/templates/kryss.html",
  "kryss.js",repo+"/DuggaSys/templates/kryss.js",
  "placeholder_dugga.html",repo+"/DuggaSys/templates/placeholder_dugga.html",
  "placeholder_dugga.js",repo+"/DuggaSys/templates/placeholder_dugga.js",
  "shapes-dugga.html",repo+"/DuggaSys/templates/shapes-dugga.html",
  "shapes-dugga.js",repo+"/DuggaSys/templates/shapes-dugga.js",
  "transforms-dugga.html",repo+"/DuggaSys/templates/transforms-dugga.html",
  "transforms-dugga.js",repo+"/DuggaSys/templates/transforms-dugga.js",
	
	"blackTheme.css",repo+"/Shared/css/blackTheme.css",
  "blank.css",repo+"/Shared/css/blank.css",
  "codeviewer.css",repo+"/Shared/css/codeviewer.css",
  "colorblind.css",repo+"/Shared/css/colorblind.css",
  "dugga.css",repo+"/Shared/css/dugga.css",
  "markdown.css",repo+"/Shared/css/markdown.css",
  "style.css",repo+"/Shared/css/style.css",
  "template1.css",repo+"/Shared/css/template1.css",
  "template2.css",repo+"/Shared/css/template2.css",
  "template3.css",repo+"/Shared/css/template3.css",
  "template4.css",repo+"/Shared/css/template4.css",
  "template5.css",repo+"/Shared/css/template5.css",
  "template6.css",repo+"/Shared/css/template6.css",
  "template7.css",repo+"/Shared/css/template7.css",
  "template8.css",repo+"/Shared/css/template8.css",
  "template9.css",repo+"/Shared/css/template9.css",
  "whiteTheme.css",repo+"/Shared/css/whiteTheme.css",
	
  "backup.py",repo+"/Shared/backup.py",
  "basic.php",repo+"/Shared/basic.php",
  "constants.php",repo+"/Shared/constants.php",
  "courses.php",repo+"/Shared/courses.php",
  "coursesyspw.php",repo+"/Shared/coursesyspw.php",
  "database.php",repo+"/Shared/database.php",
  "dugga.js",repo+"/Shared/dugga.js",
  "loginbox.php",repo+"/Shared/loginbox.php",
  "loginlogout.php",repo+"/Shared/loginlogout.php",
  "markdown.js",repo+"/Shared/markdown.js",
  "navheader.php",repo+"/Shared/navheader.php",
  "sessions.php",repo+"/Shared/sessions.php",
  "resetpw.php",repo+"/Shared/resetpw.php",  
	"pushnotificationshelper.php",repo+"/Shared/pushnotificationshelper.php",  
  
	"branch_merge_strategy.md",repo+"/branch_merge_strategy.md",
	"code_standard.md",repo+"/code_standard.md",
	"lenasys-markdown.txt",repo+"/lenasys-markdown.txt"
	
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
  
}else{
  alert(filename+" not found in array");
}
