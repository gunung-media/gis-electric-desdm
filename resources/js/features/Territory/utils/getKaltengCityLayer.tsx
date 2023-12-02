import { renderToString } from "react-dom/server";
import { CityType, getCities } from "..";
import L from 'leaflet'

export const generateKaltengCityLayer = async (onBorderClick?: (city: CityType) => void, isShowPopup?: boolean): Promise<L.LayerGroup> => {
    let cities = L.layerGroup();
    try {
        const { data: { data } } = await getCities()
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            try {
                let featureCollection: GeoJSON.FeatureCollection<any> = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: JSON.parse(element.borders ?? "null"),
                            properties: {}
                        }
                    ]
                };
                let city = L.geoJson(featureCollection, {
                    style: {
                        color: 'white',
                        dashArray: '0',
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        fillColor: '#111',
                        fillOpacity: .5,
                    }
                }).addTo(cities)

                city.eachLayer(function(layer) {
                    const popUpContent = renderToString(
                        <>
                            <div>
                                <h5>Kabupaten/Kota: {element.name}</h5>
                            </div>
                        </>
                    )
                    layer.bindPopup(popUpContent)
                    layer.on('mouseover', () => {
                        layer.openPopup()
                    })
                    layer.on('click', () => {
                        if (onBorderClick)
                            onBorderClick(element)
                    })
                });
            } catch (error) {
                console.error(error)
                continue;
            }
        }
        return cities
    } catch (error) {
        console.log(error)
        return L.layerGroup()
    }
}
