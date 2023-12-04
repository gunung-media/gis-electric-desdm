import { theMarker } from "@/common/utils";
import { ElectricSubstationType } from "..";
import { renderToString } from "react-dom/server";
import L from "leaflet";

export const generateESLayerGroup = (electricSubstations: ElectricSubstationType[]): L.LayerGroup => {
    const esDataArray = []
    for (const esData of electricSubstations) {
        const marker = theMarker(Number(esData.latitude), Number(esData.longitude))
        marker.bindPopup(renderToString(<>
            <h5>{esData.name}</h5>
            <hr />
            <p>Kota/Kabupaten: {esData.city_name}</p>
            <p dangerouslySetInnerHTML={{ __html: esData.description ?? '-' }}></p>
        </>))
        esDataArray.push(marker)
    }
    return L.layerGroup(esDataArray)
}
