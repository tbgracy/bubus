import { forwardRef } from "react"

type Props = {
    id: string,
    label: string,
    options: string[][],
}
const SelectInput = forwardRef<HTMLSelectElement, Props>(({ id, label, options }, ref) => {
    return <div className='input-group'>
        <label htmlFor={id}>{label}</label>
        <select ref={ref} id={id}>
            {options.map(e => <option value={e[0]}>{e[1]}</option>)}
        </select>
    </div>
})

export default SelectInput;