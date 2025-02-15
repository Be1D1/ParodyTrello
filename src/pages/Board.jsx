import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal_board from '../components/Modal/Modal_board'
import ListBoards from '../components/Lists/ListBoards'
import { addBoard, deleteBoard, editBoard } from '../reducers/boardsSlice'
import '/src/style/Board.css'

function Board() {
    const [open, setOpen] = useState(false)
    const boards = useSelector(state => state.boards.boards)
    const dispatch = useDispatch()

    const closeModal = () => {
        setOpen(false)
    }

    const handleCreateBoard = (name) => {
        dispatch(addBoard(name))
        setOpen(false)
    }

    const handleDeleteBoard = (boardId) => {
        dispatch(deleteBoard(boardId))
    }

    const handleEditBoard = (boardId, newName) => {
        dispatch(editBoard({ id: boardId, newName }))
    }

    const renderModal = () => {
        if (!open) return null
        return <Modal_board createBoard={handleCreateBoard} closeModal={closeModal} />
    }

    const renderSvg = () => {
        if (open) {
            return (
                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" className="cross" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            )
        }
        return null
    }

    const openWin = () => {
        setOpen(true)
    }

    return (
        <div className="board">
            <div className="content-board">
                <button className="board_but" onClick={openWin}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Новая доска
                </button>
                {renderModal()}
                {renderSvg()}
            </div>
            <ListBoards boards={boards} onDeleteBoard={handleDeleteBoard} onEditBoard={handleEditBoard} />
        </div>
    )
}

export default Board
