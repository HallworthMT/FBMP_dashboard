// This is a new file to show the years a site was surveyed 


//http://vtatlasoflife.org:4321/counts?countsTransect=CRAFTSBURYOU&distinct=countsYear

// HERE IS THE URL TO GET THE RESEARCHER
//http://vtatlasoflife.org:4321/counts?countsTransect=CRAFTSBURYOU&distinct=countsYear&distinct=countsResearcher

import {sel_site} from './Site_abundance.js'

function grabYrsResearcher() {
var site_researcher;
var site_yrsurveyed;

// UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
const fetchResearcher = fetch("https://vtatlasoflife.org:4321/counts?countsTransect="+sel_site+"&distinct=countsResearcher")
.then(function(response){ return response.json()});

//resolve the promise then print
Promise.resolve(fetchResearcher) // Waits for fetchPromise to get its value
.then(function (res){ 
site_researcher = res.rows
console.log(site_researcher)

var researchersFL = convertResearcherToFirstLast(site_researcher);

d3.select("#SiteResearchers")
  .text("These data would not be possible without the survey efforts by "+ researchersFL)
});

// UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
const fetchYrsSurv = fetch("https://vtatlasoflife.org:4321/counts?countsTransect="+sel_site+"&distinct=countsYear")
.then(function(response){ return response.json()});

//resolve the promise then print
Promise.resolve(fetchYrsSurv) // Waits for fetchPromise to get its value
.then(function (res){ 
site_yrsurveyed = res.rows
console.log(site_yrsurveyed)
}).then(function () {

    const yrSurvText = convertArrayToRangeText(site_yrsurveyed.map(d => d.countsYear));
  
    console.log(yrSurvText); // Output: "1-4,6,8"
    d3.select("#SiteSurveyYears").text(yrSurvText);
});

// FUNCTION TO CONVERT FROM [1989,1990,1991,1992,1995,.....,x]
// to text like 1989-1992,1995-x,y-z

function convertArrayToRangeText(arr) {
    let result = '';
    
    for (let i = 0; i < arr.length; i++) {
      let startRange = arr[i];
      let endRange = arr[i];
  
      // Check for consecutive elements
      while (arr[i + 1] - arr[i] === 1) {
        endRange = arr[i + 1];
        i++;
      }
  
      // Add the range to the result
      result += startRange === endRange ? startRange : `${startRange}-${endRange}`;
  
      // Add a comma if there are more ranges
      if (i < arr.length - 1) {
        result += ',';
      }
    }
  
    return result;
  }

  // FUNCTION TO CHANGES Researcher names from Last,First to First Last 
  function convertResearcherToFirstLast(arr){
  const names = arr.map(item => item.countsResearcher);

  // Split each name into first and last parts
  const formattedNames = names.map(name => {
    const [last, first] = name.split(', ');
    return `${first} ${last}`;
  });

  // Join the formatted names into a single string
  const result = formattedNames.join(', ');

  return result;
}
};

export{grabYrsResearcher}