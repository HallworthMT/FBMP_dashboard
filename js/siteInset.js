import{VTshape} from "./VTshapes.js"
import{VTcounties} from "./VTshapes.js"
import{FBMP_transects} from "./VTshapes.js"
import{FBMP_points} from "./VTshapes.js"

var PlotFocusMap = null;

console.log(FBMP_transects)

makeTransectMap("CONCORDWOODS");

function makeTransectMap(SELECTEDSITE){

  // get index of selected site 
  var siteIdx = FBMP_transects.features.map((e, i) => e.properties.Transect === SELECTEDSITE ? i : -1).filter(index => index !== -1);
  
  console.log(siteIdx,"siteindexTransect")
  var Sitecenter = siteIdx.map(i => FBMP_transects.features[i].geometry.coordinates)
  console.log(Sitecenter)
 
  if(PlotFocusMap !== null){
    PlotFocusMap = PlotFocusMap.remove()}


  PlotFocusMap = L.map('SiteFocusPlot', {
        center: [Sitecenter[0][1],Sitecenter[0][0]],
        zoom: 13,
        zoomControl: true,
        dragging: true,
        minZoom: 7,
        maxZoom: 13
      }).setView([Sitecenter[0][1],Sitecenter[0][0]]);
  
  // Add base map layer
 var simplebase = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors, CartoDB'
  })
  
  simplebase.addTo(PlotFocusMap);
  
  var VTbound = L.geoJSON(VTshape, {
    weight: 1,
    color: 'gray',
    fillOpacity: 0
  })
  
  VTbound.addTo(PlotFocusMap);
  
  
  // Add county polygons
  var vtcounties = L.geoJSON(VTcounties, {
    weight: 2,
    color: '#7f7f7f',
    fillOpacity: 0
  })
  
  vtcounties.addTo(PlotFocusMap);
  
   //logo position: bottomright, topright, topleft, bottomleft
   var logo = L.control({position: 'bottomleft'});
   logo.onAdd = function(map){
       var div = L.DomUtil.create('div', 'myclass');
       div.innerHTML= "<img style='width:200px' src='etc/VCE_small_logo.jpg'/>";
       return div;
   }

   logo.addTo(PlotFocusMap);
   var siteIdx = FBMP_transects.features
    .map((e, i) => e.properties.Transect === SELECTEDSITE ? i : -1)
   var circleColors = FBMP_transects.features.map(e => e.properties.Transect === SELECTEDSITE ? "red" : "gray")
   var circleOpacity = FBMP_transects.features.map(e => e.properties.Transect === SELECTEDSITE ? 1 : 0.5)

   FBMP_transects.features.properties = FBMP_transects.features.map((x,i) => x.properties.color = circleColors[i])
   FBMP_transects.features.properties = FBMP_transects.features.map((x,i) => x.properties.fillOpacity = circleOpacity[i])


   var SelectPointSpot = L.geoJSON(FBMP_transects, {
     pointToLayer: (feature, layer) => {
       return new L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
           radius: 100,
           weight: 0.2,
           stroke: feature.properties.color,
           color: feature.properties.color,
           fillColor: feature.properties.color,
           fillOpacity: feature.properties.fillOpacity
         });
       },
     onEachFeature: function(feature, layer) {
       layer.bindPopup('Survey site: ' + feature.properties.Transect);
     }
   }).addTo(PlotFocusMap);

   //if(addInset){
    var Esri_OceanBasemap = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13,
      dragging: false
    });
    
        // Add inset map
   // var miniMap = new L.Control.MiniMap(
    //    VTshape,
    //    { toggleDisplay: false, width: 100, height: 100, position: "topright",centerFixed: true}
    //  ).addTo(PlotFocusMap);
      
      //var circleColors = "#006054";
      //var circleOpacity = 0.75;

      //FBMP_transects.features.properties = FBMP_transects.features.map((x,i) => x.properties.color = circleColors)
      //FBMP_transects.features.properties = FBMP_transects.features.map((x,i) => x.properties.fillOpacity = circleOpacity)

      //var TransectMiniMap = L.geoJSON(FBMP_transects, {
      //  pointToLayer: (feature, layer) => {
      //    return new L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      //        radius: 2000,
      //        fillColor: feature.properties.circleColors,
      //        fillOpacity: feature.properties.circleOpacity
      //      });
      //    }
     // });

      //TransectMiniMap.addTo(PlotFocusMap)

    //}
}

export{makeTransectMap}

