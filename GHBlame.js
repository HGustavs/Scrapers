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
var repo="master"

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
        console.log(fileind,filearr.length)
        fileind++;
        if(fileind<filearr.length){
          	console.log(purl+repo+"/"+filearr[fileind])
            location.href=purl+repo+"/"+filearr[fileind];
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
var blame = '';
var blamefile = '';


hr=location.href;
filename=(hr.slice(hr.lastIndexOf("/")+1));
purl=(hr.slice(0,hr.lastIndexOf("blame")+6));
path=(hr.slice(hr.lastIndexOf("blame")+6));
repo=(path.slice(0,path.indexOf("/")));
path=path.slice(path.indexOf("/")+1,path.lastIndexOf("/")+1);

var filearr=[];
if(repo=='v0.4'){
		filearr="PlayerEditor/js/Preload.js,PlayerEditor/imagerecorder/check_duplicate.php,PlayerEditor/imagerecorder/js/imagerecorder.js,PlayerEditor/imagerecorder/imagerecorder.php,PlayerEditor/imagerecorder/stylesheet.css,PlayerEditor/imagerecorder/upload.php,PlayerEditor/imagerecorder/logfile.php,PlayerEditor/imagerecorder/delete.php,PlayerEditor/consolerenderer/js/caretstate.js,PlayerEditor/consolerenderer/js/tile.js,PlayerEditor/consolerenderer/js/cons.js,PlayerEditor/consolerenderer/js/tiledata.js,PlayerEditor/consolerenderer/design.css,PlayerEditor/consolerenderer/consolerenderer.html,PlayerEditor/canvaswrapper/index.html,PlayerEditor/canvaswrapper/js/canvaswrapper.js,PlayerEditor/canvaswrapper/canvas.xml,PlayerEditor/canvasrenderer/js/canvasrenderer.js,PlayerEditor/canvasrenderer/style.css,PlayerEditor/canvasrenderer/canvasrenderer.php,Shared/functions.php,Shared/init_db.sql,Shared/sessions.php,Shared/courses.php,Shared/database.php,Shared/BenchmarkLogging/webgl-utils.js,Shared/BenchmarkLogging/parseagents.php,Shared/BenchmarkLogging/index.html,Shared/BenchmarkLogging/httpAjax.js,Shared/BenchmarkLogging/Benchy.php,Shared/constants.php,Shared/basic.php,Shared/coursesyspw.php,Shared/SQL/init_db.sql,CodeViewer/css/colorblind.css,CodeViewer/css/blank.css,CodeViewer/css/codeviewer.css,CodeViewer/css/template5.css,CodeViewer/css/template4.css,CodeViewer/css/template3.css,CodeViewer/css/template2.css,CodeViewer/css/blackTheme.css,CodeViewer/css/template1.css,CodeViewer/css/responsive.css,CodeViewer/css/whiteTheme.css,CodeViewer/js/jquery-1.5.1.min.js,CodeViewer/js/codeviewer.js,CodeViewer/js/tooltips.js,CodeViewer/js/templates.js,CodeViewer/editorService.php,CodeViewer/EditorV30.php,CodeViewer/basic.php,DuggaSys/index.php,DuggaSys/css/style.css,DuggaSys/js/paginationStudentlist.js,DuggaSys/js/paginationAccesslist.js,DuggaSys/js/section.js,DuggaSys/js/jquery.datetimepicker.js,DuggaSys/js/sectionhandler.js,DuggaSys/js/duggasys.js,DuggaSys/js/verificationFunctions.js,DuggaSys/js/pagination.js,DuggaSys/js/ajax.js,DuggaSys/templates/exampledugga4.js,DuggaSys/templates/exampledugga5.js,DuggaSys/templates/exampledugga1.js,DuggaSys/templates/exampledugga6.js,DuggaSys/templates/exampledugga2.js,DuggaSys/templates/exampledugga3.js,DuggaSys/templates/exampledugga7.js,DuggaSys/templates/kryss.js,DuggaSys/templates/default.js,DuggaSys/pages/newpassword.php,DuggaSys/pages/404.php,DuggaSys/pages/eventlog.php,DuggaSys/pages/students.php,DuggaSys/pages/newCourseForm.php,DuggaSys/pages/editsection.php,DuggaSys/pages/sectioned.php,DuggaSys/pages/addstudent.php,DuggaSys/pages/menulist.php,DuggaSys/pages/quiz/testfiles/index.php,DuggaSys/pages/quiz/menu.php,DuggaSys/pages/quiz/studentlist.php,DuggaSys/pages/quiz/edit.php,DuggaSys/pages/quiz/quiz.php,DuggaSys/pages/newSectionForm.php,DuggaSys/pages/noid.php,DuggaSys/pages/myresults.php,DuggaSys/header/css/style.css,DuggaSys/header/content/login.php,DuggaSys/header/content/menu.php,DuggaSys/header/content/header.php,DuggaSys/header/header.js,DuggaSys/header/login.js,DuggaSys/header/ajax/newpassword.php,DuggaSys/header/ajax/login.php,DuggaSys/header/ajax/logout.php,DuggaSys/header/ajax/forgotpassword.php,DuggaSys/ajax/newpassword.php,DuggaSys/ajax/SectionedService.php,DuggaSys/ajax/testduggaService.php,DuggaSys/ajax/createQuiz.php,DuggaSys/ajax/createNewCourse.php,DuggaSys/ajax/updateStudentGrade.php,DuggaSys/ajax/resetpassword_ajax.php,DuggaSys/ajax/updateAccess.php,DuggaSys/ajax/deletestudent_ajax.php,DuggaSys/ajax/updateSections.php,DuggaSys/ajax/getstudent_ajax.php,DuggaSys/ajax/getQuizData.php,DuggaSys/ajax/updateCourses.php,DuggaSys/ajax/getQuizFiles.php,DuggaSys/ajax/user_results.php,DuggaSys/ajax/getQuiz.php,DuggaSys/ajax/addstudent_ajax.php,DuggaSys/ajax/checkanswers_ajax.php,DuggaSys/ajax/getTemplateInfo.php,DuggaSys/ajax/getTest.php,DuggaSys/ajax/studentlist_results.php".split(",");
}else if(repo=='v0.7'){
		filearr="PlayerEditor/imagerecorder/check_duplicate.php,PlayerEditor/imagerecorder/js/imagerecorder.js,PlayerEditor/imagerecorder/imagerecorder.php,PlayerEditor/imagerecorder/stylesheet.css,PlayerEditor/imagerecorder/upload.php,PlayerEditor/imagerecorder/logfile.php,PlayerEditor/imagerecorder/delete.php,PlayerEditor/consolerenderer/images/bakgrund.png,PlayerEditor/consolerenderer/js/caretstate.js,PlayerEditor/consolerenderer/js/tile.js,PlayerEditor/consolerenderer/js/cons.js,PlayerEditor/consolerenderer/js/tiledata.js,PlayerEditor/consolerenderer/design.css,PlayerEditor/canvaswrapper/index.html,PlayerEditor/canvaswrapper/js/canvaswrapper.js,PlayerEditor/canvaswrapper/logfile.php,PlayerEditor/canvasrenderer/js/canvasrenderer.js,PlayerEditor/canvasrenderer/style.css,PlayerEditor/canvasrenderer/canvasrenderer.php,Shared/loginlogout.php,Shared/dugga.js,Shared/sessions.php,Shared/css/colorblind.css,Shared/css/blank.css,Shared/css/codeviewer.css,Shared/css/jquery.datetimepicker.css,Shared/css/jquery-ui-1.10.4.min.css,Shared/css/template5.css,Shared/css/template4.css,Shared/css/template6.css,Shared/css/template3.css,Shared/css/template2.css,Shared/css/blackTheme.css,Shared/css/template1.css,Shared/css/responsive.css,Shared/css/style.css,Shared/css/whiteTheme.css,Shared/courses.php,Shared/js/Preload.js,Shared/js/tooltips.js,Shared/database.php,Shared/BenchmarkLogging/parseagents.php,Shared/BenchmarkLogging/index.html,Shared/BenchmarkLogging/httpAjax.js,Shared/BenchmarkLogging/Benchy.php,Shared/loginprompt.php,Shared/constants.php,Shared/navheader.php,Shared/basic.php,Shared/loginbox.php,Shared/SQL/init_db.sql,Shared/SQL/testdata.sql,CodeViewer/codeviewer.js,CodeViewer/editorService.php,CodeViewer/dragndropService.php,CodeViewer/dragndrop.js,CodeViewer/dragndrop.php,CodeViewer/EditorV50.php,DuggaSys/sectionedservice.php,DuggaSys/resultlisted.php,DuggaSys/filereceive.php,DuggaSys/timer.js,DuggaSys/showdoc.php,DuggaSys/courseed.js,DuggaSys/accessedservice.php,DuggaSys/courseedservice.php,DuggaSys/highscoreservice.php,DuggaSys/fileed.js,DuggaSys/sectioned.js,DuggaSys/showDugga.php,DuggaSys/showDuggaservice.php,DuggaSys/accessed.php,DuggaSys/resultlistedservice.php,DuggaSys/sectioned.php,DuggaSys/resulted.js,DuggaSys/duggaed.php,DuggaSys/duggaedservice.php,DuggaSys/courseed.php,DuggaSys/fileed.php,DuggaSys/resultedservice.php,DuggaSys/fileedservice.php,DuggaSys/resulted.php,DuggaSys/templates/dugga1.html,DuggaSys/templates/dugga3.js,DuggaSys/templates/dugga2.js,DuggaSys/templates/exampledugga1.js,DuggaSys/templates/dugga.css,DuggaSys/templates/transforms.html,DuggaSys/templates/dugga1.js,DuggaSys/templates/exampledugga.js,DuggaSys/templates/exampledugga2.js,DuggaSys/templates/dugga5.js,DuggaSys/templates/dugga3.html,DuggaSys/templates/dugga2.html,DuggaSys/templates/exampledugga3.js,DuggaSys/templates/kryss.html,DuggaSys/templates/dugga4.js,DuggaSys/templates/exampledugga7.js,DuggaSys/templates/dugga5.html,DuggaSys/templates/kryss.js,DuggaSys/templates/default.js,DuggaSys/templates/dugga4.html,DuggaSys/clickcounter.js,DuggaSys/resultlisted.js,DuggaSys/accessed.js,DuggaSys/duggaed.js,UserManagementView/usermanagementviewservice.php,UserManagementView/css/studentView.css,UserManagementView/css/progressbar2.css,UserManagementView/css/umv.css,UserManagementView/umvSearch.php,UserManagementView/js/studentView.js,UserManagementView/js/teacherView.js,UserManagementView/studentView.php,UserManagementView/redirector.php,UserManagementView/teacherView.php".split(",");
}else if(repo=='v0.85'){
		filearr="PlayerEditor/imagerecorder/check_duplicate.php,PlayerEditor/imagerecorder/js/imagerecorder.js,PlayerEditor/imagerecorder/imagerecorder.php,PlayerEditor/imagerecorder/stylesheet.css,PlayerEditor/imagerecorder/upload.php,PlayerEditor/imagerecorder/logfile.php,PlayerEditor/imagerecorder/delete.php,PlayerEditor/consolerenderer/js/caretstate.js,PlayerEditor/consolerenderer/js/tile.js,PlayerEditor/consolerenderer/js/cons.js,PlayerEditor/consolerenderer/js/tiledata.js,PlayerEditor/consolerenderer/design.css,PlayerEditor/consolerenderer/consolerenderer.html,PlayerEditor/canvaswrapper/index.html,PlayerEditor/canvaswrapper/js/canvaswrapper.js,PlayerEditor/canvaswrapper/logfile.php,PlayerEditor/canvasrenderer/js/canvasrenderer.js,PlayerEditor/canvasrenderer/style.css,Shared/loginlogout.php,Shared/backup.py,Shared/dugga.js,Shared/sessions.php,Shared/allowCookiesForUser.php,Shared/css/colorblind.css,Shared/css/blank.css,Shared/css/codeviewer.css,Shared/css/jquery.datetimepicker.css,Shared/css/jquery-ui-1.10.4.min.css,Shared/css/ubuntu-mono-webfont.eot,Shared/css/template5.css,Shared/css/template4.css,Shared/css/template6.css,Shared/css/markdown.css,Shared/css/template7.css,Shared/css/template3.css,Shared/css/template2.css,Shared/css/blackTheme.css,Shared/css/template1.css,Shared/css/hack-extended.min.css,Shared/css/style.css,Shared/css/template9.css,Shared/css/template8.css,Shared/css/whiteTheme.css,Shared/courses.php,Shared/js/Preload.js,Shared/js/tooltips.js,Shared/database.php,Shared/lockbox.php,Shared/BenchmarkLogging/parseagents.php,Shared/BenchmarkLogging/index.html,Shared/BenchmarkLogging/Test1Mountains.html,Shared/BenchmarkLogging/httpAjax.js,Shared/BenchmarkLogging/Benchy.php,Shared/loginprompt.php,Shared/constants.php,Shared/getCookies.php,Shared/navheader.php,Shared/duggaTriedLock.php,Shared/basic.php,Shared/coursesyspw.php,Shared/markdown.js,Shared/loginbox.php,Shared/SQL/init_db.sql,Shared/SQL/add_fontsize_box.sql,Shared/SQL/add_new_templates.sql,Shared/SQL/testdata.sql,DuggaSys/sectionedservice.php,DuggaSys/resultlisted.php,DuggaSys/preview.php,DuggaSys/filereceive.php,DuggaSys/timer.js,DuggaSys/forum.php,DuggaSys/showdoc.php,DuggaSys/changePasswordForm.php,DuggaSys/courseed.js,DuggaSys/accessedservice.php,DuggaSys/courseedservice.php,DuggaSys/filereceive_dugga.php,DuggaSys/highscoreservice.php,DuggaSys/fileed.js,DuggaSys/codeviewer.js,DuggaSys/sectioned.js,DuggaSys/showDugga.php,DuggaSys/showDuggaservice.php,DuggaSys/accessed.php,DuggaSys/optionservice.php,DuggaSys/findUsers.php,DuggaSys/resultlistedservice.php,DuggaSys/sectioned.php,DuggaSys/options.js,DuggaSys/codeviewer.php,DuggaSys/analytictool.php,DuggaSys/resulted.js,DuggaSys/duggaed.php,DuggaSys/duggaedservice.php,DuggaSys/serviceconfirmation.php,DuggaSys/changePassword.php,DuggaSys/courseed.php,DuggaSys/fileed.php,DuggaSys/resultedservice.php,DuggaSys/fileedservice.php,DuggaSys/filereceiveDuggaTemplate.php,DuggaSys/error.php,DuggaSys/analytictoolservice.php,DuggaSys/forumEditor.php,DuggaSys/resulted.php,DuggaSys/options.php,DuggaSys/codeviewerService.php,DuggaSys/templates/boxmodell.html,DuggaSys/templates/html_css_dugga.html,DuggaSys/templates/placeholder_dugga.html,DuggaSys/templates/shapes-dugga.html,DuggaSys/templates/html_css_dugga_light.js,DuggaSys/templates/shapes-dugga.js,DuggaSys/templates/dugga1.html,DuggaSys/templates/placeholder_dugga.js,DuggaSys/templates/exampledugga4.js,DuggaSys/templates/generic_dugga_file_receive.js,DuggaSys/templates/dugga3.js,DuggaSys/templates/exampledugga5.js,DuggaSys/templates/dugga2.js,DuggaSys/templates/exampledugga1.js,DuggaSys/templates/dugga.css,DuggaSys/templates/transforms.html,DuggaSys/templates/exampledugga6.js,DuggaSys/templates/dugga1.js,DuggaSys/templates/exampledugga.js,DuggaSys/templates/exampledugga2.js,DuggaSys/templates/shader_dugga1.html,DuggaSys/templates/dugga5.js,DuggaSys/templates/dugga3.html,DuggaSys/templates/dugga2.html,DuggaSys/templates/exampledugga3.js,DuggaSys/templates/kryss.html,DuggaSys/templates/dugga4.js,DuggaSys/templates/exampledugga7.js,DuggaSys/templates/html_css_dugga_light.html,DuggaSys/templates/html_css_dugga.js,DuggaSys/templates/dugga5.html,DuggaSys/templates/kryss.js,DuggaSys/templates/default.js,DuggaSys/templates/boxmodell.js,DuggaSys/templates/dugga4.html,DuggaSys/templates/color_darkgreen.png,DuggaSys/templates/XMLAPI_report1_file_receive.js,DuggaSys/templates/XMLAPI_report1.html,DuggaSys/templates/generic_dugga_file_receive.html,DuggaSys/clickcounter.js,DuggaSys/thread.php,DuggaSys/resultlisted.js,DuggaSys/logservice.php,DuggaSys/accessed.js,DuggaSys/testDugga.php,DuggaSys/searchFrame.php,DuggaSys/forumservice.php,DuggaSys/duggaed.js,DuggaSys/forum.js,DuggaSys/analytictool.js,UserManagementView/usermanagementviewservice.php,UserManagementView/changepw.php,UserManagementView/css,UserManagementView/css/studentView.css,UserManagementView/css/progressbar2.css,UserManagementView/css/umv.css,UserManagementView/umvSearch.php,UserManagementView/js,UserManagementView/js/studentView.js,UserManagementView/js/teacherView.js,UserManagementView/studentView.php,UserManagementView/redirector.php,UserManagementView/teacherView.php,UserManagementView/changeteacherpw.php,install.py".split(",");
}else if(repo=='v0.95'){
		filearr="errorpages/404.php,errorpages/403.php,install/install.php,install/CSS/install_style.css,Shared/loginlogout.php,Shared/backup.py,Shared/dugga.js,Shared/sessions.php,Shared/css/colorblind.css,Shared/css/blank.css,Shared/css/codeviewer.css,Shared/css/template5.css,Shared/css/template4.css,Shared/css/template6.css,Shared/css/markdown.css,Shared/css/template7.css,Shared/css/template3.css,Shared/css/template2.css,Shared/css/blackTheme.css,Shared/css/dugga.css,Shared/css/template1.css,Shared/css/style.css,Shared/css/template9.css,Shared/css/template8.css,Shared/css/throbber.gif,Shared/css/whiteTheme.css,Shared/courses.php,Shared/database.php,Shared/BenchmarkLogging/parseagents.php,Shared/BenchmarkLogging/index.html,Shared/BenchmarkLogging/httpAjax.js,Shared/BenchmarkLogging/Benchy.php,Shared/pushnotificationshelper.php,Shared/constants.php,Shared/navheader.php,Shared/resetpw.php,Shared/basic.php,Shared/markdown.js,Shared/loginbox.php,DuggaSys/swimlane.js,DuggaSys/sectionedservice.php,DuggaSys/contributionservice.php,DuggaSys/pushnotificationsserviceworker.js,DuggaSys/groupedservice.php,DuggaSys/profile.js,DuggaSys/preview.php,DuggaSys/filereceive.php,DuggaSys/timer.js,DuggaSys/showdoc.php,DuggaSys/diagram_dialog.js,DuggaSys/courseed.js,DuggaSys/accessedservice.php,DuggaSys/courseedservice.php,DuggaSys/filereceive_dugga.php,DuggaSys/pushnotifications.php,DuggaSys/forms/attribute_appearance.php,DuggaSys/forms/font_appearance.php,DuggaSys/forms/textsize_appearance.php,DuggaSys/forms/line-thickness_appearance.php,DuggaSys/forms/class_appearance.php,DuggaSys/forms/figure_appearance.php,DuggaSys/forms/fontcolor_appearance.php,DuggaSys/forms/entity_appearance.php,DuggaSys/forms/global_appearance.php,DuggaSys/forms/line_appearance.php,DuggaSys/forms/relation_appearance.php,DuggaSys/forms/fillcolor_appearance.php,DuggaSys/forms/strokecolor_appearance.php,DuggaSys/highscoreservice.php,DuggaSys/fileed.js,DuggaSys/codeviewer.js,DuggaSys/sectioned.js,DuggaSys/showDugga.php,DuggaSys/showDuggaservice.php,DuggaSys/accessed.php,DuggaSys/diagram_figure.js,DuggaSys/diagramservice.php,DuggaSys/diagram_symbol.js,DuggaSys/sectioned.php,DuggaSys/codeviewer.php,DuggaSys/swimlaneservice.php,DuggaSys/resulted.js,DuggaSys/duggaed.php,DuggaSys/grouped.php,DuggaSys/cronjob.php,DuggaSys/duggaedservice.php,DuggaSys/diagram.js,DuggaSys/courseed.php,DuggaSys/diagram_toolbox.js,DuggaSys/fileed.php,DuggaSys/resultedservice.php,DuggaSys/stats.php,DuggaSys/fileedservice.php,DuggaSys/profileservice.php,DuggaSys/resulted.php,DuggaSys/codeviewerService.php,DuggaSys/profile.php,DuggaSys/grouped.js,DuggaSys/clickcounter.js,DuggaSys/diagram_IOHandler.php,DuggaSys/diagram_mouse.js,DuggaSys/pushnotifications.js,DuggaSys/swimlane.php,DuggaSys/diagram_example.js,DuggaSys/accessed.js,DuggaSys/testDugga.php,DuggaSys/diagram_IOHandler.js,DuggaSys/diagram.php,DuggaSys/contribution.php,DuggaSys/stats.js,DuggaSys/contribution.js,DuggaSys/duggaed.js".split(",");
}else if(repo=='v0.105'){
		filearr="errorpages/404.php,errorpages/403.php,install/install.php,install/CSS/install_style.css,install/SQL/keywords_java.sql,install/SQL/init_db.sql,install/SQL/keywords_php.sql,install/SQL/temptable.sql,install/SQL/keywords_sr.sql,install/SQL/changes.txt,install/SQL/keywords_sql.sql,install/SQL/testdata.sql,install/SQL/keywords_html.sql,install/SQL/keywords_plain.sql,Shared/loginlogout.php,Shared/backup.py,Shared/dugga.js,Shared/sessions.php,Shared/css/colorblind.css,Shared/css/blank.css,Shared/css/codeviewer.css,Shared/css/jquery.datetimepicker.css,Shared/css/jquery-ui-1.10.4.min.css,Shared/css/template5.css,Shared/css/template4.css,Shared/css/template6.css,Shared/css/markdown.css,Shared/css/template7.css,Shared/css/template3.css,Shared/css/template2.css,Shared/css/blackTheme.css,Shared/css/dugga.css,Shared/css/template1.css,Shared/css/style.css,Shared/css/template9.css,Shared/css/template8.css,Shared/css/whiteTheme.css,Shared/courses.php,Shared/database.php,Shared/BenchmarkLogging/parseagents.php,Shared/BenchmarkLogging/index.html,Shared/BenchmarkLogging/httpAjax.js,Shared/BenchmarkLogging/Benchy.php,Shared/pushnotificationshelper.php,Shared/constants.php,Shared/navheader.php,Shared/resetpw.php,Shared/basic.php,Shared/coursesyspw.php,Shared/markdown.js,Shared/loginbox.php,Shared/SQL/init_db.sql,Shared/SQL/strutt.sql,Shared/SQL/deltachange.sql,DuggaSys/swimlane.js,DuggaSys/sectionedservice.php,DuggaSys/contributionservice.php,DuggaSys/pushnotificationsserviceworker.js,DuggaSys/groupedservice.php,DuggaSys/profile.js,DuggaSys/preview.php,DuggaSys/filereceive.php,DuggaSys/timer.js,DuggaSys/showdoc.php,DuggaSys/diagram_dialog.js,DuggaSys/courseed.js,DuggaSys/accessedservice.php,DuggaSys/courseedservice.php,DuggaSys/filereceive_dugga.php,DuggaSys/pushnotifications.php,DuggaSys/forms,DuggaSys/forms/attribute_appearance.php,DuggaSys/forms/font_appearance.php,DuggaSys/forms/textsize_appearance.php,DuggaSys/forms/line-thickness_appearance.php,DuggaSys/forms/class_appearance.php,DuggaSys/forms/figure_appearance.php,DuggaSys/forms/fontcolor_appearance.php,DuggaSys/forms/entity_appearance.php,DuggaSys/forms/global_appearance.php,DuggaSys/forms/line_appearance.php,DuggaSys/forms/relation_appearance.php,DuggaSys/forms/fillcolor_appearance.php,DuggaSys/forms/strokecolor_appearance.php,DuggaSys/highscoreservice.php,DuggaSys/fileed.js,DuggaSys/codeviewer.js,DuggaSys/sectioned.js,DuggaSys/showDugga.php,DuggaSys/showDuggaservice.php,DuggaSys/accessed.php,DuggaSys/diagram_figure.js,DuggaSys/diagramservice.php,DuggaSys/diagram_symbol.js,DuggaSys/sectioned.php,DuggaSys/codeviewer.php,DuggaSys/swimlaneservice.php,DuggaSys/resulted.js,DuggaSys/duggaed.php,DuggaSys/grouped.php,DuggaSys/cronjob.php,DuggaSys/duggaedservice.php,DuggaSys/diagram.js,DuggaSys/courseed.php,DuggaSys/diagram_toolbox.js,DuggaSys/fileed.php,DuggaSys/resultedservice.php,DuggaSys/stats.php,DuggaSys/fileedservice.php,DuggaSys/profileservice.php,DuggaSys/resulted.php,DuggaSys/codeviewerService.php,DuggaSys/profile.php,DuggaSys/grouped.js,DuggaSys/clickcounter.js,DuggaSys/diagram_mouse.js,DuggaSys/pushnotifications.js,DuggaSys/swimlane.php,DuggaSys/diagram_example.js,DuggaSys/accessed.js,DuggaSys/testDugga.php,DuggaSys/diagram_IOHandler.js,DuggaSys/diagram.php,DuggaSys/contribution.php,DuggaSys/stats.js,DuggaSys/contribution.js,DuggaSys/duggaed.js".split(",");
}else{
  	filearr="errorpages/404.php,errorpages/403.php,install/install.php,install/CSS/install_style.css,install/SQL/keywords_java.sql,install/SQL/init_db.sql,install/SQL/keywords_php.sql,install/SQL/temptable.sql,install/SQL/keywords_sr.sql,install/SQL/changes.txt,install/SQL/keywords_sql.sql,install/SQL/testdata.sql,install/SQL/keywords_html.sql,install/SQL/keywords_plain.sql,Shared/loginlogout.php,Shared/backup.py,Shared/dugga.js,Shared/sessions.php,Shared/css/colorblind.css,Shared/css/blank.css,Shared/css/codeviewer.css,Shared/css/jquery.datetimepicker.css,Shared/css/jquery-ui-1.10.4.min.css,Shared/css/template5.css,Shared/css/template4.css,Shared/css/template6.css,Shared/css/markdown.css,Shared/css/template7.css,Shared/css/template3.css,Shared/css/template2.css,Shared/css/blackTheme.css,Shared/css/dugga.css,Shared/css/template1.css,Shared/css/style.css,Shared/css/template9.css,Shared/css/template8.css,Shared/css/whiteTheme.css,Shared/courses.php,Shared/database.php,Shared/BenchmarkLogging/parseagents.php,Shared/BenchmarkLogging/index.html,Shared/BenchmarkLogging/httpAjax.js,Shared/BenchmarkLogging/Benchy.php,Shared/pushnotificationshelper.php,Shared/constants.php,Shared/navheader.php,Shared/resetpw.php,Shared/basic.php,Shared/coursesyspw.php,Shared/markdown.js,Shared/loginbox.php,Shared/SQL/init_db.sql,Shared/SQL/strutt.sql,Shared/SQL/deltachange.sql,DuggaSys/swimlane.js,DuggaSys/sectionedservice.php,DuggaSys/contributionservice.php,DuggaSys/pushnotificationsserviceworker.js,DuggaSys/groupedservice.php,DuggaSys/profile.js,DuggaSys/preview.php,DuggaSys/filereceive.php,DuggaSys/timer.js,DuggaSys/showdoc.php,DuggaSys/diagram_dialog.js,DuggaSys/courseed.js,DuggaSys/accessedservice.php,DuggaSys/courseedservice.php,DuggaSys/filereceive_dugga.php,DuggaSys/pushnotifications.php,DuggaSys/forms,DuggaSys/forms/attribute_appearance.php,DuggaSys/forms/font_appearance.php,DuggaSys/forms/textsize_appearance.php,DuggaSys/forms/line-thickness_appearance.php,DuggaSys/forms/class_appearance.php,DuggaSys/forms/figure_appearance.php,DuggaSys/forms/fontcolor_appearance.php,DuggaSys/forms/entity_appearance.php,DuggaSys/forms/global_appearance.php,DuggaSys/forms/line_appearance.php,DuggaSys/forms/relation_appearance.php,DuggaSys/forms/fillcolor_appearance.php,DuggaSys/forms/strokecolor_appearance.php,DuggaSys/highscoreservice.php,DuggaSys/fileed.js,DuggaSys/codeviewer.js,DuggaSys/sectioned.js,DuggaSys/showDugga.php,DuggaSys/showDuggaservice.php,DuggaSys/accessed.php,DuggaSys/diagram_figure.js,DuggaSys/diagramservice.php,DuggaSys/diagram_symbol.js,DuggaSys/sectioned.php,DuggaSys/codeviewer.php,DuggaSys/swimlaneservice.php,DuggaSys/resulted.js,DuggaSys/duggaed.php,DuggaSys/grouped.php,DuggaSys/cronjob.php,DuggaSys/duggaedservice.php,DuggaSys/diagram.js,DuggaSys/courseed.php,DuggaSys/diagram_toolbox.js,DuggaSys/fileed.php,DuggaSys/resultedservice.php,DuggaSys/stats.php,DuggaSys/fileedservice.php,DuggaSys/profileservice.php,DuggaSys/resulted.php,DuggaSys/codeviewerService.php,DuggaSys/profile.php,DuggaSys/grouped.js,DuggaSys/clickcounter.js,DuggaSys/diagram_mouse.js,DuggaSys/pushnotifications.js,DuggaSys/swimlane.php,DuggaSys/diagram_example.js,DuggaSys/accessed.js,DuggaSys/testDugga.php,DuggaSys/diagram_IOHandler.js,DuggaSys/diagram.php,DuggaSys/contribution.php,DuggaSys/stats.js,DuggaSys/contribution.js,DuggaSys/duggaed.js".split(",");
}

fileind=filearr.indexOf(path+filename);

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
  console.log(filearr)
  alert(path+filename+" not found in array "+ repo +"="+ JSON.stringify(filearr));
}
