// Setup LeafletJS
var longLat = [52.011, 4.358]
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const map = L.map('map')
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: attribution }).addTo(map);
map.setView(longLat, 12);



var group_circle = L.featureGroup();
map.addLayer(group_circle)

function onMapLeftClick_green(e) {
    L.circle(e.latlng, {
        color: 'green',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 2000
    }).addTo(group_circle)
}

function onMapLeftClick_red(e) {
    L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: 2000
    }).addTo(group_circle)
}

//map.on('click', onMapLeftClick_green);

function select_circle_green() {
    alert("You clicked Green");
    map.on('click', onMapLeftClick_green);
}

function select_circle_red() {
    alert("You clicked Red");
    map.on('click', onMapLeftClick_red);
}