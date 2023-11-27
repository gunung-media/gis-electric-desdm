import { useMap } from '@/common/hooks'
import './styles.scss'
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react'
import L from 'leaflet'
import { router, useForm, usePage } from '@inertiajs/react'
import { CloseBtn, Loader, FormGroup, InputType, OptionType, OptionalSelect, InputError } from '@/common/components';
import { Modal, Button, Form, Container, Row, Col } from 'react-bootstrap'
import { ProposalDTO } from '@/features/Proposal'
import { CityType, DistrictType, SelectCity, SelectDistrict, VillageType } from '@/features/Territory'
import { SelectVillage } from '@/features/Territory/components/SelectVillage'
import { enumToStringArray, swalError, swalSuccess } from '@/common/utils'
import { PriorityEnum } from '@/common/enums'
import { PageProps } from '@/types'

export default function Proposal() {
    const { map } = useMap()
    const { errors } = usePage<PageProps>().props
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShowTracking, setIsShowTracking] = useState<boolean>(false)
    const [isShowAdd, setIsShowAdd] = useState<boolean>(false)
    const { data, setData, post } = useForm<ProposalDTO>()
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()


    const identityProposal: InputType<ProposalDTO>[] = [
        { title: 'Nama Lengkap', name: 'full_name', type: "text" },
        { title: 'Nomor Identitas', name: 'identity_number', type: "text" },
        { title: 'Email', name: 'email', type: 'email' },
        { title: 'Nomor Telepon', name: 'phone_number', type: 'number' },
        { title: 'Alamat', name: 'address', type: 'text' },
    ]

    const additionalFields: InputType<ProposalDTO>[] = [
        { title: 'Deskripsi Usulan', name: 'description', type: "text" },
        { title: 'Foto/Dokumen Pendukung', name: 'document_path', type: "file" },
        { title: 'Estimasi Biaya', name: 'estimated_cost', type: "number" },
        { title: 'Catatan Tambahan', name: 'additional_note', type: "text" },
    ]

    useEffect(() => {
        if (map) {
            L.control.zoom({
                position: 'bottomleft'
            }).addTo(map)
        }
    }, [map])

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setData((prevData) => ({
                            ...prevData,
                            latitude: position.coords.latitude.toString(),
                            longitude: position.coords.longitude.toString(),
                        }))
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, [])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prevData) => ({
            ...prevData,
            [name]: name !== "document_path" ? value : e.target.files[0]
        }))
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
        console.log(data.document_path)
        post(route('proposal.store'), {
            onSuccess: () => { swalSuccess('Sukses menambah usulan'); setIsShowAdd(false) },
            onError: (e) => swalError(e.error),
            forceFormData: true
        })
    }

    return (
        <>
            <Loader isShow={isLoading} />
            <div id="map"></div>
            <div className="header">
                <div className="header-box" onClick={() => router.visit(route('landing'))}>Silisda <span>usulan</span></div>
                <div className="header-actions">
                    <button onClick={() => setIsShowAdd(true)}>
                    </button>
                    <button>
                    </button>
                </div>
            </div>

            <Modal
                show={isShowAdd}
                onHide={() => setIsShowAdd(false)}
                backdrop="static"
                keyboard={false}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Usulan</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Container>
                            <Row>
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
                                </Col>
                                <Col>
                                    <OptionalSelect
                                        title='Jenis Usulan'
                                        defaultChoice={['Instalasi Jaringan Baru', 'Penambahan Jaringan Eksisting', 'Peningkatan Kapasitas Jaringan', 'Lainnya']}
                                        onSelected={(val) => setData('proposal_type', val)}
                                    />
                                    <InputError message={errors.proposal_type} />

                                    {additionalFields.map((val, i) => (
                                        <FormGroup
                                            key={i}
                                            title={val.title}
                                            type={val.type}
                                            onChange={handleInputChange}
                                            name={val.name}
                                            errorMsg={errors[val.name]}
                                        />
                                    ))}

                                    <OptionalSelect
                                        title='Prioritas'
                                        defaultChoice={enumToStringArray(PriorityEnum)}
                                        onSelected={(val) => setData('priority', val as PriorityEnum)}
                                    />
                                    <InputError message={errors.priority} />
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsShowAdd(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>Simpan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {
                isShowTracking && (
                    <div className="tracking">
                        <div className="header">
                            <svg width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ 'display': '' }}>
                            </svg>
                            <p>Tracking</p>
                            <CloseBtn onClick={() => setIsShowTracking(false)} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
