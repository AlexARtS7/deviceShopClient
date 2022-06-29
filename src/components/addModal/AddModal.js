import Modal from "../modal/Modal"
import React, { useEffect, useState } from "react"
import useInput from "components/hooks/useInput"
import { errorsHandler } from "./errorsHandler"

const AddModal = ({setActive, addData}) => { 
    const [brandErr, setBrandErr] = useState('')
    const [nameErr, setNameErr] = useState('')
    const [errorsVisible, setErrorsVisible] = useState(false)
    const {value: brand, onChange: changeBrand} = useInput('')
    const {value: name, onChange: changeName} = useInput('')
    const {value: specifications, onChange: changeSpecifications, set: setSpecifications} = useInput('')
    const {value: price, onChange: changePrice, set: setPrice} = useInput('')
    const {value: quantity, onChange: changeQuantity, set: setQuantity} = useInput('')

    const validation = (data) => {
        data.preventDefault()
        
        if(!specifications) {
            setSpecifications('--')
            data.target[2].value = '--'
        }
        if(!price || price < 1) {
            setPrice(1)
            data.target[3].value = 1
        }

        if(!quantity || quantity < 1) {
            setQuantity(1)
            data.target[4].value = 1
        }

        if(brandErr || nameErr) {
            setErrorsVisible(true)
            return
        }
        addData(data)
    }

    useEffect(() => setBrandErr(errorsHandler(brand)), [brand])
    useEffect(() => setNameErr(errorsHandler(name)), [name])

    return (
        <Modal setActive={setActive}>
            <form onSubmit={validation}>
                <p className='modal_title'>Добавить данные</p>
                <hr/><br/>
                <div className='flex_between'><p>Производитель</p>
                {errorsVisible && brandErr && <p className='modal_error'>{brandErr}</p>}
                </div>
                <input name='brand' value={brand} onChange={changeBrand}/>
                <div className='flex_between'><p>Наименование</p>
                {errorsVisible && nameErr && <p className='modal_error'>{nameErr}</p>}
                </div>
                <input name='name' value={name} onChange={changeName}/>
                <p>Характеристики</p>
                <input name='info' value={specifications} onChange={changeSpecifications}/>
                <p>Цена</p>
                <input name='price' type='number' value={price} onChange={changePrice}/>
                <p>Количество</p>
                <input name='quantity' type='number' value={quantity} onChange={changeQuantity}/>
                <hr/><br/>
                <div className='flex_between'>
                    <div/>
                    <div>   
                        <button className='modal_button' onClick={() => setActive(false)}>Отмена</button>
                        <button className='modal_button' type='submit'>Добавить</button>
                    </div>               
                </div>
            </form>
            
        </Modal>
    )
}

export default AddModal