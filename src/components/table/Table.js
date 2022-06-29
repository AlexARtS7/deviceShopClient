import React, { useEffect, useRef, useState } from "react"
import './table.scss'

const Table = ({data, removeItem}) => {
    const [rerender, setRerender] = useState(false)
    const [coords, setCoords] = useState({x: 0, y: 0})
    const [tooltext, setTooltext] = useState('')
    const tooltip = useRef()
    
    const sorting = (mode) => {
        if(mode === 'price' || mode === 'quantity'){
            data.sort((a, b) => parseFloat(mode === 'price'? a.price : a.quantity) - parseFloat(mode === 'price'? b.price : b.quantity)) 
        } else {
            data.sort((a, b) => (mode === 'name'? a.name : a.brand).localeCompare(mode === 'name'? b.name : b.brand))
        }
        setRerender(!rerender)  
    }

    useEffect(() => {
        const handleWindowMouseMove = event => {
          setCoords({
            x: event.screenX,
            y: event.screenY
          });
        };
        window.addEventListener('mousemove', handleWindowMouseMove);
    
        return () => {
          window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, []);

    const tooltipShow = (info) => {
        tooltip.current.className = 'tooltip tooltip_show'
        setTooltext(info)
    }

    const tooltipHide = () => {
        tooltip.current.className = 'tooltip tooltip_hide'
    }

    return (
        <div className='table_container' >
            <table className='table'>
                <thead>
                    <tr>
                        <th onClick={() => sorting('brand')}>Производитель</th>
                        <th onClick={() => sorting('name')}>Наименование</th> 
                        <th onClick={() => sorting('price')}>Цена</th>
                        <th onClick={() => sorting('quantity')}>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => 
                        <tr key={item.id} 
                            className='tr'
                            onMouseEnter={() => tooltipShow(item.info)}
                            onMouseLeave={tooltipHide}
                            onClick={() => removeItem(item.id)}
                        >
                            <td>{item.brand}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                        </tr>                        
                    )}                     
                </tbody>               
                <tfoot>
                    <tr><td colSpan={2} style={{textAlign: 'right'}}>Итого:</td>
                        <td>{data.reduce((totalPrice, item) => totalPrice + item.price, 0)}</td>
                        <td>{data.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)}</td>
                    </tr>
                </tfoot>
            </table>
            <div className='tooltip tooltip_hide' ref={tooltip} style={{top: coords.y - 150, left: coords.x}}>{tooltext}</div>
        </div>
    )
}

export default Table
