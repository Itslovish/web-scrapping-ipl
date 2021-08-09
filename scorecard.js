let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
let path=require("path");
function processingSingleMatch(url){
    request(url,cb);
}
//let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
//request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else if(response.statuscode==404){
        console.log("page not found");
    }else{
        dataExtractor(html);
    }
    function dataExtractor(html){
        let folderPath="C:\\Users\\lovis\\OneDrive\\Desktop\\web dev\\module_2_web scrapping";
        folderPath=path.join(folderPath,"IPL");
        if(fs.existsSync(folderPath)==false){
            fs.mkdirSync(folderPath);
        }
        let searchTool=cheerio.load(html);
        let bothinnings=searchTool(".Collapsible");
        for(let i=0;i<bothinnings.length;i++){
            let teamNameElem=searchTool(bothinnings[i]).find("h5");
            let teamName=teamNameElem.text().trim();
          // console.log(teamName);
           teamName=teamName.split("INNINGS")[0];
           console.log(teamName);
           let batsmanTableBodyAllRows=searchTool(bothinnings[i]);
           console.log(batsmanTableBodyAllRows.length);
        //    for(let i=0;i<batsmanTableBodyAllRows.length;i++){
        //        let numberoftds=searchTool(batsmanTableBodyAllRows[i]);
        //        console.log(numberoftds.length);
           //}
           let bothTableAllRows=searchTool(bothinnings[i]).find(".table.batsman>tbody>tr");
           for(let j=0;j<bothTableAllRows.length;j++){
               let numberoftds=searchTool(bothTableAllRows[j]).find("td");
               if(numberoftds.length==8){
                   let playerName=searchTool(numberoftds[0]).text().trim();
                   console.log(playerName);

 let R=searchTool(numberoftds[2]).text().trim();
                   console.log(R);
                   let B=searchTool(numberoftds[3]).text().trim();
                   console.log(B);
                   let fours=searchTool(numberoftds[5]).text().trim();
                   console.log(fours);
                   let sixes=searchTool(numberoftds[6]).text().trim();
                   console.log(sixes);
                   let SR=searchTool(numberoftds[7]).text().trim();
                   console.log(SR);
                   matchobj={
                       "name":playerName,
                       "runs":R,
                       "bowls":B,
                       "fours":fours,
                       "sixes":sixes,
                       "sr":SR,

                   }
                   let matchArr=[matchobj]
                   let teamFolder=path.join(folderPath,teamName);
                   if(fs.existsSync(teamFolder)==false){
                       fs.mkdirSync(teamFolder);
                   }
                   let playerFile=path.join(teamFolder,playerName+".json");
                   if(fs.existsSync(playerFile)==false){
                    let jsonWriteAble=JSON.stringify(matchArr);
                    fs.writeFileSync(playerFile,jsonWriteAble);

                }else{
                    let content=fs.readFileSync(playerFile);
                    let jsonData=JSON.parse(content);
                    jsonData.push(matchArr);
                    let jsonWriteAble=JSON.stringify(jsonData);
                    fs.writeFileSync(playerFile,jsonWriteAble);
                }
                  
               }
           }
           console.log("...................");
 }

 }

   
 }
 module.exports={
     psm:processingSingleMatch
 }
