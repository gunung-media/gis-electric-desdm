import { renderToString } from "react-dom/server";
import { VillageType, getKaltengVillages } from "..";
import L from 'leaflet'

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
                let village = L.geoJson(featureCollection, {
                    style: {
                        color: element.electricity?.electricity ? 'green' : 'white',
                        dashArray: '0',
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        fillColor: element.electricity?.electricity ? 'green' : '#111',
                        fillOpacity: .5,
                    }
                }).addTo(villages)

                village.eachLayer(function(layer) {
                    const popUpContent = renderToString(
                        <>
                            <div>
                                <h5>Desa: {element.name}</h5>
                                <p>Kabupaten/Kota: {element.city.name}</p>
                                <p>Kecamatan: {element.district.name}</p>
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
        return villages
    } catch (error) {
        console.log(error)
        return L.layerGroup()
    }
}
