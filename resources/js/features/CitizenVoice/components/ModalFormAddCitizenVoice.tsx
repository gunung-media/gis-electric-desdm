import '@/common/styles/modal.scss'
import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { SelectVillage } from '@/features/Territory/components/SelectVillage'
import { electricIcon, enumToStringArray, swalError, swalSuccess } from '@/common/utils'
import { PriorityEnum } from '@/common/enums'
import { FormControlElement, PageProps } from "@/types"
import { FormGroup, InputType, OptionalSelect, InputError, OptionType } from '@/common/components';
import { useForm, usePage } from "@inertiajs/react"
import { useGetLocation, useMap } from "@/common/hooks"
import { CityType, DistrictType, SelectCity, SelectDistrict, VillageType } from "@/features/Territory"
import L from 'leaflet'
import latLangKalteng from '@/common/constants/latLangKalteng'
import { ProposalDTO } from '@/features/Proposal'
import { ReportDTO } from '@/features/Report'
import { BpblProposalDTO } from '@/features/BpblProposal'
import { BusinessReportDTO } from '@/features/BusinessReport'
import { PeriodicReportDTO } from '@/features/PeriodicReport'
import { GuideType } from '@/features/Guide'
import { getGuide } from '@/features/Guide/api'

export const ModalFormAddCitizenVoice: FC<{
    isShow: boolean,
    onClose: () => void,
    additionalFields: InputType<ProposalDTO>[] | InputType<ReportDTO>[] | InputType<BpblProposalDTO>[] | InputType<BusinessReportDTO>[] | InputType<PeriodicReportDTO>[],
    route: string,
    title: string
    isProposal: boolean,
    isWithJenisLaporan: boolean,
    isWithPriority: boolean,
    overrideIdentityProposal?: InputType<ProposalDTO | ReportDTO>[] | InputType<BpblProposalDTO>[] | InputType<BusinessReportDTO>[] | InputType<PeriodicReportDTO>[]
    mapId: string
}> = ({ isShow, onClose, additionalFields, route, title, isProposal, isWithJenisLaporan, isWithPriority, overrideIdentityProposal, mapId }) => {
    const { errors } = usePage<PageProps>().props
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const { data, setData, post } = useForm<ProposalDTO | ReportDTO>()
    const { map, setMap } = useMap(mapId)
    const { latLang, setLatLang } = useGetLocation()
    const [marker, setMarker] = useState<L.Marker>()
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [guide, setGuide] = useState<GuideType>()
    const getGuideData = async () => {
        const { data } = await getGuide()
        setGuide(data.data)
    }

    useEffect(() => {
        getGuideData()
    }, [])


    const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTermsChecked(event.target.checked);
    };

    const handleShowTermsModal = () => {
        setShowTermsModal(true);
    };

    const handleCloseTermsModal = () => {
        setShowTermsModal(false);
    };

    const identityProposal: InputType<ProposalDTO | ReportDTO>[] | InputType<BpblProposalDTO>[] | InputType<BusinessReportDTO>[] | InputType<PeriodicReportDTO>[] = overrideIdentityProposal ?? [
        { title: 'Nama Lengkap', name: 'full_name', type: "text" },
        { title: 'NIK', name: 'identity_number', type: "text" },
        { title: 'Email', name: 'email', type: 'email' },
        { title: 'Nomor Handphone/WA', name: 'phone_number', type: 'number' },
    ]

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            latitude: latLang.latitude,
            longitude: latLang.longitude
        }))

        if (map) {
            const curLatLang = (latLang ? [Number(latLang.latitude), Number(latLang.longitude)] : latLangKalteng) as L.LatLngExpression
            const marker = L.marker(curLatLang, {
                draggable: true,
                icon: electricIcon
            }).addTo(map);
            map.setView([Number(latLang.latitude), Number(latLang.longitude)])

            marker.on('dragend', function () {
                const position = marker.getLatLng();
                setLatLang({
                    latitude: position.lat.toString(),
                    longitude: position.lng.toString()
                })
                setData((data) => ({
                    ...data,
                    latitude: position.lat.toString(),
                    longitude: position.lng.toString(),
                }))
            });
            setMarker(marker)

            return () => {
                marker.remove()
            }
        }
    }, [latLang])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<FormControlElement>) => {
        if (typeof e !== 'string') {
            const { name, value } = (e).target
            setData((prevData) => ({
                ...prevData,
                [name]: !value.includes('C:\\fakepath') ? value : (e as ChangeEvent<HTMLInputElement>).target.files![0]
            }))
        }
    }

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
        post(route, {
            onSuccess: () => {
                swalSuccess(`Sukses menambah ${title}`)
                onClose()
            },
            onError: (e) => swalError(e.error),
            forceFormData: true
        })
    }

    const handleLatLangChange = (name: 'latitude' | 'longitude', val: string) => {
        try {
            setData(name, val)
            if (!map || !marker) return
            let latLang
            if (name === 'latitude') {
                latLang = [Number(val), Number(data.latitude)] as L.LatLngExpression
            } else {
                latLang = [Number(data.longitude), Number(val)] as L.LatLngExpression
            }

            setLatLang(data => ({
                ...data,
                [name]: val
            }))
            map.setView(latLang)
            marker.setLatLng(latLang)
        } catch (error) {
            return
        }
    }
    return (
        <>
            <Modal
                show={isShow}
                onHide={onClose}
                keyboard={false}
                fullscreen={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah {title}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    <div id={mapId} style={{ height: "95%" }}></div>
                                </Col>
                                <Col>
                                    {identityProposal.map((val, i) => (
                                        <FormGroup
                                            key={i}
                                            title={val.title}
                                            type={val.type}
                                            onChange={handleInputChange}
                                            name={val.name}
                                            errorMsg={errors[val.name]}
                                        />
                                    ))}
                                    <SelectCity handleCityChange={handleCityChange} />
                                    <SelectDistrict handleDistrictChange={handleDistrictChange} selectedCityId={cityCode} />
                                    <SelectVillage handleVillageChange={handleVillageChange} selectedDistrictId={districtCode} />
                                    <InputError message={errors.village_code} />
                                    <FormGroup
                                        title="Latitude"
                                        type="number"
                                        name="latitude"
                                        value={latLang.latitude ?? ""}
                                        onChange={(e) => handleLatLangChange('latitude', (e as ChangeEvent<HTMLInputElement>).target.value)}
                                    />
                                    <FormGroup
                                        title="Longitude"
                                        type="number"
                                        name="longitude"
                                        value={latLang.longitude ?? ""}
                                        onChange={(e) => handleLatLangChange('longitude', (e as ChangeEvent<HTMLInputElement>).target.value)}
                                    />
                                </Col>
                                <Col>
                                    {isProposal ? (
                                        <>
                                            <OptionalSelect
                                                title='Jenis Usulan'
                                                defaultChoice={['Instalasi Jaringan Baru', 'Penambahan Jaringan Eksisting', 'Peningkatan Kapasitas Jaringan', 'Lainnya']}
                                                // @ts-ignore
                                                onSelected={(val) => setData('proposal_type', val)}
                                            />
                                            <InputError message={errors.proposal_type} />
                                        </>
                                    ) : isWithJenisLaporan ? (
                                        <>
                                            <OptionalSelect
                                                title='Jenis Laporan'
                                                defaultChoice={['Mati Lampu Total', 'Mati Lampu Parsial', 'Kabel Jatuh', 'Tiang Listrik Rusak', 'Gangguan Alat Ukur (Meteran)', 'Lainnya']}
                                                // @ts-ignore
                                                onSelected={(val) => setData('report_type', val)}
                                            />
                                            <InputError message={errors.report_type} />
                                        </>
                                    ) : <></>}

                                    {additionalFields.map((val, i) => (
                                        <FormGroup
                                            key={i}
                                            title={val.title}
                                            type={val.type}
                                            onChange={handleInputChange}
                                            name={val.name as string}
                                            errorMsg={errors[val.name as string]}
                                            templateUrl={val.templateUrl}
                                            isSelect={val.isSelect}
                                            selectOptions={val.selectOptions}
                                            dependedOnKey={val.dependedOnKey}
                                            dependedValue={val.dependedValue}
                                            infoText={val.infoText}
                                        />
                                    ))}

                                    {isWithPriority && (
                                        <>
                                            <OptionalSelect
                                                title='Prioritas'
                                                defaultChoice={enumToStringArray(PriorityEnum)}
                                                onSelected={(val) => setData('priority', val as PriorityEnum)}
                                            />
                                            <InputError message={errors.priority} />
                                        </>
                                    )}

                                </Col>
                            </Row>
                            <Form.Check
                                type="checkbox"
                                label={<span>Saya menyetujui<a href="#" onClick={handleShowTermsModal}> Syarat dan kondisi</a> yang berlaku.</span>}
                                checked={isTermsChecked}
                                onChange={handleTermsChange}
                            />
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>Simpan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={showTermsModal} onHide={handleCloseTermsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p dangerouslySetInnerHTML={{ __html: guide?.terms_and_condition ?? 'Saya Mensetujui ' }}></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTermsModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
