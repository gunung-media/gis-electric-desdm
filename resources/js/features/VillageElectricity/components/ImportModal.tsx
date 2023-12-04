import { FormGroup } from "@/common/components"
import { swalError, swalSuccess } from "@/common/utils"
import { PageProps } from "@/types"
import { useForm, usePage } from "@inertiajs/react"
import { error } from "console"
import { ChangeEvent, FC, FormEventHandler } from "react"
import { Button, Form, Modal } from "react-bootstrap"

type ImportModalProps = {
    isShow: boolean
    onClose: () => void
}

export const ImportModal: FC<ImportModalProps> = ({ isShow, onClose }) => {
    const { setData, post } = useForm<{
        file: File
    }>()
    const { errors, assets } = usePage<PageProps>().props

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route('admin.import.village_electricity'), {
            onError: (e) => {
                swalError(e.error)
            },
            onSuccess: () => {
                swalSuccess('Sukses Mengimport')
                onClose()
            }
        })
    }

    return (
        <>
            <Modal
                show={isShow}
                onHide={onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Import Data</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <FormGroup
                            title="Import File"
                            name="file"
                            type="file"
                            onChange={(e) => setData('file', (e as ChangeEvent<HTMLInputElement>).target.files![0])}
                            errorMsg={errors.file}
                        />
                        <label htmlFor=""><a href={`${assets}/FormatImport.xlsx`} target="blank">Unduh Format</a></label>
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
