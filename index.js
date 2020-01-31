var Crawler = require("crawler");
var fs = require("fs");

var link = [];
var nos = [];
var amountarr = [];
var company_name = [];
var gd = [];
var j = 0;
var c = new Crawler({
  rateLimit: 1000,
  maxConnections: 1,
  // This will be called for each crawled page
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
     
      const about = $(".salaryRow__SalaryRowStyle__row");
      const title = $("title");
      console.log(title.text());

      $(".salaryRow__SalaryRowStyle__row").each((i, el) => {
        const company = $(el)
          .find(".salaryRow__JobInfoStyle__employerName")
          .text();

        const count = $(el)
          .find(".salaryRow__JobInfoStyle__jobCount")
          .text()
          .replace("salaries", "")
          .trim();

        const amount = $(el)
          .find(".salaryRow__SalaryRowStyle__amt")
          .text();
        const company_link = $(el)
          .find(".salaryRow__JobInfoStyle__jobTitle")
          .children()
          .attr("href");

        amountarr.push(amount);
        company_name.push(company);
        nos.push(count);
        link[i] = company_link;
        b.queue({
          uri: `https://www.glassdoor.co.in${link[i]}`,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:60.0) Gecko/20100101 Firefox/60.0"
          }
        });

        
      });
    }
    done();
  }
});

for(var t=1;t<=1245;t++){
c.queue({
  uri:
    "https://www.glassdoor.co.in/Salaries/india-senior-software-engineer-salary-SRCH_IL.0,5_IN115_KO6,30_IP" + t + ".htm",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:60.0) Gecko/20100101 Firefox/60.0"
  }
});
}

var b = new Crawler({
  maxConnections: 1,
  callback: function(error, res, done) {
    j = j + 1;
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      const aap = $(".salaryDetails__DonutAndDataStyle__additionalPay")
        .find(".salaryDetails__SalaryWithRangeStyle__basePay  ")
        .text();
      const atp = $(".common__DonutTwoSegmentStyle__amt").text();
      const r1_count = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompRowStyle__count")
        .first()
        .text();
      const r2_count = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompRowStyle__count")
        .eq(1)
        .text();
      const r3_count = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompRowStyle__count")
        .eq(2)
        .text();
      const r4_count = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompRowStyle__count")
        .eq(3)
        .text();
      const r5_count = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompRowStyle__count")
        .eq(4)
        .text();
      const r1_avg = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".common__spacingHelpers__padRtLg")
        .eq(1)
        .text();
      const r2_avg = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".common__spacingHelpers__padRtLg")
        .eq(2)
        .text();
      const r3_avg = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".common__spacingHelpers__padRtLg")
        .eq(3)
        .text();
      const r4_avg = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".common__spacingHelpers__padRtLg")
        .eq(4)
        .text();
      const r5_avg = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".common__spacingHelpers__padRtLg")
        .eq(5)
        .text();
      const r1_type = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompTableStyle__column1")
        .eq(1)
        .text();
      const r2_type = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompTableStyle__column1")
        .eq(2)
        .text();
      const r3_type = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompTableStyle__column1")
        .eq(3)
        .text();
      const r4_type = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompTableStyle__column1")
        .eq(4)
        .text();
      const r5_type = $(
        ".salaryDetails__AdditionalCompTableStyle__additionalCompTable"
      )
        .find(".salaryDetails__AdditionalCompTableStyle__column1")
        .eq(5)
        .text();
      console.log('---------------------')  
      console.log(j)
      gd.push({
        CompanyName: company_name[j - 1],
        NumberofSalaries: nos[j - 1],
        AverageSalary: amountarr[j - 1],
        AverageAdditionalPay: aap,
        AverageTotalPay: atp,
        AdditionaalPay: {
          Row1: {
            Type: r1_type,
            Count: r1_count,
            Average: r1_avg
          },
          Row2: {
            Type: r2_type,
            Count: r2_count,
            Average: r2_avg
          },
          Row3: {
            Type: r3_type,
            Count: r3_count,
            Average: r3_avg
          },
          Row4: {
            Type: r4_type,
            Count: r4_count,
            Average: r4_avg
          },
          Row5: {
            Type: r5_type,
            Count: r5_count,
            Average: r5_avg
          }
        }

     
      });
      var jgd = JSON.stringify(gd);
      
    }
    
    done();
    fs.writeFile("myjsonfile.json", jgd, "utf8", err => {
      if (err) throw err;
      console.log("done");
    });
  }
});
