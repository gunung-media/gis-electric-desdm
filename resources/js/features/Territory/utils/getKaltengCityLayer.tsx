import { CityType, getCities } from "..";
import L, { Point } from 'leaflet'

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
                        color: 'black',
                        dashArray: '0',
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        fillColor: '#111',
                        fillOpacity: .5,
                    }
                }).addTo(cities)

                city.eachLayer(function(layer) {
                    let offset = new Point(0, 0)
                    switch (element.name) {
                        case 'KOTAWARINGIN TIMUR':
                            offset = new Point(-70, -200)
                            break;

                        case 'KATINGAN':
                            offset = new Point(20, -200)
                            break;

                        case 'KOTAWARINGIN BARAT':
                            offset = new Point(50, -100)
                            break;

                        case 'KAPUAS':
                            offset = new Point(20, -250)
                            break;

                        default:
                            break;
                    }
                    layer.bindTooltip(element.name, { permanent: true, direction: 'center', className: 'my-labels', offset: offset })
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
