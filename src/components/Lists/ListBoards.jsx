import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBoard, editBoard } from '../reducers/boardsSlice'
import '../Lists/ListBoards.css'

function ListBoards() {
    const navigate = useNavigate();
    const boards = useSelector(state => state.boards.boards)
    const dispatch = useDispatch()

    const handleBoardClick = (board) => {
        navigate(`/board/${board.id}`, { state: { boardName: board.name } })
    };

    const handleDeleteClick = (boardId, e) => {
        e.stopPropagation()
        dispatch(deleteBoard(boardId))
    };

    const handleEditClick = (boardId, currentName, e) => {
        e.stopPropagation()
        const newName = prompt('Введите новое название доски:', currentName)
        if (newName && newName.trim() !== '') {
            dispatch(editBoard({ id: boardId, newName: newName.trim() }))
        }
    };

    return (
        <div className="boards-list">
            <nav>
                {boards.map((board) => (
                    <button key={board.id} className="board-item" onClick={() => handleBoardClick(board)}>
                        {board.name}
                        <div className="but-tools">
                            <svg xmlns="http://www.w3.org/2000/svg" className="shield-x" viewBox="0 0 16 16" onClick={(e) => handleDeleteClick(board.id, e)}>
                                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                                <path d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="pencil" viewBox="0 0 16 16" onClick={(e) => handleEditClick(board.id, board.name, e)}>
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                        </div>
                    </button>
                ))}
            </nav>
        </div>
    )
}

export default ListBoards