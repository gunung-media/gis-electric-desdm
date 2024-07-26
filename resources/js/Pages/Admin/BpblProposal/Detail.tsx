import { DataTable, FormGroup, OptionType, RenderDownloadBtn } from "@/common/components"
import { useMap } from "@/common/hooks"
import { BpblProposalDTO, BpblProposalType } from "@/features/BpblProposal"
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { FormControlElement, PageProps } from "@/types"
import { Head, router, useForm } from "@inertiajs/react"
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react"
import L from "leaflet"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { electricIcon, swalError, swalSuccess } from "@/common/utils"

export default function Detail({ data }: PageProps & { data: BpblProposalType }) {
    const { map } = useMap()
    const [marker, setMarker] = useState<L.Marker>()
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const { data: dto, setData, put } = useForm<BpblProposalDTO>()

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
            full_name,
            identity_number,
            email,
            phone_number,
            address,
            latitude,
            longitude,
            description,
        } = data
        setVillageCode(village_code)
        setDistrictCode(districtCode)
        setCityCode(city_code)
        setData(() => ({
            ...dto,
            full_name,
            identity_number,
            email,
            phone_number,
            village_code,
            address,
            latitude,
            longitude,
            description
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
        setData('village_code', e.value.code.toString())
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        put(route('admin.bpbl-proposal.update', { bpbl_proposal: data.id }), {
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
                                        title="Nama Pelapor"
                                        name="full_name"
                                        value={dto.full_name}
                                        onChange={(e) => setData("full_name", (e as ChangeEvent<FormControlElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="NIK"
                                        name="identity_number"
                                        value={dto.identity_number}
                                        onChange={(e) => setData("identity_number", (e as ChangeEvent<FormControlElement>).target.value)}
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
                                        title="Surat pernyataan siap menerima BPBL"
                                        name="statement_path"
                                        type="file"
                                        onChange={(e) => setData("statement_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.statement_path} />
                                    <FormGroup
                                        title="KTP"
                                        name="ktp_path"
                                        type="file"
                                        onChange={(e) => setData("ktp_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.ktp_path} />

                                    <FormGroup
                                        title="Foto Rumah"
                                        name="house_path"
                                        type="file"
                                        onChange={(e) => setData("house_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.house_path} />
                                    <FormGroup
                                        title="Foto Jaringan Terdekat"
                                        name="nearest_path"
                                        type="file"
                                        onChange={(e) => setData("nearest_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.nearest_path} />

                                    <FormGroup
                                        title="Surat Pernyataan Tidak Mampu/Usulan Dari Kepala Desa/Lurah"
                                        name="letter_path"
                                        type="file"
                                        onChange={(e) => setData("letter_path", (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                                    />
                                    <RenderDownloadBtn documentPath={data.letter_path} />

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
                                onEdit={(id) => router.visit(route('admin.bpbl-proposal.tracking.edit', { bpbl_proposal: data.id, tracking: id }))}
                                onDelete={(id) => router.delete(route('admin.bpbl-proposal.tracking.destroy', { bpbl_proposal: data.id, tracking: id }))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
