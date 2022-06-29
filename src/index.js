import Table from './components/table/Table'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/style.scss'
import AddModal from './components/addModal/AddModal'
import { deleteData, getData, saveData } from 'http/http'

const App =() => {
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [data, setData] = useState([])

    const getTableData = () => {
        getData()
        .then(response => response.json())
        .then(result => {
            setData(result)
        })
    }

    useEffect(() => {
        getTableData()
    }, [])

    const addData = (e) => {
        const formData = new FormData(e.target)
        saveData(formData)
        .then(_ => 
            getTableData()
        )
        setAddModalVisible(false)
    }

    const removeItem = (id) => {
        deleteData(id)
        .then(_ => 
            getTableData()
        )
    }

    return (
        <div className='app'>
            <div className='app_container'>
                <Table data={data} removeItem={removeItem}/>
                <button className='app_button_full' onClick={() => setAddModalVisible(true)}>Добавить данные</button>
                {addModalVisible && <AddModal setActive={setAddModalVisible} addData={addData}/>}
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
        <App />
)