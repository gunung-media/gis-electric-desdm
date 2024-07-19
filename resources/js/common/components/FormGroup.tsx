import { Form, FormControlProps, Row } from "react-bootstrap"
import { InputError } from "./InputError"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export type InputType<T> = {
    title: string
    name: keyof T
    type: 'file' | 'text' | 'number' | 'email' | 'datetime-local' | 'textarea' | 'date'
    templateUrl?: string
    isSelect?: boolean
    selectOptions?: string[],
    dependedOnKey?: keyof T,
    dependedValue?: string[],
}

export const FormGroup: FC<{
    title: string,
    onChange?: (e: ChangeEvent<HTMLInputElement> | string | ChangeEvent<HTMLSelectElement>) => void,
    errorMsg?: string,
    name: string,
    templateUrl?: string,
    isSelect?: boolean,
    selectOptions?: string[],
    dependedOnKey?: string,
    dependedValue?: string[],
} & FormControlProps> = ({ title, onChange, errorMsg, type = "text", name, templateUrl, isSelect = false, selectOptions = [], dependedValue, dependedOnKey, ...props }) => {
    const [editorData, setEditorData] = useState<string | null | undefined>(props.value as string | null ?? '');
    const [shouldHide, setShouldHide] = useState<boolean>(false)

    useEffect(() => {
        setEditorData(props.value as string | null ?? '');
    }, [props.value]);


    useEffect(() => {
        if (dependedOnKey && dependedValue) {
            const intervalId = setInterval(() => {
                let dependedEl = document.querySelector(`select[name='${dependedOnKey}']`) as HTMLInputElement;
                if (dependedValue.includes(dependedEl?.value)) {
                    setShouldHide(false)
                }
                else {
                    setShouldHide(true)
                }
            }, 10);
            return () => clearInterval(intervalId);
        }
    }, []);
    return (
        <>
            {
                !shouldHide &&
                <Form.Group className="mb-3">
                    <Form.Label>{title}</Form.Label>
                    {type === 'textarea' ? (
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorData}
                            config={{
                                toolbar: props.disabled ? [] : {
                                    items: [
                                        'undo', 'redo',
                                        '|', 'heading',
                                        '|', 'bold', 'italic',
                                        '|', 'link', 'uploadImage', 'blockQuote',
                                        '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                                    ],
                                    shouldNotGroupWhenFull: false
                                }
                            }}
                            onChange={(_event, editor) => {
                                const data = editor.getData();
                                if (onChange)
                                    onChange(data)
                            }}
                            disabled={props.disabled}
                        />
                    ) :
                        (<>
                            <Row>
                                <div className="col-12">
                                    {isSelect ?
                                        <select name={name} id={name} className="form-control" onChange={onChange}>
                                            {selectOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                        :
                                        <Form.Control type={type} placeholder={title} onChange={onChange} {...props} name={name} />
                                    }
                                </div>
                                <div className="col-12">
                                    {templateUrl ?
                                        (
                                            <a href={templateUrl} target="_blank">Download Format Surat</a>
                                        ) : null
                                    }
                                </div>
                            </Row>
                        </>
                        )}
                    <InputError message={errorMsg} />
                </Form.Group>
            }
        </>
    )
}
