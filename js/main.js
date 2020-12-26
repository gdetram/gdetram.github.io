
var circles = [];
var mymap = L.map('mapid').setView([56.838607, 60.605514], 13);
var line = new L.Polyline([], {
    color: 'red',
    weight: 7,
    opacity: 0.5,
    smoothFactor: 1,
    interactive: false
});

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createCircle(x, y, id) {
    var circle = L.circleMarker([x, y]);
    circle.id = id;
    circle.setRadius(5);
    circle.setStyle({ color: "#0088cc" });

    circle.on('mouseover', function (e) { circle.setRadius(10); });
    circle.on('mouseout', function (e) { circle.setRadius(5); });

    circle.on('mousedown', function (e) {
        var route = document.getElementById("route-input").value.split(",");
        if (circle.selected === 1) {
          circle.selected = 0;

          document.getElementById("route-input").value = route.filter(x => x != circle.id.toString());
          redrawRoute();
        } else {
          circle.selected = 1;

          route.push(circle.id);
          document.getElementById("route-input").value = route.toString();
          redrawRoute();
        }
    });
    return circle;
}

function redrawRoute() {
    var route = document.getElementById("route-input").value.substring(1).split(',');

    var points = [];
    for (i = 0; i < route.length; ++i) {
        var circle = circles.find(x => x.id == route[i]);
        if (typeof circle != "undefined") {
            points.push(circle.getLatLng());
        }
    }
    line.setLatLngs(points);
    line.addTo(mymap);

    for (i = 0; i < circles.length; ++i) {
        if (route.includes(circles[i].id.toString())) {
            circles[i].selected = 1;
            circles[i].setStyle({ color: "#ff0000" });
        } else {
            circles[i].selected = 0;
            circles[i].setStyle({ color: "#0088cc" });
        }
    }
}

function updateLink() {
    var carModel = document.getElementById("car-model").value;
    var carColor = document.getElementById("car-color").value;
    var carNumber = document.getElementById("car-number").value;
    var routePrice = document.getElementById("route-price").value;
    var route = document.getElementById("route-input").value;
    var link = "https://t.me/share/url?url=t.me/gdetrambot&text=" + carModel + ";" + carColor + ";" + carNumber + ";" + routePrice + ";" + route;
    console.log(link)
    document.getElementById("send-route").setAttribute("href", link);
}

for (i = 0; i < stops.length; ++i) {
    var circle = createCircle(stops[i].lat, stops[i].lon, i+1);
    circles.push(circle);
    circle.addTo(mymap);
}

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);
