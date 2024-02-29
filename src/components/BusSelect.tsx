import { forwardRef } from "react"
import BusStop from "../types/BusStop";

type Props = {
    id: string,
    label: string,
    options?: BusStop[],
    onChange?: () => void,
    isLoading: boolean,
}

const BusSelect = forwardRef<HTMLSelectElement, Props>(({ id, label, options, onChange, isLoading }, ref) => {
    if (isLoading) return <div className="input-group">
        <label htmlFor={id}>{label}</label>
        <input type="text" value="Chargement ... " disabled />
    </div>

    const options_ = options!.map((busStop, index) => <option key={index} value={busStop.id}>{busStop.name}</option>)

    return <div className='input-group'>
        <label htmlFor={id}>{label}</label>
        <select ref={ref} id={id} onChange={onChange}>
            {options_}
        </select>
    </div>
})

export default BusSelect;