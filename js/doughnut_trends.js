import { apiUrl } from './config.js';

window.addEventListener("load", (ev) => {
retrieveTrends();
});


// apicall
function retrieveTrends(){    

  var trendSummary;
  // UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
  const fetchTrends = fetch(`${apiUrl}/trends`)
                       .then(function(response){ return response.json()});
  
  //resolve the promise then print
  Promise.resolve(fetchTrends) // Waits for fetchPromise to get its value
  .then(function (res){ 
    trendSummary = res.rows
    console.log(trendSummary)
  }).then(() => {

// Find the species that are significantly increasing 
var incr_trend = d3.sum(trendSummary.map((e, i) => e.trendTrend > 0 && e.trendStatSig == true)
                             .map((val,i) => val === true ? 1 : 0));

var incr_index = trendSummary.map((e,i) => e.trendTrend > 0 && e.trendStatSig == true)
                             .map((val,i) => val === true ? i : 0)
                             .filter(index => index !== 0)

var incr_spp = incr_index.map(i => trendSummary[i].trendSpecies);

var decr_trend = d3.sum(trendSummary.map((e, i) => e.trendTrend < 0 && e.trendStatSig == true)
                                    .map((val,i) => val === true ? 1 : 0));

var decr_index = trendSummary.map((e, i) => e.trendTrend < 0 && e.trendStatSig == true)
                                    .map((val,i) => val === true ? i : 0)
                                    .filter(index => index !== 0);

var decr_spp = decr_index.map(i => trendSummary[i].trendSpecies)

var no_trend = d3.sum(trendSummary.map((e, i) => e.trendStatSig == false)
                                    .map((val,i) => val === true ? 1 : 0));

var no_index = trendSummary.map((e, i) => e.trendStatSig == false)
                                    .map((val,i) => val === true ? i : 0)
                                    .filter(index => index !== 0);

var notrend_spp = no_index.map(i => trendSummary[i].trendSpecies)

                
console.log(incr_trend + "species are increasing while " + decr_trend + " are significantly declining.")

const birdData = [
    { trend: 'Increasing', percentage: incr_trend/trendSummary.length, num_species: incr_trend, species: incr_spp},
    { trend: 'Decreasing', percentage: decr_trend/trendSummary.length, num_species: decr_trend, species: decr_spp},
    { trend: 'No trend', percentage: no_trend/trendSummary.length, num_species: no_trend, species: notrend_spp}
    ];

// Specify the chart’s dimensions.
var TD_element_info = document.getElementById('Trend_doughnut');
var TD_positionInfo = TD_element_info.getBoundingClientRect();

  // Set up the SVG dimensions
  var dn_width = TD_positionInfo.width;
  var dn_height = TD_positionInfo.height;
  
  console.log('width = ' + dn_width)

// Set up dimensions and radius
const radius = Math.min(dn_width, dn_height) / 6;

// Create SVG container
const svg = d3.select('#TrendCircle')
.append('svg')
.attr('width', dn_width)
.attr('height', dn_height)
.append('g')
.attr('transform', `translate(${dn_width/2},${dn_height/2})`);

// Define color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create pie chart
const pie = d3.pie().value(d => d.percentage);
const data_ready = pie(birdData);

console.log(data_ready)

// The arc generator
var arc = d3.arc()
  .innerRadius(radius * 0.85)         // This is the size of the donut hole
  .outerRadius(radius)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
  .innerRadius(radius * 0.9)
  .outerRadius(radius )

// labels of species
var xLocPos = [-200,100,60]
var yLocPos = [-200,-200,100]
var textBoxWidth = [100,100,250]

var yHeadLoc = [-220,-220,80]

// Add one dot in the legend for each name.
svg.selectAll("spp_labels")
 .data(data_ready)  
 .enter() 
 .append("foreignObject")
 .attr("x", (d,i) => xLocPos[i])
 .attr("y", (d,i) => yLocPos[i])
 .attr("width", (d,i) => textBoxWidth[i])
 .attr("height", 200)
 .text(function(d) {
     var textToShow = d.data.species.toString()
     var textToShow = textToShow.replace(/,/g,"\n")
   return textToShow
 })
 .style("font-size","9pt")
 .style("color",(d,i) => color(i));

// Add one dot in the legend for each name.
svg.selectAll("trendSppHeader")
.data(data_ready)  
.enter() 
.append("text")
.attr("x", (d,i) => xLocPos[i])
.attr("y", (d,i) => yHeadLoc[i])
.attr("text-anchor","right")
.style("font-size","12pt")
.style("font-weight","bold")
.style("text-align","center")
.text(function(d) {return d.data.trend});

// Build the doughnut chart
svg.selectAll('path')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(radius * 0.85)
    .outerRadius(radius)
  )
  .attr('fill', (d, i) => color(i))
  .attr('stroke', 'white')
  .style('opacity', 0.5)
  .style('stroke-width', '2px')
  .on('mouseover', handleMouseOver)
  .on('mouseout', handleMouseOut)
  .each(function (d) {
    this._current = d;
  }); // Save the current data for future transitions

// Add a tooltip
const tooltip = d3.select('body').append('div')
.attr('class', 'tooltip')
.style('opacity', 0);



// Function to handle mouseover event
function handleMouseOver(event, d) {
  const percentage = d.data.percentage;
  const species = d.data.num_species;
  const trendCat = d.data.trend;

  tooltip.transition()
    .duration(200)
    .style('opacity', .9);
  tooltip.html(`<b>${trendCat}</b><br># of species: ${species}<br>${Math.round((percentage*10000)/100)}%`)
    .style('left', `${event.pageX}px`)
    .style('top', `${event.pageY - 28}px`);
}
// Function to handle mouseout event
function handleMouseOut() {
tooltip.transition()
  .duration(500)
  .style('opacity', 0);
}

  })
}