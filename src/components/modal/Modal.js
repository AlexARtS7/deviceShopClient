import React from 'react';
import './modal.scss';

const Modal = ({setActive, children, width = 900}) => {
    return (
        <div className='modal' onClick={() => setActive(false)}>
            <div className='modal_content' style={{width: width}} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal