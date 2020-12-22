var mymap = L.map('mapid').setView([56.838607, 60.605514], 13);

var circle = L.circleMarker([56.843, 60.6863]).addTo(mymap);
circle.on('mouseover', function (e) { circle.setRadius(15); });
circle.on('mouseout', function (e) {
circle.setRadius(10);
});
circle.on('mousedown', function (e) {

if (circle.color === "#ff0000") {
  circle.setStyle({ color: "#0000ff" });
} else {
  circle.setStyle({ color: "#ff0000" });
}
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);
