let request=require("request");
let cheerio=require("cheerio");
let path=require("path");
let fs=require("fs");
let scorecardObject=require("./scorecard");
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url,cb);
function cb(error,response,html){
if(error){
    console.log(error);
}else if(response.statuscode==404){
    console.log("page not found");
}else{
    dataExtractor(html);
}
function dataExtractor(html){
    let searchTool=cheerio.load(html);
    let anchorrep=searchTool('a[data-hover="View All Results"]');
    let link=anchorrep.attr("href");
    let fullAllMatchPageLink=`https://www.espncricinfo.com${link}`;
    console.log(fullAllMatchPageLink);
    //go to all match page
    request(fullAllMatchPageLink,allMatchPageCb);

}
function allMatchPageCb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statuscode==404){
        console.log("page not found");
    }else{
       getAllScoreCardLink(html);
}
}
function getAllScoreCardLink(html){
    let searchTool=cheerio.load(html);
    let scorecardsArr=searchTool("a[data-hover='Scorecard']");
    for(let i=0;i<scorecardsArr.length;i++){
        let link=searchTool(scorecardsArr[i]).attr("href");
        let fullAllMatchPageLink=`https://www.espncricinfo.com${link}`;
        //console.log(fullAllMatchPageLink);
       scorecardObject.psm(fullAllMatchPageLink); 

    }
}
}
