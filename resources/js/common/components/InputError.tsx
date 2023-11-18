import { HTMLAttributes } from "react"

export const InputError = ({ message, className = '', ...props }: HTMLAttributes<HTMLParagraphElement> & { message?: string }) => {
    return message && (
        <p className={`error mt-2 text-danger ${className}`} {...props}>{message}</p>
    )
}
