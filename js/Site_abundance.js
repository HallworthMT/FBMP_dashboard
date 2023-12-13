/* This script takes the site data and shows a plot of all the species */
/*
var SA_element_info = document.getElementById('site_abundance_div');
var SA_positionInfo = SA_element_info.getBoundingClientRect();

  // Set up the SVG dimensions
  var width = SA_positionInfo.width;
  var height = SA_positionInfo.height;
  
  console.log('width = ' + width)

  // Set up the margins
  var margin = { top: height*0.05,
                   bottom: height*0.1,
                   right: width*0.05,  
                   left: width*0.15 };
  
  // Calculate the inner dimensions of the plot
  var sa_innerWidth = width - margin.left - margin.right;
  var sa_innerHeight = height - margin.top - margin.bottom;

  // Create the SVG container
 var svg = d3.select("#" + 'Site_Relative_Abundance')
 .append('svg')
 .attr('width', width)
 .attr('height', height);

// Create scales for x and y axes
var xScale = d3.scaleLinear()
 .domain([d3.min(site_data.map(d => d.year))-1, d3.max(site_data.map(d => d.year))+1])
 .range([margin.left, sa_innerWidth])

 console.log(xScale(2020));
 console.log("max UCI: " + d3.max(site_data.map(d => d.UCI)));

var yScale = d3.scaleLinear()
 .domain([d3.min(site_data.map(d => d.LCI)), d3.max(site_data.map(d => d.UCI))])
 .range([sa_innerHeight, margin.top]);

 var uniqueSpp = [...new Set(site_data.map(data => data.species))];
 console.log(uniqueSpp);

 // add x axis label
svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "middle")
.attr("x", xScale(2005))
.attr("y", sa_innerHeight + 50)
.text('Year');

svg.append("text")
.attr("class", "y label")
.attr("text-anchor", "middle")
// this is a little weird because it's rotated 90 degrees
// the x here is actually where on the y axis that I want it
// The y axis here is actually where I want it on the x axis
.attr("y", xScale(1989)-(margin.left/2))
.attr("x", 0-((margin.right+margin.left)))
.attr("transform", "rotate(-90)")
.text('Relative Abundance');

  // Draw x-axis
  svg.append('g')
    .attr('transform', `translate(0, ${sa_innerHeight})`)
    .call(d3.axisBottom(xScale));

  // Draw y-axis
  svg.append('g')
    .attr('transform', `translate(${margin.left})`)
    .call(d3.axisLeft(yScale));

// This function adds a new line to a figure for unique species at a plot 
function plotSpp(SPP){
var sppIndices = site_data
    .map((e, i) => e.species === SPP ? i : -1)
    .filter(index => index !== -1);
// var RA_spp = sppIndices.map(i => site_data[i].RelativeAbundance)
// var RA_year = sppIndices.map(i => site_data[i].year)
  // Draw the line
  svg.append('path')
    // this gets just the data that I want for each species 
    // i.e., filters the array
    .datum(sppIndices.map(i => site_data[i]))
    .attr('fill', 'none')
    .attr('stroke', 'gray')
    .attr('stroke-width', 1)
    .attr('class','gray_lines')
    .attr("d", d3.line()
              .x(function(d){ return xScale(d.year) })
              .y(function(d){ return yScale(d.RelativeAbundance) })
              )
}

// This executes the function to put the lines on a figure 
uniqueSpp.map(i => plotSpp(i))
*/
// https://observablehq.com/@d3/multi-line-chart/2?intent=fork 

import { grabYrsResearcher } from "/js/yearSurveyed.js";


/*
//MIKE NEED TO ADD THE YEARS A SITE WAS SURVEYED 
http://vtatlasoflife.org:4321/counts?countsTransect=CRAFTSBURYOU&distinct=countsYear

// HERE IS THE URL TO GET THE RESEARCHER               
http://vtatlasoflife.org:4321/counts?countsTransect=CRAFTSBURYOU&distinct=countsResearcher

*/

// Specify the chart’s dimensions.
var SA_element_info = document.getElementById('site_abundance_div');
var SA_positionInfo = SA_element_info.getBoundingClientRect();

  // Set up the SVG dimensions
  var sa_width = SA_positionInfo.width;
  var sa_height = SA_positionInfo.height;
  
  console.log('width = ' + sa_width)

  // Set up the margins
  var sa_margin = { top: sa_height*0.05,
                   bottom: sa_height*0.1,
                   right: sa_width*0.05,  
                   left: sa_width*0.10 };
  
  // Calculate the inner dimensions of the plot
  var sa_innerWidth = sa_width - (sa_margin.left + sa_margin.right);
  var sa_innerHeight = sa_height - (sa_margin.top + sa_margin.bottom);

var marginTop = sa_margin.top;
var marginRight = sa_margin.right;
var marginBottom = sa_margin.bottom;
var marginLeft = sa_margin.left;

var voronoi = false;

// Create the SVG container.
var svg = d3
    .select("#"+"Site_Relative_Abundance")
    .append('svg')
    .attr("width", sa_width)
    .attr("height", sa_height)
    .attr("viewBox", [0, 0, sa_width, sa_height])
    .attr("style", "max-width: 100%; height: auto; overflow: visible; font: 12px sans-serif;");

