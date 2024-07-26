import { DataTable, FormGroup, OptionType, RenderDownloadBtn } from "@/common/components"
import { useMap } from "@/common/hooks"
import { BusinessReportDTO, BusinessReportType } from "@/features/BusinessReport"
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { FormControlElement, PageProps } from "@/types"
import { Head, useForm } from "@inertiajs/react"
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react"
import L from "leaflet"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { electricIcon, swalError, swalSuccess } from "@/common/utils"

export default function Detail({ data }: PageProps & { data: BusinessReportType }) {
    const { map } = useMap()
    const [marker, setMarker] = useState<L.Marker>()
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const { data: dto, setData, put } = useForm<BusinessReportDTO>()

    const column: string[] = [
        'Deskripsi',
        'Status',
        'File',
        'Tanggal',
    ]

    const dataTable = data.trackings.map(({ id, description, status, file_path, created_at }) => ({
        id, description, status, created_at, file_path: (<RenderDownloadBtn documentPath={file_path} />)
    }))

    useEffect(() => {
        const {
            village: {
                code: village_code,
                district: {
                    code: districtCode,
                    city_code,
                }
            },
            name,
            nib,
            npwp,
            email,
            phone_number,
            latitude,
            longitude,
            address,
            description
        } = data
        setVillageCode(village_code)
        setDistrictCode(districtCode)
        setCityCode(city_code)
        setData(() => ({
            ...dto,
            name,
            nib,
            npwp,
            email,
            phone_number,
            address,
            description,
            village_code
        }))
    }, [])

    useEffect(() => {
        if (map) {
            const marker = L.marker((data ? [data.latitude, data.longitude] : latLangKalteng) as L.LatLngExpression, {
                draggable: true,
                icon: electricIcon
            }).addTo(map);

            map?.setView([Number(data.latitude ?? 0), Number(data.longitude ?? 0)], 7, { animate: true })

            marker.on('dragend', function () {
                const position = marker.getLatLng();
                setData(data => ({ ...data, latitude: position.lat, longitude: position.lng }))
            });

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

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        put(route('member.business-report.update', { business_report: data.id }), {
            onError: (e) => {
                swalError(e.error)
            },
            onSuccess: () => {
                swalSuccess('Sukses Mengedit')
            }
        })
    }
    const handleLatLangChange = (name: 'latitude' | 'longitude', val: string) => {
        try {
            setData(name, val)
            if (!map || !marker) return
            let latLang
            if (name === 'latitude') {
                latLang = [Number(val), Number(dto.latitude)] as L.LatLngExpression
            } else {
                latLang = [Number(dto.longitude), Number(val)] as L.LatLngExpression
            }
            map.setView(latLang)
            marker.setLatLng(latLang)
        } catch (error) {
            return
        }
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
                                        value={dto.name}
                                        onChange={(e) => setData("name", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="NIB (Nomor Induk Berusaha)"
                                        name="nik"
                                        value={dto.nib}
                                        onChange={(e) => setData("nib", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="NPWP"
                                        name="npwp"
                                        value={dto.npwp}
                                        onChange={(e) => setData("npwp", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="Email"
                                        name="email"
                                        value={dto.email}
                                        onChange={(e) => setData("email", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="Nomor Handphone/WA"
                                        name="phone_number"
                                        value={dto.phone_number}
                                        onChange={(e) => setData("phone_number", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="Alamat"
                                        name="address"
                                        value={dto.address}
                                        onChange={(e) => setData("address", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <SelectCity
                                        handleCityChange={handleCityChange}
                                        selectedCity={cityCode}
                                    />
                                    <SelectDistrict
                                        handleDistrictChange={handleDistrictChange}
                                        selectedCityId={cityCode}
                                        selectedDistrict={districtCode}
                                    />
                                    <SelectVillage
                                        handleVillageChange={handleVillageChange}
                                        selectedDistrictId={districtCode}
                                        selectedVillage={villageCode}
                                    />
                                    <FormGroup
                                        title="Latitude"
                                        name="latitude"
                                        value={dto.latitude ?? ""}
                                        onChange={(e) => handleLatLangChange("latitude", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="Longitude"
                                        name="longitude"
                                        value={dto.longitude ?? ""}
                                        onChange={(e) => handleLatLangChange("longitude", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="Deskripsi"
                                        name="description"
                                        value={dto.description ?? ""}
                                        onChange={(e) => setData("description", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />

                                    <FormGroup
                                        title="Format Permohonan SKP dan Lampiran Persyaratan s.d 500 Kw"
                                        name="request_path"
                                        type="file"
                                        onChange={(e) => setData("request_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.request_path} />

                                    <FormGroup
                                        title="KTP"
                                        name="ktp_path"
                                        type="file"
                                        onChange={(e) => setData("ktp_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.ktp_path} />

                                    <FormGroup
                                        title="NPWP"
                                        name="npwp_path"
                                        type="file"
                                        onChange={(e) => setData("npwp_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.npwp_path} />

                                    <FormGroup
                                        title="NIB"
                                        name="nib_path"
                                        type="file"
                                        onChange={(e) => setData("nib_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.nib_path} />

                                    <FormGroup
                                        title="Diagram Satu Garis"
                                        name="diagram_path"
                                        type="file"
                                        onChange={(e) => setData("diagram_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.diagram_path} />

                                    <FormGroup
                                        title="Lokasi instalasi termasuk tata letak (gambar situasi)"
                                        name="location_path"
                                        type="file"
                                        onChange={(e) => setData("location_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.location_path} />

                                    <FormGroup
                                        title="Spesifikasi Teknis Pembangkit"
                                        name="specification_path"
                                        type="file"
                                        onChange={(e) => setData("specification_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.specification_path} />

                                    <FormGroup
                                        title="Berita Acara Pemeriksaan (BAP)"
                                        name="bap_path"
                                        type="file"
                                        onChange={(e) => setData("bap_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.bap_path} />

                                    <button type="submit" className="btn btn-primary mt-2 w-100" onClick={handleSubmit}>Submit</button>
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
