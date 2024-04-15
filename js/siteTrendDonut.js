
import {sel_site} from "./Site_abundance.js";

    // Specify the chart’s dimensions.
    var ST_element_info = document.getElementById('TransTrend_doughnut');
    var ST_positionInfo = ST_element_info.getBoundingClientRect();
    
      // Set up the SVG dimensions
      var sdn_width = ST_positionInfo.width;
      var sdn_height = ST_positionInfo.height;
      
      console.log('width = ' + sdn_width)
    
    // Set up dimensions and radius
    const radius = Math.min(sdn_width,sdn_height) / 3;
    
    var legendRectSize = (radius * 0.05);
    var legendSpacing = radius * 0.02;
    
    // Create SVG container
    const svg = d3.select('#TransTrendCircle')
    .append('svg')
    .attr('width', sdn_width)
    .attr('height', sdn_height)
    .append('g')
    .attr('transform', `translate(${sdn_width/2},${sdn_height/2})`);
    
    // Define color scale
    //const color = d3.scaleOrdinal(d3.schemeCategory10);
    const color = ["#3b528b", // increase
    "#e45a31", // decrease
    "#5ec962"] // no trend

window.addEventListener("load", (ev) => {
    retrieveSiteTrends();
    });
    
    
    // apicall
    function retrieveSiteTrends(){    
    
      var trantrendSummary;
      // UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
      const fetchSiteTrends = fetch("https://vtatlasoflife.org:4321/table/transect_trends/?trantrendTransect="+sel_site)
                           .then(function(response){ return response.json()});
      
      //resolve the promise then print
      Promise.resolve(fetchSiteTrends) // Waits for fetchPromise to get its value
      .then(function (res){ 
        trantrendSummary = res.rows
        console.log(trantrendSummary)
      }).then(() => {
    
    // Find the species that are significantly increasing 
    var incr_trend_s = d3.sum(trantrendSummary.map((e, i) => e.trantrendTrend > 0 && e.trantrendStatSig == true)
                                 .map((val,i) => val === true ? 1 : 0));
    
    var incr_index_s = trantrendSummary.map((e,i) => e.trantrendTrend > 0 && e.trantrendStatSig == true)
                                 .map((val,i) => val === true ? i : 0)
                                 .filter(index => index !== 0)
    
    var incr_spp_s = incr_index_s.map(i => trantrendSummary[i].trantrendSpecies);
    
    var decr_trend_s = d3.sum(trantrendSummary.map((e, i) => e.trantrendTrend < 0 && e.trantrendStatSig == true)
                                        .map((val,i) => val === true ? 1 : 0));
    
    var decr_index_s = trantrendSummary.map((e, i) => e.trantrendTrend < 0 && e.trantrendStatSig == true)
                                        .map((val,i) => val === true ? i : 0)
                                        .filter(index => index !== 0);
    
    var decr_spp_s = decr_index_s.map(i => trantrendSummary[i].trantrendSpecies)
    
    var no_trend_s = d3.sum(trantrendSummary.map((e, i) => e.trantrendStatSig == false)
                                        .map((val,i) => val === true ? 1 : 0));
    
    var no_index_s = trantrendSummary.map((e, i) => e.trantrendStatSig == false)
                                        .map((val,i) => val === true ? i : 0)
                                        .filter(index => index !== 0);
    
    var notrend_spp_s = no_index_s.map(i => trantrendSummary[i].trantrendSpecies)
    
                    
    console.log(incr_trend_s + " species are increasing while " + decr_trend_s + " are significantly declining.")
    
    const birdData_s = [
        { trend: 'Increasing', percentage: incr_trend_s/trantrendSummary.length, num_species: incr_trend_s, species: incr_spp_s},
        { trend: 'Decreasing', percentage: decr_trend_s/trantrendSummary.length, num_species: decr_trend_s, species: decr_spp_s},
        { trend: 'No trend', percentage: no_trend_s/trantrendSummary.length, num_species: no_trend_s, species: notrend_spp_s}
        ];

    
svg.selectAll("g").remove()

// Create pie chart
const pie = d3.pie().value(d => d.percentage);
const data_ready = pie(birdData_s);

console.log(data_ready)

// The arc generator
var arc = d3.arc()
.innerRadius(radius * 0.7)         // This is the size of the donut hole
.outerRadius(radius)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
.innerRadius(radius * 0.5)
.outerRadius(radius )

// labels of species
var xLocPos = [-75,70,-65]
var yLocPos = [-100,-100,50]
var textBoxWidth = [75,75,75]
var yHeadLoc = [-120,-120,40]

// Add one dot in the legend for each name.
/*svg.selectAll("spp_labels")
.data(data_ready)  
.enter() 
.append("foreignObject")
.attr("x", (d,i) => xLocPos[i])
.attr("y", (d,i) => yLocPos[i])
.attr("width", (d,i) => textBoxWidth[i])
.attr("height", 200)
.text(function(d) {
var textToShow = d.data.num_species + " species"
return textToShow
})
.style("font-size","12pt")
.style("font-align","center")
.style("color","black");

// Add one dot in the legend for each name.
svg.selectAll("trendSppHeader")
.data(data_ready)  
.enter() 
.append("text")
.attr("x", (d,i) => xLocPos[i])
.attr("y", (d,i) => yHeadLoc[i])
.attr("text-anchor","right")
.style("font-size","14pt")
.style("font-weight","bold")
.style("text-align","center")
.style("text-decoration", "underline")
.text(function(d) {return d.data.trend});
*/

var arcs = svg.selectAll("g")
.data(data_ready)
.enter()
.append("g")
.attr("class", "slice");

// Increase, decrease, no trend thats the order
var ta = ["right","left","right"]

svg.selectAll('path').remove()

// Build the doughnut chart
arcs.selectAll('path')
.data(data_ready)
.enter()
.append('path')
.attr('d', d3.arc()
.innerRadius(radius * 0.7)
.outerRadius(radius)
)
.attr('fill', (d, i) => color[i])
.attr('stroke', 'white')
.style('opacity', 0.5)
.style('stroke-width', '2px')
.on('mouseover', handleMouseOver)
.on('mouseout', handleMouseOut)
.each(function (d) {
this._current = d;
}); // Save the current data for future transitions

/*
// Here we label the arcs 
arcs.append("text")
.attr("transform", function(d,i){
d.innerRadius = radius * 0.7;
d.outerRadius = radius;
console.log(arc.centroid(d))
return "translate(" + (arc.centroid(d)[0]+xLocPos[i]) + (arc.centroid(d)[1]) + ")";
//return "translate(" + arc.centroid(d) + ")";
})
.attr("text-anchor", "middle")
.html( function(d, i) {
return `${data_ready[i].data.trend}`
}
)
.style("font-weight", "bold")
.style("font-size", "14pt");
*/

svg.selectAll('text').remove(); 

var legend = svg.selectAll('.legend')
.data(data_ready)
.enter()
.append('g')
.attr('class', 'legend')
.attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.length / 2;
    var horz = -3 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
});

legend.append('rect')
.attr('width', legendRectSize)
.attr('height', legendRectSize)
.style('fill', (d, i) => color[i])
.style('stroke', (d, i) => color[i]);

legend.append('text')
.attr('x', legendRectSize + legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.text(function(d) { return d.data.trend });


var innerCircle = svg.append("text")
.attr('x',0)
.attr('y',-30)
.attr('height',20)
.attr("text-anchor","middle")
.style('font-weight','bold')
.style('font-size',"14pt")

innerCircle.html(`${sel_site}`)

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
tooltip.html(`<b>${species} species (${Math.round((percentage*10000)/100)}%)</b>`)
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

    export{retrieveSiteTrends}