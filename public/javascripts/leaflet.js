
// Create a map centered at a specific location and with an initial zoom level
var mymap = L.map('map', {
    center: [0, 0],
    zoom: 2,
    scrollWheelZoom: false  // Disable zooming with the scroll wheel
});
// Add a tile layer to the map (using OpenStreetMap as the source)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);
