import { CityType, getCities } from "..";
import L, { Point } from 'leaflet'

export const generateKaltengCityLayer = async (onBorderClick?: (city: CityType) => void, isShowPopup?: boolean): Promise<L.LayerGroup> => {
    let cities = L.layerGroup();
    try {
        const { data: { data } } = await getCities()
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            try {
                const geometry = JSON.parse(element.borders ?? 'null') as { type: string, coordinates: number[] }
                let featureCollection: GeoJSON.FeatureCollection<any> = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: geometry.type,
                                coordinates: geometry.type === 'MultiPolygon' ? geometry.coordinates.reverse() : geometry.coordinates
                            },
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
                    layer.bindTooltip(element.name, { permanent: true, direction: 'center', className: 'my-labels' })
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
