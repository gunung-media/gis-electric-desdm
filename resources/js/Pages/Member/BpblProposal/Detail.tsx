import { DataTable, FormGroup, OptionType, RenderDownloadBtn } from "@/common/components"
import { useMap } from "@/common/hooks"
import { BpblProposalDTO, BpblProposalType } from "@/features/BpblProposal"
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory"
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout"
import { FormControlElement, PageProps } from "@/types"
import { Head, useForm } from "@inertiajs/react"
import { ChangeEvent, useEffect, useState } from "react"
import L from "leaflet"
import latLangKalteng from "@/common/constants/latLangKalteng"
import { electricIcon } from "@/common/utils"

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
        'Tanggal',
    ]

    const dataTable = data.trackings.map(({ id, description, status, created_at }) => ({
        id, description, status, created_at
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

    const handleFormGroupChange = (name: keyof BpblProposalDTO, e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<FormControlElement>, isNumber: boolean = false) => {
        if (typeof e === 'string') {
            setData(name, e)
        } else {
            setData(name, isNumber ? Number(e.target.value) : e.target.value)
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
                                        name="name"
                                        value={data.full_name}
                                    />
                                    <FormGroup
                                        title="NIK"
                                        name="nik"
                                        value={data.identity_number}
                                    />
                                    <FormGroup
                                        title="Email"
                                        name="email"
                                        value={data.email}
                                    />
                                    <FormGroup
                                        title="Nomor Handphone/WA"
                                        name="phone_number"
                                        value={data.phone_number}
                                    />
                                    <FormGroup
                                        title="Alamat"
                                        name="address"
                                        value={data.address}
                                    />
                                    <SelectCity
                                        handleCityChange={handleCityChange}
                                        selectedCity={cityCode}
                                    />
                                    <SelectDistrict
                                        handleDistrictChange={handleDistrictChange}
                                        selectedCityId={cityCode}
                                    />
                                    <SelectVillage
                                        handleVillageChange={handleVillageChange}
                                        selectedDistrictId={districtCode}
                                        selectedVillage={villageCode}
                                    />
                                    <FormGroup
                                        title="Deskripsi"
                                        name="description"
                                        value={data.description ?? ""}
                                    />
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <p>Surat pernyataan siap menerima BPBL</p>
                                            <RenderDownloadBtn documentPath={data.statement_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>KTP</p>
                                            <RenderDownloadBtn documentPath={data.ktp_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Foto Rumah</p>
                                            <RenderDownloadBtn documentPath={data.house_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Foto Jaringan Terdekat</p>
                                            <RenderDownloadBtn documentPath={data.nearest_path} />
                                        </div>
                                        <div className="col-md-4 mb-3">
                                            <p>Surat Pernyataan Tidak Mampu/Usulan Dari Kepala Desa/Lurah</p>
                                            <RenderDownloadBtn documentPath={data.letter_path} />
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
