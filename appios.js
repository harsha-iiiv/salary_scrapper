var Crawler = require("crawler");
var fs = require("fs");
const { convertArrayToCSV } = require('convert-array-to-csv');
var data = []
var allurl = []
var count = 0
var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
           var selectedC = $("#selectedcontent")
           var count = 0
           $(selectedC).find("a").each((i, el) =>{

              
            //   console.log($(el).attr("href")) 

              allurl.push($(el).attr("href"))
           })
          
          
        //     var icon = $("a").eq(0).attr('src')
        //     var ss1 = $("img").eq(1).attr('src')
        //     var ss2 = $("img").eq(2).attr('src')
        //     var ss3 = $("img").eq(3).attr('src')
            
        //     var tit = $("h1").children()[0].prev.data
            
        //   data.push({
        //       AppName: tit.trim(),
        //       Icon: icon,
        //       Screenshot1: ss1,
        //       Screenshot2: ss2,
        //       Screenshot3: ss3
        //   })
        
          
        }
        // console.log(allurl)
       console.log("URL fteched")
       findappd()
        done();
    }
});



c.queue({
    uri:"https://apps.apple.com/us/genre/ios-health-fitness/id6013",
    headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:60.0) Gecko/20100101 Firefox/60.0"
      }
})




function findappd(){
var c = new Crawler({
    maxConnections : 1000,
   
    

    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
           
            var icon = $("img").eq(0).attr('src')
            var ss1 = $("img").eq(1).attr('src')
            var ss2 = $("img").eq(2).attr('src')
            var ss3 = $("img").eq(3).attr('src')
            var companclass = $(".information-list__item__definition--copyright").text()
            var comapnywebsite = $(".inline-list__item--margin-inline-end-large").eq(0).find("a").attr("href")
            var rating = $("figcaption").text()
            var tit = $("h1").contents()
            .filter(function() {
              return this.nodeType === 3; //Node.TEXT_NODE
            });
            tit = String(tit)
            
          data.push({
              AppName: tit.trim(),
              Icon: icon,
              Screenshot1: ss1,
              Screenshot2: ss2,
              Screenshot3: ss3,
              CompanyName: companclass,
              CompanyLInk: comapnywebsite,
              AppRating: rating
          })
         count = count + 1 
         console.log(count)
          
        }

        const csvFromArrayOfObjects = convertArrayToCSV(data);
        fs.writeFile("iosappdata.csv", csvFromArrayOfObjects, "utf8", err => {
            if (err) throw err;
            console.log("done");
          });
        done();
    }
});

const csvFromArrayOfObjects = convertArrayToCSV(data);
console.log(csvFromArrayOfObjects)

// Queue just one URL, with default callback

for(var i = 0; i<allurl.length; i++){
c.queue({
    uri:allurl[i],
    headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:60.0) Gecko/20100101 Firefox/60.0"
      }
})
}

}