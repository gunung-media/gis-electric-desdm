import { FC, HTMLAttributes } from "react"
import { Form, InputGroup } from "react-bootstrap"

export const BootstrapInputGroup: FC<{
    title: string,
    value?: string | null,
    disabled: boolean
} & HTMLAttributes<HTMLDivElement>> = ({ title, value, disabled = true, ...props }) => {
    return (
        <InputGroup {...props}>
            <InputGroup.Text id={title}>{title}</InputGroup.Text>
            <Form.Control
                value={value ?? '-'}
                disabled={disabled}
            />
        </InputGroup>
    )
}
