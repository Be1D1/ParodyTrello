import React, { useState } from 'react'
import './style/Modal_board.css'

function Modal_board({ createBoard }) {
    const [boardName, setBoardName] = useState('')

    const handleCreate = () => {
        if (boardName) {
            createBoard(boardName)
        }
    };

    return (
        <div className="modal-con">
            <h2>Неймик борт'ы</h2>
            <input type="text"  placeholder="сюда нейм досочки" minLength={1} maxLength={10} value={boardName} onChange={(e) => setBoardName(e.target.value)}/>
            <button className='createBut' onClick={handleCreate}>
                креэйтик
            </button>
        </div>
    );
}

export default Modal_board