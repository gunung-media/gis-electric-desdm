import '@/common/styles/modal.scss'
import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { SelectVillage } from '@/features/Territory/components/SelectVillage'
import { enumToStringArray, swalError, swalSuccess } from '@/common/utils'
import { PriorityEnum } from '@/common/enums'
import { FormControlElement, PageProps } from "@/types"
import { ReportDTO } from ".."
import { FormGroup, InputType, OptionalSelect, InputError, OptionType } from '@/common/components';
import { useForm, usePage } from "@inertiajs/react"
import { useGetLocation } from "@/common/hooks"
import { CityType, DistrictType, SelectCity, SelectDistrict, VillageType } from "@/features/Territory"

export const ModalFormReport: FC<{
    isShow: boolean,
    onClose: () => void,
}> = ({ isShow, onClose }) => {
    const { errors } = usePage<PageProps>().props
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()
    const { data, setData, post } = useForm<ReportDTO>()
    const { latLang } = useGetLocation()

    const identityReport: InputType<ReportDTO>[] = [
        { title: 'Nama Lengkap', name: 'full_name', type: "text" },
        { title: 'Nomor Identitas', name: 'identity_number', type: "text" },
        { title: 'Email', name: 'email', type: 'email' },
        { title: 'Nomor Telepon', name: 'phone_number', type: 'number' },
        { title: 'Alamat', name: 'address', type: 'text' },
    ]

    const additionalFields: InputType<ReportDTO>[] = [
        { title: 'Waktu Kejadian', name: 'date_happen', type: "datetime-local" },
        { title: 'Deskripsi Laporan', name: 'description', type: "text" },
        { title: 'Foto/Dokumen Pendukung', name: 'document_path', type: "file" },
    ]

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            latitude: latLang.latitude,
            longitude: latLang.longitude
        }))
    }, [latLang])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<FormControlElement>) => {
        if (typeof e !== 'string') {
            const { name, value } = (e).target
            setData((prevData) => ({
                ...prevData,
                [name]: name !== "document_path" ? value : (e as ChangeEvent<HTMLInputElement>).target.files![0]
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
        post(route('report.store'), {
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
                    <Modal.Title>Tambah Laporan</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    {identityReport.map((val, i) => (
                                        <FormGroup
                                            key={i}
                                            title={val.title}
                                            type={val.type}
                                            onChange={(e) => handleInputChange(e)}
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
                                        title='Jenis Laporan'
                                        defaultChoice={['Mati Lampu Total', 'Mati Lampu Parsial', 'Kabel Jatuh', 'Tiang Listrik Rusak', 'Gangguan Alat Ukur (Meteran)', 'Lainnya']}
                                        onSelected={(val) => setData('report_type', val)}
                                    />
                                    <InputError message={errors.report_type} />

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
