var element_info = document.getElementById('relative_abundance_div');
var positionInfo = element_info.getBoundingClientRect();

  // Set up the SVG dimensions
  var t_width = positionInfo.width;
  var t_height = positionInfo.height;

  // Set up the margins
  var t_margin = { top: t_height*0.05,
                   bottom: t_height*0.1,
                   right: t_width*0.05,  
                   left: t_width*0.1 };
  
  // Calculate the inner dimensions of the plot
  var t_innerWidth = t_width - (t_margin.left + t_margin.right);
  var t_innerHeight = t_height - (t_margin.top + t_margin.bottom);

  var svg = d3.select("#" + 'RelativeAbundance_State')
  .append('svg')
  .attr('width', t_width)
  .attr('height', t_height);

var sel_species = "AMGO";
var spp_full = "American Goldfinch";                  
var speciesFBMP; 
var state_Trend = {
  "trendSpecies": "AMGO",
  "trendGuild": "PlantSeed",
  "trendTrend": -0.16065979447174913,
  "trendLCI": -0.24048188713677385,
  "trendUCI": -0.09117634071885836,
  "trendMedian": -0.15811626715443156,
  "trendStatSig": true,
  "trendPropInSupport": 1,
  "trendYears": "1989-2023"
};

var dropDown = d3.select("#Species_Select")

window.addEventListener("load", (ev) => {
  populationSppDrop()
});

function populationSppDrop(){
const fetchFBMPspp = fetch("https://vtatlasoflife.org:4321/table/FBMP_species")
.then(response => {return response.json()})

//resolve the promise then print
Promise.resolve(fetchFBMPspp)
.then(res => {speciesFBMP = res.rows;
    console.log(speciesFBMP)})
.then(()=>{

var sppOptions = dropDown.selectAll('option')
                              .data(speciesFBMP)
                              .enter()
                              .append('option')
                              .attr('value', d => d.sppSpecies)
                              .text(d => `${d.sppCommonName} (${d.sppScientificName})`);
        });
      }

var RelAbunEsts;



getStateTrends(sel_species);

         dropDown.on("change", function() {
                     sel_species = this.value;

                     var sppIdx = speciesFBMP.findIndex(x => x.sppSpecies == sel_species);
                     spp_full = speciesFBMP[sppIdx].sppCommonName
                     console.log(this.value);
                     console.log(spp_full);
                     getStateTrends();
                     });
 
    // apicall
