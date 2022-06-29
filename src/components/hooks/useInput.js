import { useState } from "react"

const useInput = (initialValue) => {
const [value, setValue] = useState(initialValue)

    const onChange = e => setValue(e.target.value)  

    const set = (value) => setValue(value)

    return {
        value,
        set,
        onChange,
    }
}

export default useInput
