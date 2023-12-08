import { Form, FormControlProps } from "react-bootstrap"
import { InputError } from "./InputError"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export type InputType<T> = {
    title: string
    name: keyof T
    type: 'file' | 'text' | 'number' | 'email' | 'datetime-local' | 'textarea' | 'date'
}

export const FormGroup: FC<{
    title: string,
    onChange?: (e: ChangeEvent<HTMLInputElement> | string) => void,
    errorMsg?: string,
    name: string
} & FormControlProps> = ({ title, onChange, errorMsg, type = "text", name, ...props }) => {
    const [editorData, setEditorData] = useState<string | null | undefined>(props.value as string | null ?? '');

    useEffect(() => {
        setEditorData(props.value as string | null ?? '');
    }, [props.value]);
    return (
        <>
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
                    (
                        <Form.Control type={type} placeholder={title} onChange={onChange} {...props} name={name} />
                    )}
                <InputError message={errorMsg} />
            </Form.Group>
        </>
    )
}
