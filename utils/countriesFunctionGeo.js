const countries = require('./countries');
const fs = require('fs');

const cleanCountries = []

// console.log(countries)
for (country of countries.countries) {
    const name = country.properties.NAME;
    const labelX = country.properties.LABEL_X;
    const labelY = country.properties.LABEL_Y;
    cleanCountries.push({
      "type": "Feature",
      "properties": {
        "name": name
      },
      "geometry": {
        "type": "Point",
        "coordinates": [labelX, labelY]
      }})
    // console.log(name)
}

console.log(cleanCountries)

// Convert the array to JSON string
const jsonString = JSON.stringify(cleanCountries);

// Specify the file path
const filePath = 'result.json'; // Change the file name and path as needed

// Write the JSON string to a new file
fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File saved successfully!');
});