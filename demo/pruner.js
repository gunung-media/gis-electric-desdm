const fs = require('fs')
const filePath = './indonesia_villages_border.geojson'
const newFilePath = './kalimantan_tengah_villages.geojson'

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  try {
    const geoJsonData = JSON.parse(data);
    const kalimantanVillages = geoJsonData.filter((geojson) => geojson.province === "KALIMANTAN TENGAH")

    const newDataToWrite = JSON.stringify({
      type: 'FeatureCollection',
      features: kalimantanVillages,
    }, null, 2);

    fs.writeFile(newFilePath, newDataToWrite, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing the new file:', writeErr);
        return;
      }
      console.log('Filtered data has been written to kalimantan_villages.geojson successfully!');
    });
  } catch (parseError) {
    console.error('Error parsing GeoJSON:', parseError);
  }
});
