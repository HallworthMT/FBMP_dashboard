
let trendSummary

// Set up the SVG dimensions

var ordTrendElement_info = document.getElementById('orderedTrends_div');
var ordTrend_positionInfo = ordTrendElement_info.getBoundingClientRect();

// Set up the SVG dimensions
var td_width = ordTrend_positionInfo.width;
var td_height = ordTrend_positionInfo.height;

// Set up the margins
var td_margin = { top: td_height*0.05,
               bottom: td_height*0.05,
               right: td_width*0.05,  
               left: td_width*0.05 };

// Calculate the inner dimensions of the plot
var td_innerWidth = td_width - (td_margin.left + td_margin.right);
var td_innerHeight = td_height - (td_margin.top + td_margin.bottom);

// apicall
const fetchPromise = fetch("http://vtatlasoflife.org:4321/trends")
                     .then(function(response){ return response.json()});

//resolve the promise then print
Promise.resolve(fetchPromise) // Waits for fetchPromise to get its value
.then(function (res){
             trendSummary = res.rows;
             /*
             trendSummary.trendSpecies = res.rows.map(d => d.trendSpecies);
             trendSummary.trendGuild = res.rows.map(d => d.trendGuild);
             trendSummary.trendTrend = res.rows.map(d => d.trendTrend);
             trendSummary.trendLCI = res.rows.map(d => d.trendLCI);
             trendSummary.trendUCI = res.rows.map(d => d.trendUCI);
             trendSummary.trendMedian = res.rows.map(d => d.trendMedian);
             trendSummary.trendStatSig = res.rows.map(d => d.trendStatSig);
             trendSummary.trendPropInSupport = res.rows.map(d => d.trendPropInSupport);
             trendSummary.trendYears = res.rows.map(d => d.trendYears)
            */
            })
.then(() => {

var trendEst = trendSummary.map(a => a.trendTrend);
var trendSpp = trendSummary.map(a => a.trendSpecies);

/*
console.log(trendSummary[0]);
console.log(trendEst); 
console.log(trendSpp);
console.log('We got here bro');
*/

// Create the SVG container
var svg = d3.select("#orderedTrends")
  .append("svg")
  .attr("width", td_width)
  .attr("height", td_height)
  .append("g")
  .attr("transform", "translate(" + td_margin.left + "," + td_margin.top + ")");

  console.log(d3.range(trendSummary.length))
// Set up the scales
var xScale = d3.scaleBand()
  .domain(d3.range(trendSummary.length))
  .range([td_margin.left, td_innerWidth]);

var yScale = d3.scaleLinear()
  .domain([d3.min(trendSummary.map(d => d.trendLCI)), d3.max(trendSummary.map(d => d.trendUCI))])
  .range([td_innerHeight, td_margin.top]);


// Plot the segments
svg.selectAll("line")
  .data(trendSummary)
  .enter().append("line")
  .attr("x1", (d, i) => xScale(i))
  .attr("x2", (d, i) => xScale(i))
  .attr("y1", d => yScale(d.trendLCI))
  .attr("y2", d => yScale(d.trendUCI))
  .attr("stroke", "gray");  

  var focusText = svg
  .append('g')
  .append('text')
    .style("opacity", 0)
    .style("font-size", "20px")
    .style("white-space","pre-line")
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")

  // Plot the points
svg.selectAll("circle")
.data(trendSummary)
.enter().append("circle")
.attr("cx", (d, i) => xScale(i))
.attr("cy", d => yScale(d.trendTrend))
.attr("r", 4.5)
.attr("fill", d => d.trendTrend < 0 ? "red" : "blue")
.attr("opacity", d => d.trendStatSig ? "1" : "0.5")
.attr("stroke", d => d.trendStatSig ? "black" : "gray")
.on('mouseover', function (d,i){
        d3.select(this).transition()
          .duration('200')
          .attr("r", 7.5);
})
.on('mouseout', function (d, i) {
          d3.select(this).transition()
             .duration('200')
             .attr("r", 4.5);})
.on('click', clickon);

// What happens when the mouse move -> show the annotations at the right positions.
// Add a tooltip
 
// Function to handle mouseover event
function handleMouseOver(event, d) {
  const species = d.trendSpecies;
  const trend_est = d.trendTrend;

  tooltip.transition()
    .duration(200)
    .style('opacity', .9);
  tooltip.html(`${species}</b><br>Trend: ${Math.round((trend_est*10000)/100)}`)
    .style('left', `${event.pageX}px`)
    .style('top', `${event.pageY - 28}px`);
}
// Function to handle mouseout event
function handleMouseOut() {
tooltip.transition()
  .duration(500)
  .style('opacity', 0);
}

function clickon() {
  // recover coordinate we need
  var sppSelect = d3.select(this).data()[0].trendSpecies;
  console.log("Congratulations! You've selected: " + sppSelect);
  }
 
// Draw the horizontal dashed line
svg.append("line")
  .attr("x1", xScale(0))
  .attr("x2", td_innerWidth)
  .attr("y1", yScale(0))
  .attr("y2", yScale(0))
  .attr("stroke", "gray")
  .attr("stroke-dasharray", "4");

// Draw y-axis
svg.append('g')
    .attr('transform', `translate(${td_margin.left-10})`)
    .call(d3.axisLeft(yScale));

svg.append("text")
        .attr("class", "y label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - (td_margin.left/2))
        .attr("x",0 - (td_innerHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Trend");
});

/*var imgs = svg
            .append("svg:image")
            .attr("xlink:href", "https://vtecostudies.org/wp-content/uploads/2014/08/eastern-wood-pewee.jpg")
                .attr("x", width - 200)
                .attr("y", 200)
                .attr("width", "200")
                .attr("height", "425");*/