// Setup LeafletJS
var longLat = [52.011, 4.358]
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const map = L.map('map', {
    minZoom: 3,
    zoomControl: false
})
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: attribution }).addTo(map);
map.setView(longLat, 12);

L.control.zoom({
    position: 'bottomright'
}).addTo(map);
