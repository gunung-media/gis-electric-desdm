import { DataTable, FormGroup, OptionType, RenderDownloadBtn } from "@/common/components"
import { useMap } from "@/common/hooks"
import { BusinessReportType } from "@/features/BusinessReport"
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head } from "@inertiajs/react"
import { useEffect, useState } from "react"
import L from "leaflet"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { electricIcon } from "@/common/utils"

export default function Detail({ data }: PageProps & { data: BusinessReportType }) {
    const { map } = useMap()
    const [marker, setMarker] = useState<L.Marker>()
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()

    const column: string[] = [
        'Deskripsi',
        'Status',
        'Tanggal',
    ]

    const dataTable = data.trackings.map(({ id, description, status, created_at }) => ({
        id, description, status, created_at
    }))

    useEffect(() => {
        if (map) {
            const marker = L.marker((data ? [data.latitude, data.longitude] : latLangKalteng) as L.LatLngExpression, {
                draggable: true,
                icon: electricIcon
            }).addTo(map);

            map?.setView([Number(data.latitude ?? 0), Number(data.longitude ?? 0)], 7, { animate: true })

            setMarker(marker)
            return () => {
                marker.remove()
            }
        }
    }, [map])

    const handleCityChange = (e: OptionType<CityType>) => {
        setCityCode(e.value.code)
    }

    const handleDistrictChange = (e: OptionType<DistrictType>) => {
        setDistrictCode(e.value.code)
    }

    const handleVillageChange = (e: OptionType<VillageType>) => {
        setVillageCode(e.value.code)
    }
    return (
        <AuthenticatedLayout>
            <Head title="Usulan BPBL Form" />
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Map</h4>
                            <div id="map" style={{ height: "95%" }}></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="card-title d-flex justify-content-between">
                                <p>Usulan BPBL</p>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <FormGroup
                                        title="Nama Badan Usaha/Perorangan"
                                        name="name"
                                        value={data.name}
                                        disabled={true}
                                    />
                                    <FormGroup
                                        title="NIB (Nomor Induk Berusaha)"
                                        name="nik"
                                        value={data.nib}
                                        disabled={true}
                                    />
                                    <FormGroup
                                        title="NPWP"
                                        name="nik"
                                        value={data.npwp}
                                        disabled={true}
                                    />
                                    <FormGroup
                                        title="Email"
                                        name="nik"
                                        value={data.email}
                                        disabled={true}
                                    />
                                    <FormGroup
                                        title="Nomor Handphone"
                                        name="nik"
                                        value={data.phone_number}
                                        disabled={true}
                                    />
                                    <FormGroup
                                        title="Nomor Handphone"
                                        name="nik"
                                        value={data.phone_number}
                                        disabled={true}
                                    />
                                    <FormGroup
                                        title="Alamat"
                                        name="nik"
                                        value={data.address}
                                        disabled={true}
                                    />
                                    <SelectCity
                                        handleCityChange={handleCityChange}
                                        selectedCity={cityCode}
                                        disabled={true}
                                    />
                                    <SelectDistrict
                                        handleDistrictChange={handleDistrictChange}
                                        selectedCityId={cityCode}
                                        selectedDistrict={districtCode}
                                        disabled={true}
                                    />
                                    <SelectVillage
                                        handleVillageChange={handleVillageChange}
                                        selectedDistrictId={districtCode}
                                        selectedVillage={villageCode}
                                        disabled={true}
                                    />
                                    <FormGroup
                                        title="Deskripsi"
                                        name="textarea"
                                        value={data.description ?? ""}
                                        disabled={true}
                                    />
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <p>Format Permohonan SKP dan Lampiran Persyaratan s.d 500 Kw</p>
                                            <RenderDownloadBtn documentPath={data.request_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>KTP</p>
                                            <RenderDownloadBtn documentPath={data.ktp_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>NPWP</p>
                                            <RenderDownloadBtn documentPath={data.npwp_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>NIB</p>
                                            <RenderDownloadBtn documentPath={data.nib} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Diagram Satu Garis</p>
                                            <RenderDownloadBtn documentPath={data.diagram_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Lokasi instalasi termasuk tata letak (gambar situasi)</p>
                                            <RenderDownloadBtn documentPath={data.location_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Spesifikasi Teknis Pembangkit</p>
                                            <RenderDownloadBtn documentPath={data.specification_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Berita Acara Pemeriksaan (BAP)</p>
                                            <RenderDownloadBtn documentPath={data.bap_path} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex justify-content-between">
                        <p>Tracking</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => console.log(id)}
                                onDelete={(id) => console.log(id)} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