function getStateTrends(SPPtoGet,commonname){    

// UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
const fetchSpecies = fetch("https://vtatlasoflife.org:4321/vtabun?vtrelSpecies="+SPPtoGet)
                     .then(function(response){ return response.json()})
                     .then(function (res){ 
                      RelAbunEsts  = res.rows
                      console.log(RelAbunEsts)
                    });
                     
const speciesTrend = fetch("https://vtatlasoflife.org:4321/trends?trendSpecies="+SPPtoGet)
                     .then(function(response){ return response.json()})
                     .then(function(res){
                      state_Trend = res.rows;
                      console.log(state_Trend)
                     });

Promise.all([fetchSpecies,speciesTrend])
       .then(() => {
  //var sppIndices = RAEsts
  //.map((e, i) => e.vtrelSpecies === sel_species ? i : -1)
  //.filter(index => index !== -1);

  //var RelAbunEsts = sppIndices.map(d => RAEsts[d])
  // console.log(RelAbunEsts)
 /* // Create the SVG container
 var svg = d3.select("#" + 'RelativeAbundance_State')
    .append('svg')
    .attr('width', t_width)
    .attr('height', t_height);
*/

  // Create scales for x and y axes
  var t_xScale = d3.scaleLinear()
    .domain([d3.min(RelAbunEsts.map(d => d.vtrelYear))-2, d3.max(RelAbunEsts.map(d => d.vtrelYear))+1]).nice()
    .range([t_margin.left, t_innerWidth])

    console.log(t_xScale(2020));
    console.log(t_xScale(1989))
    
  var t_yScale = d3.scaleLinear()
    .domain([d3.min(RelAbunEsts.map(d => d.vtrelLCI)), d3.max(RelAbunEsts.map(d => d.vtrelUCI))]).nice()
    //.domain([0,12])
    .range([t_innerHeight, t_margin.top]);

  /*svg.selectAll('text')
  .enter()
  .transition()
  .duration(1000)
  .style("opacity", 0)
  .transition().duration(500)
  .style("opacity", 1)
  .text(sel_species);
  */
 svg.selectAll("polygon").remove() 
 svg.selectAll("circle").remove()
 svg.selectAll("path").remove()
 svg.selectAll("text").remove()
 svg.selectAll("g").remove()

 var sppLabel = svg.append('text')
 .attr("y", t_margin.top)
 .attr("x", t_margin.left)
 .text(commonname)
 .style("font-weight","bold")
 .style("font-size","16pt")
 

 var stTrend = state_Trend.map(d => Math.round(d.trendTrend*1000)/1000)
 var stTrendLCI =  state_Trend.map(d => Math.round(d.trendLCI*1000)/1000)
 var stTrendUCI =  state_Trend.map(d => Math.round(d.trendUCI*1000)/1000)

 var trendLabel = svg.append('text')
 .attr("y", t_margin.top+20)
 .attr("x", t_margin.left)
 .attr("text-anchor","right")
 .text("Trend: "+stTrend+" ("+stTrendLCI+" : "+stTrendUCI+")")
 .style("font-weight","bold")
 .style("font-size","16pt")

  // Draw the confidence interval polygon
  svg.append('path')
     .datum(RelAbunEsts)
     .attr('fill','lightgray')
     .attr('stroke','none')
     .attr('d', d3.area()
         .x(function(d) { return t_xScale(d.vtrelYear)})
         .y0(function(d){ return t_yScale(d.vtrelLCI)})
         .y1(function(d){ return t_yScale(d.vtrelUCI)})
     )

  // Draw the line
  svg.append('path')
    .datum(RelAbunEsts)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr("d", d3.line()
              .x(function(d) { return t_xScale(d.vtrelYear) })
              .y(function(d) { return t_yScale(d.vtrelRelativeAbundance) })
              );

    // This allows to find the closest X index of the mouse:
            var bisect = d3.bisector(function(d) { return d.x; }).left;

            // Create the circle that travels along the curve of chart
            var focus = svg
              .append('g')
              .append('circle')
                .style("fill", "none")
                .attr("stroke", "black")
                .attr('r', 8.5)
                .style("opacity", 0)

            // Create the text that travels along the curve of chart
            var focusText = svg
              .append('g')
              .append('text')
                .style("opacity", 0)
                .style("font-size", "20px")
                .style("white-space","pre-line")
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle")

            var focusDrop = svg
                  .append('line')
                  .attr("x1", t_xScale(0))
                  .attr("x2", t_xScale(0))
                  .attr("y1", t_yScale(0))
                  .attr("y2", t_yScale(0))
                  .attr("stroke",'gray')
                  .style("opacity",0)

  // Draw the data points
  svg.selectAll('circle')
    .data(RelAbunEsts)
    .enter().append('circle')
    .attr('cx', d => t_xScale(d.vtrelYear))
    .attr('cy', d => t_yScale(d.vtrelRelativeAbundance))
    .attr('r', 4)
    .attr('fill', 'black')
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

// What happens when the mouse move -> show the annotations at the right positions.
function mouseover() {
    focus.style("opacity", 1)
    focusText.style("opacity",1).style("font-size","18px").style("white-space","pre-line")
    focusDrop.style("opacity",0.75)
  }

  var YearSurvey = RelAbunEsts.map(e => e.vtrelYear)

  function mousemove(event) {
    // recover coordinate we need
    var t_x0 = t_xScale.invert(d3.pointer(event)[0]);
    var i = d3.bisectRight(YearSurvey,t_x0);

    var selectedData = RelAbunEsts[i]

    focus
      .attr("cx", t_xScale(selectedData.vtrelYear))
      .attr("cy", t_yScale(selectedData.vtrelRelativeAbundance))
    focusText
      .html("Year: " + selectedData.vtrelYear + " Abundance: " + Math.round(selectedData.vtrelRelativeAbundance*10)/10)
      .style("font-size","18px")
      .attr("x", t_xScale(2000))
      .attr("y", t_yScale(d3.max(RelAbunEsts.map(d => d.vtrelUCI))*0.9))
    focusDrop
      .attr("x1", t_xScale(selectedData.vtrelYear))
      .attr("x2", t_xScale(selectedData.vtrelYear))
      .attr("y1", t_yScale(0))
      .attr("y2", t_yScale(selectedData.vtrelRelativeAbundance))

    }
  function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
    focusDrop.style("opacity",0)
  }
// add x axis label
svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "middle")
.attr("x", t_xScale(2005))
.attr("y", t_innerHeight + 40)
.text('Year');

  // Draw x-axis
  svg.append('g')
    .attr('transform', `translate(0, ${t_innerHeight})`)
    .call(d3.axisBottom(t_xScale).tickFormat(d3.format("d")));

  // Draw y-axis
  svg.append('g')
    .attr('transform', `translate(${t_margin.left-10})`)
    .call(d3.axisLeft(t_yScale));

    svg.append('g')
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .call(g => g.append("text")
           .attr("y", 10)
           .attr("x", 0 - (t_innerHeight / 2) - (t_margin.bottom + t_margin.top)  )  
            .style("font-size", "12pt")
            .style("height",24)
            .style("font-weight","bold")
            .attr("transform", "rotate(-90)")
            .style("z-index",10)
            .text('Relative Abundance'));
});  
}

export{getStateTrends}