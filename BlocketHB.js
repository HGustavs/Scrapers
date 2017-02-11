// ==UserScript==
// @name        BlocketHusbilScraper
// @namespace   Blocket Husbil
// @description Scraping Husbil Kostnad Per Dag
// @include     https://www.blocket.se/*
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

function ajaxCall(data) {
  try {
    GM_xmlhttpRequest({
      method: 'POST',
      url: 'http://localhost/testwritefile/writefile.php',
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

issue += '"articles":[';

var iii=0;

$('#item_list > article').each(function () {

    var heading=$(this).find('.media-heading').text().trim();
    var minp=heading.indexOf("-");
    if(minp>-1){
      var model=heading.substr(minp+1,2);
    }else{
      var model="UNK"
    } 
    var uheading=heading.toLowerCase();
    var brand="UNK";

    if(uheading.indexOf("tourer")!=-1) brand="LMC";  
    if(uheading.indexOf("pössl")!=-1) brand="Poessl";
    if(uheading.indexOf("globecar")!=-1) brand="Globecar";
    if(uheading.indexOf("foxy")!=-1) brand="Pilote"; 
    if(uheading.indexOf("V630")!=-1) brand="Pilote"; 
    if(uheading.indexOf("strada")!=-1) brand="La Strada";  
    if(uheading.indexOf("boxstar")!=-1) brand="Knaus";  
    if(uheading.indexOf("box star")!=-1) brand="Knaus";  
    if(uheading.indexOf("boxlife")!=-1) brand="Knaus";  
    if(uheading.indexOf("box life")!=-1) brand="Knaus";  
    if(uheading.indexOf("twin")!=-1) brand="Adria"; 
    if(uheading.indexOf("twist")!=-1) brand="Adria"; 
    if(uheading.indexOf("win")!=-1 && uheading.indexOf("adria")!=-1) brand="Adria";   
    if(uheading.indexOf("space")!=-1) brand="Adria";  
    if(uheading.indexOf("karmann")!=-1) brand="Karmann";
    if(uheading.indexOf("davis")!=-1) brand="Karmann";
    if(uheading.indexOf("hymer car")!=-1) brand="Hymercar";  
    if(uheading.indexOf("hymercar")!=-1) brand="Hymercar";  
    if(uheading.indexOf("hymer car")!=-1) brand="Hymercar";  
    if(uheading.indexOf("malibu")!=-1) brand="Carthago";  
    if(uheading.indexOf("vantana")!=-1) brand="Hobby";  
    if(uheading.indexOf("westfalia")!=-1) brand="Westfalia";  
    if(uheading.indexOf("van tourer")!=-1) brand="VanTourer";  
    if(uheading.indexOf("vantourer")!=-1) brand="VanTourer";  
    if(uheading.indexOf("weinsberg")!=-1) brand="Weinsberg";  
    if(uheading.indexOf("itineo")!=-1) brand="Itineo";  
    if(uheading.indexOf("road car")!=-1) brand="Roadcar";  
    if(uheading.indexOf("roadcar")!=-1) brand="Roadcar";  
    if(uheading.indexOf("dexter")!=-1) brand="Karmann";  
    if(uheading.indexOf("city car")!=-1) brand="Burstner";  
    if(uheading.indexOf("citycar")!=-1) brand="Burstner";  
    if(uheading.indexOf("trigano")!=-1) brand="Trigano";  
    if(uheading.indexOf("dreamer")!=-1) brand="Itineo";  
    if(uheading.indexOf("benivan")!=-1) brand="Benimar";    
    if(uheading.indexOf("sprinter")!=-1) brand="Karmann";  
    if(uheading.indexOf("challenger")!=-1) brand="Challenger";  
    if(uheading.indexOf("kyros")!=-1) brand="CI";  
    if(uheading.indexOf("kuros")!=-1) brand="CI";  
    if(uheading.indexOf("sprinter")!=-1) brand="MB";  
    if(uheading.indexOf("benivan")!=-1) brand="Beinmar";  
    if(uheading.indexOf("westfalia")!=-1) brand="Westfalia";  
  
    if(brand!="UNK"){
      if (iii != 0) issue += ',';
      iii++;
      issue += '{';

      var price=$(this).find('.list_price').text();
      price = price.slice(0,-2);

      var heading=$(this).find('.media-heading').text();

      var link=$(this).find('.item_link').attr('href');
      var dat=$(this).find('.pull-right').attr('datetime');
      var cat=$(this).find('.pull-left').text();

      price=price.replace(/['"]+/g, '')
      heading=heading.replace(/['"]+/g, '')
      link=link.replace(/['"]+/g, '')
      dat=dat.replace(/['"]+/g, '')
      model=model.replace(/['"]+/g, '')
      cat=cat.replace(/['"]+/g, '')
      brand=brand.replace(/['"]+/g, '')

      heading=heading.replace(/\s+/g,' ')

      issue+='"price":"'+price+'",';
      issue+='"heading":"'+heading+'",';
      issue+='"link":"'+link+'",';
      issue+='"dat":"'+dat+'",';
      issue+='"model":"'+model+'",';
      issue+='"cat":"'+cat+'",';
      issue+='"brand":"'+brand+'"';

      issue +='}';
  }
      
});

issue += ']';

issue +=',"Content":[';

// If husbil!
$('a[title="Husvagnar & Husbilar"]').each( function(){
   var bod=$('.body').text().trim();
   
   var heading=$('.subject_small').text().trim();
   if(heading=="") heading=$('.subject_large').text().trim();
   if(heading=="") heading=$('.subject_medium').text().trim();
   
   var comp= $('#login_to_reply_name').text();

    bod=bod.replace(/['"]+/g, '')
    heading=heading.replace(/['"]+/g, '')
    comp=comp.replace(/['"]+/g, '')

    bod=bod.replace(/\s+/g,' ')
    heading=heading.replace(/\s+/g,' ')

    var minp=heading.indexOf("-");
    if(minp>-1){
      var model=heading.substr(minp+1,2);
    }else{
      var model="UNK"
    }
    var getdate=new Date();
  
    issue +='{';
  
    issue+='"images":[';
    var kku=0;
    $('.js-carousel-next > img').each( function(){
      if(kku>0) issue+=',';
      kku++;
      issue+='"'+$(this).attr('data-src')+'"';
    });
    issue+='],';
  
    issue+='"heading":"'+heading+'",';
    issue+='"bod":"'+bod+'",';
    issue+='"model":"'+model+'",';   
    issue+='"getdate":"'+getdate+'",';   
    issue+='"comp":"'+comp+'"';
   
    issue +='}';
    iii++;
});



issue+=']';

issue += '},\n';

if (iii>0){
//  alert(issue);
  ajaxCall(issue);
} 
