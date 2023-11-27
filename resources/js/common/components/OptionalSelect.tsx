import { FC, useState } from "react"
import { FormGroup, OptionType } from "."
import ReactSelect, { Props } from "react-select"

export const OptionalSelect: FC<{
    title: string
    defaultChoice: string[],
    onSelected: (val: string) => void
} & Props> = ({ title, defaultChoice, onSelected, ...props }) => {
    const option: OptionType<string>[] = defaultChoice.map((val) => ({ value: val, label: val }))
    option.push({ value: "Lainnya", label: "Lainnya" })
    const [selected, setSelected] = useState<OptionType<string>>()

    const handleSelectChange = (e: OptionType<string>) => {
        setSelected(e)
        onSelected(e.value)
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor={title}>{title}</label>
                <ReactSelect
                    {...props}
                    id={title}
                    options={option}
                    onChange={(e) => handleSelectChange(e as OptionType<string>)}
                    defaultValue={selected}
                />
            </div>
            {selected?.value === "Lainnya" && (
                <FormGroup
                    title={`${title}(Lainnya)`}
                    onChange={(e) => onSelected(e.target.value)}
                    name={title}
                />
            )}
        </>
    )
}
