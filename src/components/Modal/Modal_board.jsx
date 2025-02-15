import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '../reducers/boardsSlice'
import '../Modal/Modal_board.css'

function Modal_board({closeModal}) {
    const [boardName, setBoardName] = useState('')
    const dispatch = useDispatch()

    const handleCreate = () => {
        if (boardName.trim()) {
            dispatch(addBoard(boardName))
            closeModal()
        }
    }

    const handleInputChange = (e) => {
        setBoardName(e.target.value)
    }

    return (
        <div className="modal-con">
            <h2>Неймик борт'ы</h2>
            <input type="text" placeholder="сюда нейм досочки" minLength={1} maxLength={10} value={boardName} onChange={handleInputChange}/>
            <button className="createBut" onClick={handleCreate}>
                креэйтик
            </button>
        </div>
    )
}

export default Modal_board