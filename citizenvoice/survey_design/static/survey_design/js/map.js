// Setup LeafletJS
var longLat = [52.011, 4.358]
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const map = L.map('map')
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: attribution }).addTo(map);
map.setView(longLat, 12);

// Add Marker

var circle = L.circle(longLat, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.3,
    radius: 4000
})
//.addTo(map);
var group = L.featureGroup();
//circle.addTo(group)
map.addLayer(group)

// Popup

var group_green_circle = L.featureGroup();
map.addLayer(group_green_circle)

function onMapLeftClick(e) {
//    popup
//        .setLatLng(e.latlng)
//        .setContent("You clicked the map at " + e.latlng.toString())
//        .openOn(map);
    other_circle = L.circle(e.latlng, {
        color: 'green',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 2000
    }).addTo(group_green_circle)
}

var popup = L.popup();
function onMapRightClick(e) {
    alert("some text")
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapLeftClick);
map.on('contextmenu', onMaprightClick);

