import { renderToString } from "react-dom/server";
import { DistrictType, getCities, getDistricts } from "..";
import L from 'leaflet'

export const generateKaltengDistrictLayer = async (cityId: string | number, onBorderClick?: (district: DistrictType) => void, isShowPopup?: boolean): Promise<L.LayerGroup> => {
    let districts = L.layerGroup();
    try {
        const { data: { data } } = await getDistricts(cityId)
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
                }).addTo(districts)

                city.eachLayer(function(layer) {
                    layer.on('click', () => {
                        if (onBorderClick)
                            onBorderClick(element)
                    })
                    const popUpContent = renderToString(
                        <>
                            <div>
                            </div>
                        </>
                    )
                    if (isShowPopup) {
                        layer.bindPopup(popUpContent)
                    }
                });
            } catch (error) {
                console.error(error)
                continue;
            }
        }
        return districts
    } catch (error) {
        console.log(error)
        return L.layerGroup()
    }
}
