import { InputHTMLAttributes } from "react"

export const Input = ({ title, type = "text", ...props }: InputHTMLAttributes<HTMLInputElement> & { title: string }) => {
    return (
        <div className="form-group">
            <label htmlFor={title}>{title}</label>
            <input type={type} className="form-control" id={title} placeholder={title} {...props} />
        </div>
    )
}
