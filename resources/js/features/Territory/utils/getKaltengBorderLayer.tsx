import { renderToString } from "react-dom/server";
import { getKaltengVillages } from "..";
import L from 'leaflet'

export const generateKaltengVillageLayer = async (): Promise<L.LayerGroup> => {
    let villages = L.layerGroup();
    try {
        const { data: { data } } = await getKaltengVillages()
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            try {
                let featureCollection: GeoJSON.FeatureCollection<any> = {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [JSON.parse(element.borders ?? "[]")]
                            },
                            properties: {}
                        }
                    ]
                };
                let village = L.geoJson(featureCollection, {
                    style: {
                        color: element.electricity?.electricity ? 'green' : 'white',
                        dashArray: '1',
                        lineCap: 'butt',
                        lineJoin: 'miter',
                        fillColor: element.electricity?.electricity ? 'green' : '#111',
                        fillOpacity: 0.1,
                    }
                }).addTo(villages)

                village.eachLayer(function(layer) {
                    layer.bindPopup(renderToString(
                        <>
                            <div>
                                <h5>Desa: {element.name}</h5>
                                <p>Kabupaten/Kota: {element.city.name}</p>
                                <p>Kecamatan: {element.district.name}</p>
                                <hr />
                                <p>Kelistrikan: {element.electricity?.electricity ? 'Berlistrik' : '-'}</p>
                                <p>Jumlah KK Berlistrik: {element.electricity?.households_with_electricity ?? '-'}</p>
                                <p>Jumlah KK Tidak Berlistrik: {element.electricity?.households_without_electricity ?? '-'}</p>
                                <p>Jumlah Jaringan: {element.electricity?.network_length ?? '-'}</p>
                                <p>Potensi Desa: {element.electricity?.village_potential ?? '-'}</p>
                            </div>
                        </>
                    ));
                });
            } catch (error) {
                continue;
            }
        }
        return villages
    } catch (error) {
        console.log(error)
        return L.layerGroup()
    }
}
