import { renderToString } from "react-dom/server";
import { DistrictType, getDistricts } from "..";
import L, { Point } from 'leaflet'

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
                    let offset = new Point(0, 0)
                    layer.bindTooltip(element.name, { permanent: true, direction: 'center', className: 'my-labels-village', offset: offset })
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
        return districts
    } catch (error) {
        console.log(error)
        return L.layerGroup()
    }
}
