import{VTshape} from "./VTshapes.js"
import{VTcounties} from "./VTshapes.js"
import{FBMP_transects} from "./VTshapes.js"
import{FBMP_points} from "./VTshapes.js"
import{sel_species} from "./sppSummary.js"
import{sppTrendMap} from "./sppSummary.js"
import { apiUrl } from './config.js';

var sel_species_trend = "OVEN"

var transectTrends; 
// var sel_this_job;
// var sel_species;
//var sppTrendMap = null;

makeTrendMap();
  
function makeTrendMap(){

  var vtCenter = [43.916944, -72.668056]; //VT geo center, downtown Randolph
  var valMap = false;
  var trendmapId = 'trendSites';
  var basemapLayerControl = false;
  var overlayLayerControl = false;
  var basemapDefault = false;
  var valLayer = false;//for standalone use

  sppTrendMap = L.map('trendSites', {
        center: vtCenter,
        zoom: 8,
        zoomControl: true,
        dragging: true,
        minZoom: 8,
        maxZoom: 13
      });
  
  // Add base map layer
 var simplebase = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, CartoDB'
  })
  
  simplebase.addTo(sppTrendMap);
  
  var VTbound = L.geoJSON(VTshape, {
    weight: 1,
    color: 'gray',
    fillOpacity: 0
  })
  
  VTbound.addTo(sppTrendMap);
  
  /*           
  // Add town polygons
  L.geoJSON(VTtowns, {
    weight: 1,
    color: 'gray',
    fillOpacity: 0,
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.TOWNNAME);
    }
  }).addTo(leafletPlot);
  */
  
  // Add county polygons
  var vtcounties = L.geoJSON(VTcounties, {
    weight: 2,
    color: '#7f7f7f',
    fillOpacity: 0
  })
  
  vtcounties.addTo(sppTrendMap);
  
   //logo position: bottomright, topright, topleft, bottomleft
   var logo = L.control({position: 'bottomleft'});
   logo.onAdd = function(map){
       var div = L.DomUtil.create('div', 'myclass');
       div.innerHTML= "<img style='width:200px' src='etc/VCE_small_logo.jpg'/>";
       return div;
   }

   logo.addTo(sppTrendMap);

  // UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
const fetchSpeciesLeaf = fetch(`${apiUrl}/table/transect_trends?trantrendSpecies=${sel_species}`)
.then(function(response){ return response.json() });

//resolve the promise then print
Promise.resolve(fetchSpeciesLeaf) // Waits for fetchPromise to get its value
.then(function (res){ 
transectTrends = res.rows
console.log('transectrends::')          
console.log(transectTrends)
}).then(() => {

  var SppTrendPts = L.featureGroup(); 

  var circleStyle = {
    radius: 1000,
    color: transectTrends.map(d => d.transtrendTrend> 0 ? "red" : "blue"),
    fillColor: transectTrends.map(d => d.transtrendTrend< 4 ? "red" : "blue"),
    fillOpacity: transectTrends.map(d => d.transtrendTrend< 10 ? "1" : "0.5"),
    weight: 0.5};

  var SppTrend_cols = L.geoJSON(FBMP_transects, {
    pointToLayer: (feature, latlng) => {
      return new L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
          radius: circleStyle.radius,
          color: circleStyle.color[latlng],
          fillColor: circleStyle.fillColor[latlng]
        });
      },
    onEachFeature: function(feature, layer) {
      layer.bindPopup('Site Name: ' + feature.properties.FullName + '<br>' + feature.properties.Notes);
    }
  }).addTo(SppTrendPts);

  sppTrendMap.addLayer(SppTrendPts);
});
} // end of mapspeciestrend

function updateTrendMap(){
// UNCOMMENT THIS TO USE THE API - DONT FORGET TO UNCOMMENT THE } at end of doc
const fetchSpeciesLeaf = fetch(`${apiUrl}/table/transect_trends?trantrendSpecies=${sel_species}`)
.then(function(response){ return response.json() });

//resolve the promise then print
Promise.resolve(fetchSpeciesLeaf) // Waits for fetchPromise to get its value
.then(function (res){ 
transectTrends = res.rows
console.log('transectrends::')
console.log(transectTrends)
}).then(() => {

 
  if( sppTrendMap.hasLayer(FBMP_transects)){ 
    sppTrendMap.removeLayer(FBMP_transects)
  }

  if( sppTrendMap.hasLayer(FBMP_points)){
    sppTrendMap.removeLayer(FBMP_points)
  }

  if( sppTrendMap.hasLayer(SppTrendPts)){
    sppTrendMap.removeLayer(SppTrendPts)
  }

  if( sppTrendMap.hasLayer(SppTrend_cols)){
    sppTrendMap.removeLayer(SppTrend_cols)
  }
  
  var SppTrendPts = L.featureGroup();

  var circleStyle = {
    radius: 2000,
    color: transectTrends.map(d => d.trantrendTrend> 0 ? "#003366" : "#ff66ff"),
    fillColor: transectTrends.map(d => d.trantrendTrend< 0 ? "red" : "blue"),
    fillOpacity: transectTrends.map(d => d.trantrendTrend< 0 ? "1" : "0.5"),
    weight: 0.2};

  console.log(circleStyle)
  var ModSppTrend_cols = L.geoJSON  (FBMP_transects, {
    //color: transectTrends.map(d => d.trendTrend < 0 ? "red" : "blue"),
    pointToLayer: (feature, layer) => {
      return new L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: circleStyle.radius,
        color: circleStyle.fillColor[layer]});
  },
    onEachFeature: function(feature, layer) {
      layer.bindPopup('Site Name: piss off ' + feature.properties.Notes);
    }
  }).addTo(SppTrendPts);  

  sppTrendMap.addLayer(ModSppTrend_cols)
});
}


export{makeTrendMap}
export{updateTrendMap}