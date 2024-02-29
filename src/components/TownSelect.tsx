import { forwardRef } from "react"
import Town from "../types/Town";

type Props = {
    id: string,
    label: string,
    options: Town[],
    onChange?: () => void,
}

const TownSelect = forwardRef<HTMLSelectElement, Props>(({ id, label, options, onChange }, ref) => {
    const options_ = options!.map((town, index) => <option key={index} value={town.code}>{town.name}</option>)

    return <div className='input-group'>
        <label htmlFor={id}>{label}</label>
        <select ref={ref} id={id} onChange={onChange}>
            {options_}
        </select>
    </div>
})

export default TownSelect;