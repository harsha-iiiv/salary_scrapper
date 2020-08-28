var Crawler = require("crawler");
var fs = require("fs");
const { convertArrayToCSV } = require('convert-array-to-csv');
var data = []
var allurl = [

    "https://apps.apple.com/gb/app/fitness-coach/id1472638797?l=ru",
    
    "https://apps.apple.com/us/app/alltrails-hike-bike-run/id405075943",
    "https://apps.apple.com/us/app/betterme-home-workout-diet/id1264546236",
    
    
    "https://apps.apple.com/us/app/fitbit-health-fitness/id462638897",
    
    "https://apps.apple.com/us/app/7-minute-workout-challenge/id680170305",
    
    
    "https://apps.apple.com/us/app/headspace-meditation-sleep/id493145008",
    
    
    "https://apps.apple.com/us/app/8fit-workouts-meal-planner/id866617777",
    
    "https://apps.apple.com/us/app/fiton-workouts-fitness-plans/id1442473191",
    
    "https://apps.apple.com/us/app/j-j-official-7-minute-workout/id784797900",
    
    "https://apps.apple.com/us/app/keelo-strength-hiit-workouts/id1004824537",
    
    
    "https://apps.apple.com/us/app/nike-training-club/id301521403",
    ]
var c = new Crawler({
    maxConnections : 10,
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
            
            var tit = $("h1").children()[0].prev.data
            
          data.push({
              AppName: tit.trim(),
              Icon: icon,
              Screenshot1: ss1,
              Screenshot2: ss2,
              Screenshot3: ss3
          })
        
          
        }
        // console.log(data)
        const csvFromArrayOfObjects = convertArrayToCSV(data);
        fs.writeFile("appdata.csv", csvFromArrayOfObjects, "utf8", err => {
            if (err) throw err;
            console.log("done");
          });
        done();
    }
});

const csvFromArrayOfObjects = convertArrayToCSV(data);
console.log(csvFromArrayOfObjects)

// Queue just one URL, with default callback

for(var i = 0; i<11; i++){
c.queue({
    uri:allurl[i],
    headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:60.0) Gecko/20100101 Firefox/60.0"
      }
})
}


// initialize {
//     '0': {
//       type: 'tag',
//       name: 'span',
//       attribs: { class: 'badge badge--product-title' },
//       children: [ [Object] ],
//       next: {
//         data: '\n      ',
//         type: 'text',
//         next: null,
//         prev: [Circular],
//         parent: [Object]
//       },
//       prev: {
//         data: '\n        Fitness Coach\n          ',
//         type: 'text',
//         next: [Circular],
//         prev: null,
//         parent: [Object]
//       },
//       parent: {
//         type: 'tag',
//         name: 'h1',
//         attribs: [Object],
//         children: [Array],
//         next: [Object],
//         prev: [Object],
//         parent: [Object]
//       }
//     },
//     options: {
//       normalizeWhitespace: false,
//       xmlMode: false,
//       decodeEntities: true,
//       withDomLvl1: true
//     },
//     _root: initialize {
//       '0': {
//         type: 'root',
//         name: 'root',
//         attribs: {},
//         children: [Array],
//         next: null,
//         prev: null,
//         parent: null
//       },
//       options: {
//         normalizeWhitespace: false,
//         xmlMode: false,
//         decodeEntities: true,
//         withDomLvl1: true
//       },
//       length: 1,
//       _root: [Circular]
//     },
//     length: 1,
//     prevObject: initialize {
//       '0': {
//         type: 'tag',
//         name: 'h1',
//         attribs: [Object],
//         children: [Array],
//         next: [Object],
//         prev: [Object],
//         parent: [Object]
//       },
//       options: {
//         normalizeWhitespace: false,
//         xmlMode: false,
//         decodeEntities: true,
//         withDomLvl1: true
//       },
//       _root: initialize {
//         '0': [Object],
//         options: [Object],
//         _root: [Circular]
//       },
//       length: 1,
//       prevObject: initialize {
//         '0': [Object],
//         options: [Object],
//         length: 1,
//         _root: [Circular]
//       }
//     }
//   }
