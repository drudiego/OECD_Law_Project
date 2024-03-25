
console.log(data)
// console.log(countryCount)

// Create a map centered at a specific location and with an initial zoom level
var mymap = L.map('map', {
    center: [15, 0],
    zoom: 2,
    scrollWheelZoom: false  // Disable zooming with the scroll wheel
});
// Add a tile layer to the map (using OpenStreetMap as the source)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);


    // Iterate over the countryCount data
    countryCount.forEach(country => {
      // Check if the count is greater than zero
      const countryName = country._id.slice(5)
      console.log(countryName)
      data.forEach(item => {
        // console.log(item)
        if (item.properties.name === countryName) {
          // Add marker on the map at the centroid
          
          //OPTION 1, USING CIRCLE MARKERS
          const circleMarker = L.circleMarker(item.geometry.coordinates.reverse(), {
            color: '#0454bd', // Set the color of the circle marker
            fillColor: '#0454bd', // Set the fill color of the circle marker
            fillOpacity: 1, // Set the opacity of the fill color
            radius: 8 // Set the radius of the circle marker
          }).addTo(mymap);

          circleMarker.bindTooltip(country.count.toString(), {
            permanent: true, // Make the tooltip permanent
            direction: 'center', // Center the tooltip inside the circle
            className: 'custom-tooltip' // Add a custom CSS class for styling
          });

          
          //OPTION 2, USING PINPOINTS WITH DIALOG BALLONS SHOWING COUNT AND COUNTRY NAMES:
          // L.marker(item.geometry.coordinates.reverse()) // Reverse coordinates for Leaflet
          //   .bindTooltip(country._id + ": " + country.count)
          //   .addTo(mymap);
        }
      })
    });



    //   for (let item of data.countries) {
    //     console.log(item.properties.name)
    //     if (data.countries[item].properties.name === countryName) {
            
    //       // Add marker on the map at the centroid
    //       L.marker(data[item].geometry.coordinates.reverse())
    //         .bindTooltip(country._id + ": " + country.count)
    //         .addTo(mymap);
    //     }
    //   })
        // Find the geometry of the country from the GeoJSON data
        // const countryData = data.find(item => item.properties.name === country._id.slice(3,-1));
        // console.log(countryData)
        // if (countryGeometry) {
        //   // Get the centroid of the country geometry
        // //   const centroid = getCentroid(countryGeometry.geometry.coordinates);
          
        //   // Add marker on the map at the centroid
        //   L.marker(centroid.reverse())
        //     .bindTooltip(country._id + ": " + country.count)
        //     .addTo(map);
        // }
    // });
  

//   console.log(countryCount)
//   .catch(error => console.error('Error loading GeoJSON:', error));
