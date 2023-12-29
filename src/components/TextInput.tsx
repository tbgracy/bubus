import { forwardRef } from "react"

type Props = {
    id: string,
    label: string,
}

const TextInput = forwardRef<HTMLInputElement, Props>(({ id, label }, ref) => {
    return <div className='input-group'>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} type="text" id={id} />
    </div>
})

export default TextInput;