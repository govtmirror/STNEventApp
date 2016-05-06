function addCommas(e){e+="";for(var t=e.split("."),a=t[0],i=t.length>1?"."+t[1]:"",s=/(\d+)(\d{3})/;s.test(a);)a=a.replace(s,"$1,$2");return a+i}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,t){return 0==t?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var eventName="Sandy",eventType="",mapServicesRoot="https://stnmapservices.wim.usgs.gov/arcgis/rest/services/STN",stnDomain="stn.wim.usgs.gov",allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,t,a){allLayers=[{groupHeading:"Event Data",showGroupHeading:!0,includeInLayerList:!0,layers:{"NOAA Tropical Cyclone Track":{url:"http://nowcoast.noaa.gov/arcgis/rest/services/nowcoast/wwa_meteocean_tropicalcyclones_trackintensityfcsts_time/MapServer",options:{id:"noaaConeTrack",opacity:.5,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,includeLegend:!0,hasOpacitySlider:!0,identifiable:!1}},Barometric:{url:mapServicesRoot+"/Barometric/MapServer/0",options:{id:"baro",opacity:1,visible:!1,mode:a.MODE_SNAPSHOT,outFields:["*"],definitionExpression:"EVENT_NAME = '"+eventName+"'"},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,includeLegend:!0,hasOpacitySlider:!0,identifiable:!0}},Meteorological:{url:mapServicesRoot+"/Meteorological/MapServer/0",options:{id:"met",opacity:1,visible:!1,mode:a.MODE_SNAPSHOT,outFields:["*"],definitionExpression:"EVENT_NAME = '"+eventName+"'"},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0,identifiable:!0}},"Rapid Deploy Gage":{url:mapServicesRoot+"/RapidDeployGage/MapServer/0",options:{id:"rdg",opacity:1,visible:!0,mode:a.MODE_SNAPSHOT,outFields:["*"],definitionExpression:"EVENT_NAME = '"+eventName+"'"},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0,identifiable:!0}},"Storm Tide":{url:mapServicesRoot+"/StormTide/MapServer/0",options:{id:"stormTide",opacity:1,visible:!1,mode:a.MODE_SNAPSHOT,outFields:["*"],definitionExpression:"EVENT_NAME = '"+eventName+"'"},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0,identifiable:!0}},"Wave Height":{url:mapServicesRoot+"/WaveHeight/MapServer/0",options:{id:"waveHeight",opacity:1,visible:!1,mode:a.MODE_SNAPSHOT,outFields:["*"],definitionExpression:"EVENT_NAME = '"+eventName+"'"},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0,identifiable:!0}},"High-water Marks":{url:mapServicesRoot+"/HWMs/MapServer/0",options:{id:"hwms",opacity:1,visible:!0,mode:a.MODE_SNAPSHOT,outFields:["*"],definitionExpression:"EVENT_NAME = '"+eventName+"'"},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0,identifiable:!0}},"USGS real-time NWIS gages":{url:mapServicesRoot+"/STN_nwis_rt/MapServer/0",options:{id:"nwis",opacity:1,visible:!1,mode:a.MODE_SNAPSHOT,outFields:["*"]},wimOptions:{type:"layer",layerType:"agisFeature",includeInLayerList:!0,includeLegend:!0,identifiable:!0}},"NWS Doppler Radar":{url:"http://gis.srh.noaa.gov/arcgis/rest/services/RIDGERadar/MapServer",options:{id:"radar",opacity:.99,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,includeLegend:!1,hasOpacitySlider:!0,identifiable:!1}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,identifyLayers=[];require(["esri/map","esri/dijit/HomeButton","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/graphicsUtils","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","dojo/dom","dojo/on","dojo/domReady!"],function(e,t,a,i,s,n,o,r,l,p,c,d){function g(){c.byId("chkExtent").checked===!0?E.activeGeocoder.searchExtent=map.extent:E.activeGeocoder.searchExtent=null}function u(){g();var e=E.find();e.then(function(e){m(e)}),$("#geosearchModal").modal("hide")}function h(e){v();var t=e.graphic?e.graphic:e.result.feature;t.setSymbol(L),f(e.result,t.symbol)}function m(e){if(e=e.results,e.length>0){v();for(var t=L,a=0;a<e.length;a++)f(e[a],t);b(e)}}function y(e){var t=e.indexOf(",");return t>0&&(e=e.substring(0,t)),e}function f(e,t){var a,i,o,r,l={};o=e.feature.geometry,l.address=e.name,l.score=e.feature.attributes.Score,a={address:y(l.address),score:l.score,lat:o.getLatitude().toFixed(2),lon:o.getLongitude().toFixed(2)},i=new s({title:"{address}",description:"Latitude: {lat}<br/>Longitude: {lon}"}),r=new n(o,t,a,i),map.graphics.add(r)}function b(e){for(var t=new r(map.spatialReference),a=0;a<e.length;a++)t.addPoint(e[a].feature.geometry);map.setExtent(t.getExtent().expand(2))}function v(){map.infoWindow.hide(),map.graphics.clear()}function S(e,t,a,i,s){return new l({angle:0,xoffset:t,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:i,height:s})}map=new e("mapDiv",{basemap:"gray",center:[-74.22,36.651],zoom:6,logo:!1});var T=new t({map:map},"homeButton");T.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),d(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var t=p.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}),d(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),d(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!==e.mapPoint){var t=p.webMercatorToGeographic(e.mapPoint);$("#latitude").html(t.y.toFixed(3)),$("#longitude").html(t.x.toFixed(3))}}),d(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=p.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var w=new a("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer",{visible:!1});map.addLayer(w),d(c.byId("btnStreets"),"click",function(){map.setBasemap("streets"),w.setVisibility(!1)}),d(c.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),w.setVisibility(!1)}),d(c.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),w.setVisibility(!1)}),d(c.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),w.setVisibility(!1)}),d(c.byId("btnGray"),"click",function(){map.setBasemap("gray"),w.setVisibility(!1)}),d(c.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),w.setVisibility(!1)}),d(c.byId("btnOSM"),"click",function(){map.setBasemap("osm"),w.setVisibility(!1)}),d(c.byId("btnTopo"),"click",function(){map.setBasemap("topo"),w.setVisibility(!1)}),d(c.byId("btnNatlMap"),"click",function(){w.setVisibility(!0)});var E=new i({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");E.startup(),E.on("select",h),E.on("findResults",m),E.on("clear",v),d(E.inputNode,"keydown",function(e){13==e.keyCode&&g()});var L=S("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),d(c.byId("btnGeosearch"),"click",u),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}function t(){$("#aboutModal").modal("show")}$(".eventType").html(eventType+"&nbsp;"),$(".eventName").html(eventName),$("#disclaimerModal").modal({backdrop:"static"}),$("#disclaimerModal").modal("show"),$("#geosearchNav").click(function(){e()}),$("#aboutNav").click(function(){t()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),$("#legendDiv").niceScroll(),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),$("#legendCollapse").on("shown.bs.collapse",function(){maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#sensorModal").on("hidden.bs.modal",function(){$("#rdgChartDiv").empty()})}),require(["esri/dijit/Legend","esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/request/xhr","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,t,a,i,s,n,o,r,l,p,c,d,g,u,h,m,y,f,b,v){function S(e,t,a,i,s,n,o){if(map.addLayer(a),w.push([s,camelize(i),a]),s){if(!$("#"+camelize(s)).length){var r=$('<div id="'+camelize(s+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+s+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(w,function(e,t){var a=map.getLayer(t[2].id);if(t[0]==s)if($("#"+t[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",t[1]),map.addLayer(t[2]);var a=map.getLayer(t[2].id);a.setVisibility(!0)}else r.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",t[1]),map.removeLayer(t[2]))})});var l=$('<div id="'+camelize(s)+'" class="btn-group-vertical" data-toggle="buttons"></div');$("#toggle").append(l)}if(a.visible)var p=$('<div id="'+camelize(i)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+i+"</label> </div>");else var p=$('<div id="'+camelize(i)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(s)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(s)+'"></i>&nbsp;&nbsp;'+i+"</label> </div>");$("#"+camelize(s)).append(p),p.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var t=$(this)[0].id;$.each(w,function(e,a){if(a[0]==s)if(a[1]==t&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var i=map.getLayer(a[2].id);i.setVisibility(!0)}else a[1]==t&&$("#"+camelize(s+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",a[1]),map.removeLayer(a[2]),$("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+a[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"))})}})}else{if(a.visible&&void 0!==o.hasOpacitySlider&&o.hasOpacitySlider===!0)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(a.visible||void 0===o.hasOpacitySlider||o.hasOpacitySlider!==!0)if(a.visible)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+i+"</button></span></div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+"</button> </div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+i+'<span id="opacity'+camelize(i)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');p.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(i)).toggle(),a.visible?a.setVisibility(!1):a.setVisibility(!0)})}if(t){var c=camelize(e);if(!$("#"+c).length){var d=$('<div id="'+c+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(d)}s?($("#"+c).append(r),$("#"+c).append(l)):($("#"+c).append(p),$("#opacity"+camelize(i)).length>0&&$("#opacity"+camelize(i)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(n.id).opacity,t=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(t),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var t=$("#slider")[0].value/100;console.log("o: "+t),$("#opacityValue").html("Opacity: "+t),map.getLayer(n.id).setOpacity(t)})}))}else $("#toggle").append(p)}var T=[],w=[];$.each(allLayers,function(e,t){console.log("processing: ",t.groupHeading),$.each(t.layers,function(e,a){var i="";if(a.wimOptions.exclusiveGroupName&&(i=a.wimOptions.exclusiveGroupName),"agisFeature"===a.wimOptions.layerType){var s=new l(a.url,a.options);a.wimOptions&&a.wimOptions.includeLegend===!0&&T.push({layer:s,title:e}),S(t.groupHeading,t.showGroupHeading,s,e,i,a.options,a.wimOptions),v(s,"click",function(e){if(void 0!==e.graphic.attributes.INSTRUMENT_ID){$("#sensorEvent").html(e.graphic.attributes.EVENT_NAME),$("#city").html(e.graphic.attributes.CITY),$("#county").html(e.graphic.attributes.COUNTY),$("#state").html(e.graphic.attributes.STATE),$(".latLng").html(e.graphic.attributes.LATITUDE_DD.toFixed(4)+", "+e.graphic.attributes.LONGITUDE_DD.toFixed(4)),$("#siteName").html(e.graphic.attributes.SITE_NAME),$("#siteDescription").html(e.graphic.attributes.SITE_DESCRIPTION),$("#status").html(e.graphic.attributes.STATUS),$("#sensorDataLink").html('<a target="_blank" href="http://'+stnDomain+"/STNWeb/Public/SensorInfoPage?siteId="+e.graphic.attributes.SITE_ID+"&sensorId="+e.graphic.attributes.INSTRUMENT_ID+'">Sensor&nbsp;'+e.graphic.attributes.INSTRUMENT_ID+"</a>");var t=e.currentTarget.id.replace("_layer",""),a=map.getLayer(t).name;$(".sensorTypeTitle").html(a+"&nbsp"+e.graphic.attributes.INSTRUMENT_ID),$("#peaksTable").html("<tr><th>Peak Stage (ft)</th><th>Peak Date & Time</th><th>Datum</th></tr>");var i=e.mapPoint.x+","+e.mapPoint.y,s=map.extent.xmin+","+map.extent.ymin+","+map.extent.xmax+","+map.extent.ymax,n=map.height+","+map.width+",96",o=mapServicesRoot+"/Peaks/MapServer";if($.ajax({dataType:"json",type:"GET",url:o+"/identify?f=json&geometry="+i+"&tolerance=3&mapExtent="+s+"&layerDefs=0%3AEVENT_NAME%3D%27"+eventName+"%27&imageDisplay="+n,headers:{Accept:"*/*"},success:function(e){if(e.results.length>0)for(var t=0;t<e.results.length;t++){var a=e.results[t].attributes;$("#peaksTable").append("<tr><td>"+a.PEAK_STAGE+"</td><td>"+a.PEAK_DATE+"</td><td>"+a.DATUM_NAME+"</td></tr>")}else $("#peaksTable").html("No peaks associated with this location")},error:function(e){console.log("Error processing the peaks JSON response. The error is:"+e),$("#peaksTable").html("An error occurred retrieving peaks data. Please try again. ")}}),"Rapid Deployment Gage"==e.graphic.attributes.SENSOR){$("#rdgChartDiv").html('<i class="fa fa-circle-o-notch fa-spin fa-2x"></i>');var r="",l=e.graphic.attributes.SITE_ID;$.ajax({dataType:"json",type:"GET",url:"http://stn.wim.usgs.gov/STNServices/Sites/"+l+".json",headers:{Accept:"*/*"},success:function(e){r=e.USGS_SID,u("/proxies/rdgChartProxy/Default.aspx",{query:{site_no:r,begin_date:"2015-10-02",end_date:"2015-10-09"}}).then(function(e){e.length>0?-1==e.indexOf("no data")?$("#rdgChartDiv").html("<a target='_blank' href='http://waterdata.usgs.gov/usa/nwis/uv?site_no="+r+"'><img class='img-responsive' src='"+e+"'/></a><br><hr><a target='_blank' href='http://waterdata.usgs.gov/usa/nwis/uv?site_no="+r+"'>Link to full NWIS data</a>"):$("#rdgChartDiv").html('<h5> <i class="fa fa-frown-o fa-lg"></i> No real-time graph available for this site.</h5><br><hr><a target="_blank" href="http://waterdata.usgs.gov/usa/nwis/uv?site_no='+r+'">Link to full data</a>'):console.log("No RDG chart returned")})},error:function(){r="null"}})}$("#sensorModal").modal("show"),$("#sensorTab").tab("show")}if(void 0!==e.graphic.attributes.HWM_ID&&($("#hwmEvent").html(e.graphic.attributes.EVENT_NAME),$("#hwmElev").html(e.graphic.attributes.ELEV_FT),$("#hwmWaterbody").html(e.graphic.attributes.WATERBODY),$("#hwmCounty").html(e.graphic.attributes.COUNTY),$("#hwmState").html(e.graphic.attributes.STATE),$(".latLng").html(e.graphic.attributes.LATITUDE_DD.toFixed(4)+", "+e.graphic.attributes.LONGITUDE_DD.toFixed(4)),$(".hwmID").html(e.graphic.attributes.HWM_ID),$("#hwmSiteName").html(e.graphic.attributes.SITE_NAME),$("#hwmDescription").html(e.graphic.attributes.HWM_LOCATIONDESCRIPTION),$("#hwmType").html(e.graphic.attributes.HWM_TYPE),$("#hwmDataLink").html('<a target="_blank" href="http://'+stnDomain+"/STNWeb/Public/HWMInfoPage?siteId="+e.graphic.attributes.SITE_ID+"&hwmId="+e.graphic.attributes.HWM_ID+'">HWM&nbsp;'+e.graphic.attributes.HWM_ID+"</a>"),$("#hwmModal").modal("show")),void 0!==e.graphic.attributes.PEAK_STAGE){$("#peaksModalTable").html("<tr><th>Event</th><th>Peak Stage (ft)</th><th>Datum</th><th>Peak Date & Time (UTC)</th></tr>");var i=e.mapPoint.x+","+e.mapPoint.y,s=map.extent.xmin+","+map.extent.ymin+","+map.extent.xmax+","+map.extent.ymax,n=map.height+","+map.width+",96",o=mapServicesRoot+"/Peaks/MapServer";$.ajax({dataType:"json",type:"GET",url:o+"/identify?f=json&geometry="+i+"&tolerance=3&mapExtent="+s+"&layerDefs=0%3AEVENT_NAME%3D%27"+eventName+"%27&imageDisplay="+n,headers:{Accept:"*/*"},success:function(e){if(e.results.length>0)for(var t=0;t<e.results.length;t++){var a=e.results[t].attributes;$("#peaksModalTable").append("<tr><td>"+a.EVENT_NAME+"</td><td>"+a.PEAK_STAGE+"</td><td>"+a.DATUM_NAME+"</td><td>"+a.PEAK_DATE+"</td></tr>")}else $("#peaksModalTable").html("No peaks associated with this location")},error:function(e){console.log("Error processing the peaks JSON response. The error is:"+e),$("#peaksModalTable").html("An error occurred retrieving peaks data. Please try again. ")}}),$("#peakModal").modal("show")}if(void 0!==e.graphic.attributes.Name){var p=e.graphic.attributes.Name;u("/proxies/nwisChartProxy/Default.aspx",{query:{site_no:p,chart_param:"00065",begin_date:"2015-10-02",end_date:"2015-10-09"}}).then(function(e){e.length>0?($(".nwisSiteNo").html(p),$("#nwisModalBody").html("<a target='_blank' href='http://waterdata.usgs.gov/usa/nwis/uv?site_no="+p+"'><img src='"+e+"' width=400/></a><br><hr><a target='_blank' href='http://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no="+p+"'>Link to full data</a>"),$("#nwisModal").modal("show")):($(".nwisSiteNo").html(p),$("#nwisModalBody").html('<h5> <i class="fa fa-frown-o fa-lg"></i> No real-time graph available for this site.</h5><br><hr><a target="_blank" href="http://waterdata.usgs.gov/nwis/inventory?agency_code=USGS&site_no='+p+'">Link to full data</a>'),$("#nwisModal").modal("show"))})}})}else if("agisWMS"===a.wimOptions.layerType){var s=new p(a.url,{resourceInfo:a.options.resourceInfo,visibleLayers:a.options.visibleLayers},a.options);a.wimOptions&&a.wimOptions.includeLegend===!0&&T.push({layer:s,title:e}),S(t.groupHeading,t.showGroupHeading,s,e,i,a.options,a.wimOptions)}else if("agisDynamic"===a.wimOptions.layerType){var s=new r(a.url,a.options);if(a.wimOptions.identifiable===!0&&identifyLayers.push({id:a.options.id,url:a.url}),null!==a.options.layerDefinitions){var n=[];n.push(a.options.layerDefinitions),s.setLayerDefinitions(n)}a.wimOptions&&a.wimOptions.includeLegend===!0&&T.push({layer:s,title:e}),a.visibleLayers&&s.setVisibleLayers(a.visibleLayers),S(t.groupHeading,t.showGroupHeading,s,e,i,a.options,a.wimOptions)}})});var E=new e({map:map,layerInfos:T},"legendDiv");E.startup()})});