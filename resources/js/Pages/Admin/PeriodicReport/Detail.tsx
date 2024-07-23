import { DataTable, FormGroup, OptionType, RenderDownloadBtn } from "@/common/components"
import { useMap } from "@/common/hooks"
import { PeriodicReportType } from "@/features/PeriodicReport"
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { Head, router } from "@inertiajs/react"
import { useEffect, useState } from "react"
import L from "leaflet"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { electricIcon } from "@/common/utils"

export default function Detail({ data }: PageProps & { data: PeriodicReportType }) {
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
                                    <FormGroup
                                        title="Jenis Laporan"
                                        name="nik"
                                        value={data.report_type ?? ""}
                                        disabled={true}
                                    />
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <p>SK IUPTLS/IUPTLU/IUJPTL</p>
                                            <RenderDownloadBtn documentPath={data.sk_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Sertifikat Kompetensi Ketenaga Listrikan</p>
                                            <RenderDownloadBtn documentPath={data.certificate_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Dokumentasi Kondisi Pembangkit</p>
                                            <RenderDownloadBtn documentPath={data.condition_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Laporan Berkala (IUPTLS/IUPTLU/IUJPTL)</p>
                                            <RenderDownloadBtn documentPath={data.periodic_path} />
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
                        <a
                            href={route('admin.periodic-report.tracking.create', { periodic_report: data.id })}
                            type="button"
                            className="btn btn-primary btn-icon-text"
                        >
                            <i className="ti-plus btn-icon-prepend"></i>
                            Tambah
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                data={dataTable}
                                columns={column}
                                onEdit={(id) => router.visit(route('admin.periodic-report.tracking.edit', { periodic_report: data.id, tracking: id }))}
                                onDelete={(id) => router.delete(route('admin.periodic-report.tracking.destroy', { periodic_report: data.id, tracking: id }))} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
