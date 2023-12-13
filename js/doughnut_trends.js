

// Sample data (replace this with your actual data)
/*
var trendSummary = [{"trendSpecies":"AMGO","trendGuild":"PlantSeed","trendTrend":-0.1334,"trendLCI":-0.2809,"trendUCI":-0.0026,"trendMedian":-0.1235,"trendStatSig":true,"trendPropInSupport":0.9767,"trendYears":"1989-2023"},{"trendSpecies":"AMRE","trendGuild":"Invertebrate","trendTrend":0.0362,"trendLCI":-0.0179,"trendUCI":0.092,"trendMedian":0.0344,"trendStatSig":false,"trendPropInSupport":0.8867,"trendYears":"1989-2023"},{"trendSpecies":"AMRO","trendGuild":"Omnivore","trendTrend":0.0427,"trendLCI":0.0044,"trendUCI":0.0821,"trendMedian":0.0417,"trendStatSig":true,"trendPropInSupport":0.99,"trendYears":"1989-2023"},{"trendSpecies":"BAOR","trendGuild":"Invertebrate","trendTrend":-0.0701,"trendLCI":-0.2111,"trendUCI":0.0981,"trendMedian":-0.0674,"trendStatSig":false,"trendPropInSupport":0.8367,"trendYears":"1989-2023"},{"trendSpecies":"BAWW","trendGuild":"Invertebrate","trendTrend":-0.0131,"trendLCI":-0.0655,"trendUCI":0.0427,"trendMedian":-0.0132,"trendStatSig":false,"trendPropInSupport":0.68,"trendYears":"1989-2023"},{"trendSpecies":"BCCH","trendGuild":"Invertebrate","trendTrend":0.0431,"trendLCI":-0.0049,"trendUCI":0.085,"trendMedian":0.0448,"trendStatSig":false,"trendPropInSupport":0.9567,"trendYears":"1989-2023"},{"trendSpecies":"BHCO","trendGuild":"PlantSeed","trendTrend":-0.034,"trendLCI":-0.2055,"trendUCI":0.1281,"trendMedian":-0.0314,"trendStatSig":false,"trendPropInSupport":0.6433,"trendYears":"1989-2023"},{"trendSpecies":"BHVI","trendGuild":"Invertebrate","trendTrend":0.0034,"trendLCI":-0.0504,"trendUCI":0.0534,"trendMedian":0.0051,"trendStatSig":false,"trendPropInSupport":0.55,"trendYears":"1989-2023"},{"trendSpecies":"BLBW","trendGuild":"Invertebrate","trendTrend":-0.0341,"trendLCI":-0.1182,"trendUCI":0.0287,"trendMedian":-0.0282,"trendStatSig":false,"trendPropInSupport":0.8267,"trendYears":"1989-2023"},{"trendSpecies":"BLJA","trendGuild":"Omnivore","trendTrend":0.0488,"trendLCI":0.0118,"trendUCI":0.0853,"trendMedian":0.0472,"trendStatSig":true,"trendPropInSupport":1,"trendYears":"1989-2023"},{"trendSpecies":"BRCR","trendGuild":"Invertebrate","trendTrend":0.0153,"trendLCI":-0.0457,"trendUCI":0.0658,"trendMedian":0.0155,"trendStatSig":false,"trendPropInSupport":0.69,"trendYears":"1989-2023"},{"trendSpecies":"BTBW","trendGuild":"Invertebrate","trendTrend":0.0409,"trendLCI":-0.0082,"trendUCI":0.0907,"trendMedian":0.0406,"trendStatSig":false,"trendPropInSupport":0.9533,"trendYears":"1989-2023"},{"trendSpecies":"BTNW","trendGuild":"Invertebrate","trendTrend":0.0418,"trendLCI":0.0049,"trendUCI":0.0746,"trendMedian":0.0428,"trendStatSig":true,"trendPropInSupport":0.9867,"trendYears":"1989-2023"},{"trendSpecies":"CAWA","trendGuild":"Invertebrate","trendTrend":0.0373,"trendLCI":-0.0687,"trendUCI":0.147,"trendMedian":0.035,"trendStatSig":false,"trendPropInSupport":0.7467,"trendYears":"1989-2023"},{"trendSpecies":"CEDW","trendGuild":"FruiNect","trendTrend":0.0176,"trendLCI":-0.0669,"trendUCI":0.1073,"trendMedian":0.0175,"trendStatSig":false,"trendPropInSupport":0.6333,"trendYears":"1989-2023"},{"trendSpecies":"CHIP","trendGuild":"Omnivore","trendTrend":0.0454,"trendLCI":-0.0292,"trendUCI":0.1262,"trendMedian":0.0441,"trendStatSig":false,"trendPropInSupport":0.88,"trendYears":"1989-2023"},{"trendSpecies":"COYE","trendGuild":"Invertebrate","trendTrend":-0.0393,"trendLCI":-0.1678,"trendUCI":0.0666,"trendMedian":-0.0399,"trendStatSig":false,"trendPropInSupport":0.7467,"trendYears":"1989-2023"},{"trendSpecies":"CSWA","trendGuild":"Invertebrate","trendTrend":-0.051,"trendLCI":-0.1785,"trendUCI":0.0636,"trendMedian":-0.0501,"trendStatSig":false,"trendPropInSupport":0.77,"trendYears":"1989-2023"},{"trendSpecies":"DOWO","trendGuild":"Invertebrate","trendTrend":-0.0348,"trendLCI":-0.1023,"trendUCI":0.0316,"trendMedian":-0.0326,"trendStatSig":false,"trendPropInSupport":0.85,"trendYears":"1989-2023"},{"trendSpecies":"EAWP","trendGuild":"Invertebrate","trendTrend":0.0192,"trendLCI":-0.0345,"trendUCI":0.0792,"trendMedian":0.0199,"trendStatSig":false,"trendPropInSupport":0.7367,"trendYears":"1989-2023"},{"trendSpecies":"GCFL","trendGuild":"Invertebrate","trendTrend":0.052,"trendLCI":-0.0143,"trendUCI":0.1339,"trendMedian":0.05,"trendStatSig":false,"trendPropInSupport":0.9167,"trendYears":"1989-2023"},{"trendSpecies":"GCKI","trendGuild":"Invertebrate","trendTrend":-0.0469,"trendLCI":-0.2185,"trendUCI":0.1192,"trendMedian":-0.0324,"trendStatSig":false,"trendPropInSupport":0.6967,"trendYears":"1989-2023"},{"trendSpecies":"GRCA","trendGuild":"Invertebrate","trendTrend":-0.0578,"trendLCI":-0.1641,"trendUCI":0.1152,"trendMedian":-0.0637,"trendStatSig":false,"trendPropInSupport":0.8567,"trendYears":"1989-2023"},{"trendSpecies":"HAWO","trendGuild":"Invertebrate","trendTrend":-0.0217,"trendLCI":-0.0889,"trendUCI":0.0417,"trendMedian":-0.0222,"trendStatSig":false,"trendPropInSupport":0.71,"trendYears":"1989-2023"},{"trendSpecies":"HETH","trendGuild":"Invertebrate","trendTrend":0.0533,"trendLCI":0.0131,"trendUCI":0.0882,"trendMedian":0.0537,"trendStatSig":true,"trendPropInSupport":1,"trendYears":"1989-2023"},{"trendSpecies":"LEFL","trendGuild":"Invertebrate","trendTrend":0.1321,"trendLCI":-0.0067,"trendUCI":0.2991,"trendMedian":0.128,"trendStatSig":false,"trendPropInSupport":0.9667,"trendYears":"1989-2023"},{"trendSpecies":"MAWA","trendGuild":"Invertebrate","trendTrend":-0.0405,"trendLCI":-0.1602,"trendUCI":0.0724,"trendMedian":-0.0366,"trendStatSig":false,"trendPropInSupport":0.71,"trendYears":"1989-2023"},{"trendSpecies":"MODO","trendGuild":"PlantSeed","trendTrend":0.0048,"trendLCI":-0.0624,"trendUCI":0.0627,"trendMedian":0.0069,"trendStatSig":false,"trendPropInSupport":0.5667,"trendYears":"1989-2023"},{"trendSpecies":"MOWA","trendGuild":"Invertebrate","trendTrend":-0.0712,"trendLCI":-0.239,"trendUCI":0.1033,"trendMedian":-0.0808,"trendStatSig":false,"trendPropInSupport":0.6867,"trendYears":"1989-2023"},{"trendSpecies":"MYWA","trendGuild":"Invertebrate","trendTrend":-0.0132,"trendLCI":-0.0747,"trendUCI":0.0425,"trendMedian":-0.0117,"trendStatSig":false,"trendPropInSupport":0.6533,"trendYears":"1989-2023"},{"trendSpecies":"NAWA","trendGuild":"Invertebrate","trendTrend":-0.0617,"trendLCI":-0.2263,"trendUCI":0.0711,"trendMedian":-0.0608,"trendStatSig":false,"trendPropInSupport":0.7633,"trendYears":"1989-2023"},{"trendSpecies":"NOPA","trendGuild":"Invertebrate","trendTrend":-0.0297,"trendLCI":-0.1268,"trendUCI":0.0669,"trendMedian":-0.029,"trendStatSig":false,"trendPropInSupport":0.6833,"trendYears":"1989-2023"},{"trendSpecies":"NOWA","trendGuild":"Invertebrate","trendTrend":-0.0478,"trendLCI":-0.204,"trendUCI":0.0718,"trendMedian":-0.0276,"trendStatSig":false,"trendPropInSupport":0.6433,"trendYears":"1989-2023"},{"trendSpecies":"OVEN","trendGuild":"Invertebrate","trendTrend":0.0359,"trendLCI":0.0003,"trendUCI":0.0684,"trendMedian":0.0354,"trendStatSig":true,"trendPropInSupport":0.9733,"trendYears":"1989-2023"},{"trendSpecies":"PIWO","trendGuild":"Invertebrate","trendTrend":0.0296,"trendLCI":-0.0178,"trendUCI":0.0811,"trendMedian":0.0305,"trendStatSig":false,"trendPropInSupport":0.8933,"trendYears":"1989-2023"},{"trendSpecies":"PUFI","trendGuild":"PlantSeed","trendTrend":-0.0982,"trendLCI":-0.2595,"trendUCI":0.0678,"trendMedian":-0.0846,"trendStatSig":false,"trendPropInSupport":0.87,"trendYears":"1989-2023"},{"trendSpecies":"RBGR","trendGuild":"Omnivore","trendTrend":0.0244,"trendLCI":-0.0266,"trendUCI":0.0719,"trendMedian":0.026,"trendStatSig":false,"trendPropInSupport":0.8033,"trendYears":"1989-2023"},{"trendSpecies":"RBNU","trendGuild":"Omnivore","trendTrend":0.0155,"trendLCI":-0.0481,"trendUCI":0.0763,"trendMedian":0.0157,"trendStatSig":false,"trendPropInSupport":0.6633,"trendYears":"1989-2023"},{"trendSpecies":"RBWO","trendGuild":"Omnivore","trendTrend":-0.0243,"trendLCI":-0.1455,"trendUCI":0.0886,"trendMedian":-0.0164,"trendStatSig":false,"trendPropInSupport":0.5933,"trendYears":"1989-2023"},{"trendSpecies":"RESQ","trendGuild":"Omnivore","trendTrend":-0.0347,"trendLCI":-0.1313,"trendUCI":0.0372,"trendMedian":-0.0276,"trendStatSig":false,"trendPropInSupport":0.72,"trendYears":"1989-2023"},{"trendSpecies":"REVI","trendGuild":"Invertebrate","trendTrend":0.0576,"trendLCI":0.0066,"trendUCI":0.1024,"trendMedian":0.0626,"trendStatSig":true,"trendPropInSupport":1,"trendYears":"1989-2023"},{"trendSpecies":"RWBL","trendGuild":"Omnivore","trendTrend":-0.0453,"trendLCI":-0.1795,"trendUCI":0.0939,"trendMedian":-0.0463,"trendStatSig":false,"trendPropInSupport":0.6967,"trendYears":"1989-2023"},{"trendSpecies":"SCJU","trendGuild":"PlantSeed","trendTrend":0.0016,"trendLCI":-0.0745,"trendUCI":0.0872,"trendMedian":-0.005,"trendStatSig":false,"trendPropInSupport":0.4667,"trendYears":"1989-2023"},{"trendSpecies":"SCTA","trendGuild":"Invertebrate","trendTrend":0.0468,"trendLCI":-0.0032,"trendUCI":0.1016,"trendMedian":0.0448,"trendStatSig":false,"trendPropInSupport":0.9633,"trendYears":"1989-2023"},{"trendSpecies":"SOSP","trendGuild":"Omnivore","trendTrend":-0.1973,"trendLCI":-0.4581,"trendUCI":0.0174,"trendMedian":-0.1732,"trendStatSig":false,"trendPropInSupport":0.95,"trendYears":"1989-2023"},{"trendSpecies":"SWSP","trendGuild":"Omnivore","trendTrend":-0.0973,"trendLCI":-0.271,"trendUCI":0.1014,"trendMedian":-0.1011,"trendStatSig":false,"trendPropInSupport":0.8333,"trendYears":"1989-2023"},{"trendSpecies":"SWTH","trendGuild":"Invertebrate","trendTrend":-0.0559,"trendLCI":-0.1914,"trendUCI":0.0705,"trendMedian":-0.0537,"trendStatSig":false,"trendPropInSupport":0.74,"trendYears":"1989-2023"},{"trendSpecies":"TUTI","trendGuild":"Invertebrate","trendTrend":-0.0627,"trendLCI":-0.1604,"trendUCI":0.0163,"trendMedian":-0.0579,"trendStatSig":false,"trendPropInSupport":0.93,"trendYears":"1989-2023"},{"trendSpecies":"VEER","trendGuild":"Omnivore","trendTrend":0.0371,"trendLCI":-0.0118,"trendUCI":0.0813,"trendMedian":0.0387,"trendStatSig":false,"trendPropInSupport":0.9333,"trendYears":"1989-2023"},{"trendSpecies":"WBNU","trendGuild":"Omnivore","trendTrend":0.037,"trendLCI":-0.0279,"trendUCI":0.1227,"trendMedian":0.0261,"trendStatSig":false,"trendPropInSupport":0.7967,"trendYears":"1989-2023"},{"trendSpecies":"WIWR","trendGuild":"Invertebrate","trendTrend":0.0396,"trendLCI":-0.0366,"trendUCI":0.0938,"trendMedian":0.046,"trendStatSig":false,"trendPropInSupport":0.8567,"trendYears":"1989-2023"},{"trendSpecies":"WOTH","trendGuild":"Invertebrate","trendTrend":0.0288,"trendLCI":-0.0483,"trendUCI":0.0967,"trendMedian":0.0342,"trendStatSig":false,"trendPropInSupport":0.77,"trendYears":"1989-2023"},{"trendSpecies":"WTSP","trendGuild":"PlantSeed","trendTrend":0.0725,"trendLCI":-0.021,"trendUCI":0.1607,"trendMedian":0.0741,"trendStatSig":false,"trendPropInSupport":0.9433,"trendYears":"1989-2023"},{"trendSpecies":"YBFL","trendGuild":"Invertebrate","trendTrend":-0.0246,"trendLCI":-0.1645,"trendUCI":0.1525,"trendMedian":-0.031,"trendStatSig":false,"trendPropInSupport":0.6333,"trendYears":"1989-2023"},{"trendSpecies":"YBSA","trendGuild":"Omnivore","trendTrend":0.0604,"trendLCI":0.0153,"trendUCI":0.1006,"trendMedian":0.0609,"trendStatSig":true,"trendPropInSupport":0.9967,"trendYears":"1989-2023"},{"trendSpecies":"YEWA","trendGuild":"Invertebrate","trendTrend":-0.1719,"trendLCI":-0.3687,"trendUCI":0.0176,"trendMedian":-0.1644,"trendStatSig":false,"trendPropInSupport":0.96,"trendYears":"1989-2023"},{"trendSpecies":"YSFL","trendGuild":"Invertebrate","trendTrend":-0.0061,"trendLCI":-0.1397,"trendUCI":0.1107,"trendMedian":0.0007,"trendStatSig":false,"trendPropInSupport":0.48,"trendYears":"1989-2023"},{"trendSpecies":"YTVI","trendGuild":"Invertebrate","trendTrend":-0.0719,"trendLCI":-0.2203,"trendUCI":0.0488,"trendMedian":-0.063,"trendStatSig":false,"trendPropInSupport":0.8767,"trendYears":"1989-2023"}] 
*/
window.addEventListener("load", (ev) => {
retrieveTrends();
});


// apicall
function retrieveTrends(){    

  var trendSummary;
  // UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
  const fetchTrends = fetch("http://vtatlasoflife.org:4321/trends")
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