var sel_site = 1001;

let site_data

export{sel_site}
 
getSiteAbundance({site: sel_site});
grabYrsResearcher()

const fetchSites = fetch("http://vtatlasoflife.org:4321/table/survey_sites")
.then(response => {return response.json()})
.then(res => site_data = res.rows)
.then(()=>{
var siteDropDown = d3.select("#SelectSite")

var siteOptions = siteDropDown.selectAll('option')
                              .data(site_data)
                              .enter()
                              .append('option')
                              .attr('value', d => d.sitesName)
                              .text(d => `${d.sitesTransect} - ${d.sitesName} (${d.sitesNotes})`);
                            
    siteDropDown.on("change", function() {
                     sel_site = this.value
                     console.log(this.value);
                     getSiteAbundance();
                     grabYrsResearcher();
                    });
              });

// apicall
function getSiteAbundance(){    

  // UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
  const fetchSpecies = fetch("http://vtatlasoflife.org:4321/relabun?relabunSite="+sel_site)
                       .then(function(response){ return response.json()});
  
  //resolve the promise then print
  Promise.resolve(fetchSpecies) // Waits for fetchPromise to get its value
  .then(function (res){ 
    site_data = res.rows.sort(d => d.relabunYear)
    console.log(site_data)
  }).then(() => {

// Create the positional scales.
var x = d3.scaleLinear()
  .domain(d3.extent(site_data, d => d.relabunYear)).nice()
  .range([marginLeft, sa_width - marginRight]);

var y = d3.scaleLinear()
  //.domain([0, d3.max(site_data, d => d.relabunRelativeAbundance)]).nice()
  .domain([0,12]).nice()
  .range([sa_height - marginBottom, marginTop]);


// Add the horizontal axis.
svg.append("g")
    .attr("transform", `translate(0,${sa_height - marginBottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(sa_width / 80).tickSizeOuter(0));

// Add the vertical axis.
svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(voronoi ? () => {} : g => g.selectAll(".tick line").clone()
        .attr("x2", sa_width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
       .attr("y", 0 - (sa_margin.left/2))
       .attr("x", 0 - (sa_innerHeight / 2) - (marginBottom + marginTop)  )  
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .style("font-size", "12pt")
        .style("font-weight","bold")
        .text("Relative Abundance")
        .attr("transform", "rotate(-90)"));


// Compute the points in pixel space as [x, y, z], where z is the name of the series.
var points = site_data.map((d) => [x(d.relabunYear), y(d.relabunRelativeAbundance), d.relabunSpecies]);

var points = points.sort(d3.ascending)

console.log(points);

// An optional Voronoi display (for fun).
if (voronoi) svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("d", d3.Delaunay
      .from(points)
      .voronoi([0, 0, sa_width, sa_height])
      .render());

// Group the points by series.
var groups = d3.rollup(points, v => Object.assign(v, {z: v[0][2]}), d => d[2]);

svg.selectAll('lines').remove()
svg.selectAll('path').remove()
//svg.selectAll('g').remove()

// Draw the lines.
var line = d3.line();
var path = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-width", 1)
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
  .selectAll("path")
  .data(groups.values())
  .join("path")
    .style("mix-blend-mode", "multiply")
    .attr("d", line);

// Add an invisible layer for the interactive tip.
var dot = svg.append("g")
    .attr("display", "none");

dot.append("circle")
    .attr("r", 0);

dot.append("text")
    .attr("text-anchor", "middle")
    .attr("y", -8);

svg
    .on("pointerenter", pointerentered)
    .on("pointermove", pointermoved)
    .on("pointerleave", pointerleft)
    .on("touchstart", event => event.preventDefault());

let speciesIndex;

// When the pointer moves, find the closest point, update the interactive tip, and highlight
// the corresponding line. Note: we don't actually use Voronoi here, since an exhaustive search
// is fast enough.
function pointermoved(event) {
  var [xm, ym] = d3.pointer(event);
  var i = d3.leastIndex(points, ([x, y]) => Math.hypot(x - xm, y - ym));
  var [x, y, k] = points[i];
  
  path.style("stroke", ({z}) => z === k ? null : "#ddd")
      .style("stroke-width",({z}) => z === k ? 4 : 1)
      .filter(({z}) => z === k).raise();
  dot.attr("transform", `translate(${sa_width},${y})`)
      .select("text")
      .text(k)
      .style("font-size",20)
      .style("font-weight","bold")
      .style("r",0);
  svg.property("value", site_data[i]).dispatch("input", {bubbles: true});
}

function pointerentered() {
  path.style("mix-blend-mode", null)
      .style("stroke", "#ddd")
      .style("stroke-width",1)
  dot.attr("display", null);
}

function pointerleft() {
  path.style("mix-blend-mode", "multiply")
      .style("stroke", null)
      .style("stroke-width",1);
  dot.attr("display", "none");
  svg.node().value = null;
  svg.dispatch("input", {bubbles: true});
}

  })
}