import React, { useState } from 'react'
import Modal_board from './Modal_board'
import ListBoards from './ListBoards'
import './style/Board.css';

function Board() {
    const [open, setOpen] = useState(false)
    const [boards, setBoards] = useState(() => {
        const storedBoards = localStorage.getItem('storedBoards')
        let start

        if (storedBoards) {
            start = JSON.parse(storedBoards)
        } else {
            start = []
        }
        return start
    })

    const closeModal = () => {
        setOpen(false)
    }

    const createBoard = (name) => {
        const newBoard = {
            id: Date.now(),
            name: name,}
        const boardsUpdate = [...boards, newBoard]
        setBoards(boardsUpdate)
        localStorage.setItem('storedBoards', JSON.stringify(boardsUpdate))
        setOpen(false)
    }

    const renderModal = () => {
        if (!open) 
            return null
        return <Modal_board createBoard={createBoard} />
    }

    const renderSvg = () => {
        if (open) {
            return (<svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" className="cross" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>)
        }
        return null
    }

    const handleDeleteBoard = (boardId) => {
        const updatedBoards = boards.filter((board) => board.id !== boardId)
        setBoards(updatedBoards)
        localStorage.setItem('storedBoards', JSON.stringify(updatedBoards))
    }

    const handleEditBoard = (boardId, newName) => {
        let updatedBoards;
        if (boards) {
            updatedBoards = boards.map((board) => {
                if (board.id === boardId) {
                    return { ...board, name: newName };
                }
                return board;
            });
        }
    
        setBoards(updatedBoards);
        localStorage.setItem('storedBoards', JSON.stringify(updatedBoards));
    }
    

    return (
        <div className="board">
            <div className="content-board">
                <button className="board_but" onClick={() => setOpen(true)}>
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
