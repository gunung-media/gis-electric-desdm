import { TerritoryType } from "@/features/Territory"
import { useEffect, useState } from "react"
import ReactSelect, { Props } from "react-select"

export type OptionType<T> = {
    value: T
    label: string
}

export const Select = ({ title, data, selectedId, ...props }: Props & { title: string, data: TerritoryType[], selectedId?: number, }) => {
    const option: OptionType[] = data.map((val) => ({ value: val, label: val.name }))
    const [defaultValue, setDefaultValue] = useState<OptionType>()
    useEffect(() => {
        const label = data.filter(val => val.code == selectedId)[0]?.name;
        setDefaultValue({
            value: selectedId,
            label: label
        })
        console.log(label)
    }, [data, selectedId])
    return (
        <div className="form-group">
            <label htmlFor={title}>{title}</label>
            <ReactSelect {...props} id={title} options={option} value={defaultValue} />
        </div>
    )
}
