import { forwardRef } from "react"
import BusStop from "../types/BusStop";

type Props = {
    id: string,
    label: string,
    options: string[][] | BusStop[],
}

const SelectInput = forwardRef<HTMLSelectElement, Props>(({ id, label, options }, ref) => {
    let options_;

    if (Array.isArray(options[0])) {
        options_ = (options as string[][]).map(([value, displayName], index) => <option key={index} value={value}>{displayName}</option>)
    } else {
        options_ = (options as BusStop[]).map((busStop, index) => <option key={index} value={busStop.id}>{busStop.name}</option>)
    }

    return <div className='input-group'>
        <label htmlFor={id}>{label}</label>
        <select ref={ref} id={id}>
            {options_}
        </select>
    </div>
})

export default SelectInput;