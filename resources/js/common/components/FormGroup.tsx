import { Form, FormControlProps } from "react-bootstrap"
import { InputError } from "./InputError"
import { ChangeEvent, FC } from "react"

export type InputType<T> = {
    title: string
    name: keyof T
    type: 'file' | 'text' | 'number' | 'email'
}

export const FormGroup: FC<{
    title: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    errorMsg?: string,
    name: string
} & FormControlProps> = ({ title, onChange, errorMsg, type = "text", name, ...props }) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{title}</Form.Label>
                <Form.Control type={type} placeholder={title} onChange={onChange} {...props} name={name} />
                <InputError message={errorMsg} />
            </Form.Group>
        </>
    )
}
