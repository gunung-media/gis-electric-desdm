import { TerritoryType } from "@/features/Territory"
import ReactSelect, { Props } from "react-select"

export type OptionType<T> = {
    value: T
    label: string
}

export const Select = ({ title, data, ...props }: Props & { title: string, data: TerritoryType[] }) => {
    const option: OptionType[] = data.map((val) => ({ value: val, label: val.name }))
    return (
        <div className="form-group">
            <label htmlFor={title}>{title}</label>
            <ReactSelect {...props} id={title} options={option} />
        </div>
    )
}
