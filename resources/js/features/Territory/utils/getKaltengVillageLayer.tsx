import { VillageType, getKaltengVillages } from "..";
import L, { Point } from 'leaflet'

export const generateKaltengVillageLayer = async (districtId: string | number, onBorderClick?: (village: VillageType) => void, isShowPopup?: boolean): Promise<L.LayerGroup> => {
    let villages = L.layerGroup();
    try {
        const { data: { data } } = await getKaltengVillages(districtId)
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

                const villageColor = element?.electricity?.households_with_electricity > element.electricity?.households_with_electricity_non_pln ? 'green' : 'blue'
                let village = L.geoJson(featureCollection, {
                    style: {
                        color: element.electricity?.electricity ? villageColor : 'white',
                        dashArray: '0',
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        fillColor: element.electricity?.electricity ? villageColor : '#111',
                        fillOpacity: .5,
                    }
                }).addTo(villages)

                village.eachLayer(function(layer) {
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
        return villages
    } catch (error) {
        console.log(error)
        return L.layerGroup()
    }
}
