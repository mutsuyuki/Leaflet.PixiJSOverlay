# Leaflet.PixiJSOverlay
pixi.js overlay

Very simple overlay for use pixi.js on map.

This plugin extend "Renderer" module that also extended by SVG layer and Canvas layer.

So this plugin can used with Leaflet original coord funciton (ex: LatLngToLayerpoint).



### demo
https://mutsuyuki.github.io/Leaflet.PixiJSOverlay/demo.html

### demo code 
``` javascript

    // create leaflet map
    var map = L.map('map').setView([30.7736012, 182.1794325], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // create pixi and pixiJSOverlay
    var width = document.getElementById("map").clientWidth;
    var height = document.getElementById("map").clientHeight;
    var pixiApp = new PIXI.Application( width, height, { transparent: true, antialias:true });
    L.pixiJSOverlay(pixiApp, {padding: 0}).addTo(map);
    
    // make coords using leaflet original function
    var startLatLng = new L.LatLng(35.698224, 140.632130);
    var endLatLng = new L.LatLng(37.456482, 237.520019);
    
    // draw graphics on map
    var graphic = new PIXI.Graphics();
    pixiApp.stage.addChild(graphic);
    function draw(){
      var startPoint = map.latLngToLayerPoint(startLatLng);
      var endPoint = map.latLngToLayerPoint(endLatLng);
      graphic.clear();    
      graphic.lineStyle(3 ,0xff0000);
      graphic.moveTo(startPoint.x, startPoint.y);
      graphic.lineTo(endPoint.x, endPoint.y);
      pixiApp.render();
    }
    draw();
    
    // need redraw on map zoomend
    map.on("zoomend", draw);
```
