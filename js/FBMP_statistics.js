var sumStats;

getBasicStats();

function getBasicStats() {
const rawcountFetch = fetch("https://vtatlasoflife.org:4321/table/summary_statistics")
.then(function(response){ return response.json()});

//resolve the promise then print
Promise.resolve(rawcountFetch) // Waits for fetchPromise to get its value
.then(function (res){ 
sumStats = res.rows
console.log(sumStats)
}).then(() => {
var distinctObservers = sumStats[0].statStat;
var ncounts = sumStats[2].statStat;
var totalOrgsCounted = sumStats[3].statStat;
var countsSpp = sumStats[1].statStat;
var totalTime = sumStats[4].statStat;
var earlistTime = sumStats[5].statStat;
var latestStart = sumStats[6].statStat;
var highSppCount = sumStats[7].statStat;
var ndays = sumStats[8].statStat;

d3.select('#FBMP_stats_counts')
  .text(Number(ncounts).toLocaleString('en-US'))
  .style('font-weight','bold');

d3.select("#FBMP_stats_obs")
  .append("text") 
  .text(distinctObservers)
  .style('font-weight','bold')

d3.select("#FBMP_stats_totalHours")
  .append("text")
  .text(Math.round(totalTime).toLocaleString('en-US'))
  .style('font-weight','bold')

  d3.select("#FBMP_stats_days")
  .append("text")
  .text(ndays)
  .style('font-weight','bold')

d3.select("#FBMP_stats_birds")
  .append("text")
  .text(Number(totalOrgsCounted).toLocaleString('en-US'))
  .style('font-weight','bold')

  d3.select("#FBMP_stats_species")
  .append("text")
  .text(countsSpp)
  .style('font-weight','bold')
});
}