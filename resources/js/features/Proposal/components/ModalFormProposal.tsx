import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { SelectVillage } from '@/features/Territory/components/SelectVillage'
import { enumToStringArray, swalError, swalSuccess } from '@/common/utils'
import { PriorityEnum } from '@/common/enums'
import { PageProps } from "@/types"
import { ProposalDTO } from ".."
import { FormGroup, InputType, OptionalSelect, InputError, OptionType } from '@/common/components';
import { useForm, usePage } from "@inertiajs/react"
import { useGetLocation } from "@/common/hooks"
import { CityType, DistrictType, SelectCity, SelectDistrict, VillageType } from "@/features/Territory"

export const ModalFormProposal: FC<{
    isShow: boolean,
    onClose: () => void,
}> = ({ isShow, onClose }) => {
    const { errors } = usePage<PageProps>().props
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const { data, setData, post } = useForm<ProposalDTO>()
    const { latLang } = useGetLocation()

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
        setData((prevData) => ({
            ...prevData,
            latitude: latLang.latitude,
            longitude: latLang.longitude
        }))
    }, [latLang])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prevData) => ({
            ...prevData,
            [name]: name !== "document_path" ? value : e.target.files![0]
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
        post(route('proposal.store'), {
            onSuccess: () => {
                swalSuccess('Sukses menambah usulan')
                onClose()
            },
            onError: (e) => swalError(e.error),
            forceFormData: true
        })
    }
    return (
        <>
            <Modal
                show={isShow}
                onHide={onClose}
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
                        <Button variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>Simpan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
