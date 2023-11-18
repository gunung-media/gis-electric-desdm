import { InputHTMLAttributes } from "react"

export const InputGroup = ({ title, icon, type = "text", ...props }: InputHTMLAttributes<HTMLInputElement> & { title: string, icon: string }) => {
    return (
        <>
            <label htmlFor={title}>{title}</label>
            <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                    <span className="input-group-text bg-transparent border-right-0">
                        <i className={icon + " text-primary"}></i>
                    </span>
                </div>
                <input type={type} className="form-control form-control-lg border-left-0" placeholder={title} id={title} {...props} />
            </div>
        </>
    )
}
