import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addList, updateList, deleteList, sortCards } from '../reducers/listsSlice'
import Modal_lists from '../components/Modal/Modal_lists'
import '/src/style/BoardPage.css'

function BoardPage() {
    const location = useLocation()
    const { boardName } = location.state || { boardName }
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newListName, setNewListName] = useState('')

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setNewListName('')
    }

    const handleInputChange = (e) => {
        setNewListName(e.target.value)
    }

    const handleAddList = () => {
        if (newListName.trim() === '') return

        const newList = {
            id: Date.now().toString(),
            name: newListName,
            cards: [],
        }
        dispatch(addList(newList));
        closeModal()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddList()
        }
    }

    const onDragEnd = (result) => {
        const { source, destination } = result
    
        if (!destination) return;
    
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return
        }

        const sourceListIndex = lists.findIndex(list => list.id === source.droppableId)
        const destinationListIndex = lists.findIndex(list => list.id === destination.droppableId)
    
        const updatedLists = lists.map(list => ({
            ...list,
            cards: [...list.cards],
        }))

        const sourceList = updatedLists[sourceListIndex]
        const destinationList = updatedLists[destinationListIndex]
    
        const [removedCard] = sourceList.cards.splice(source.index, 1)
    
        destinationList.cards.splice(destination.index, 0, removedCard)
    
        dispatch(updateList(sourceList))
        dispatch(updateList(destinationList))
    };
    

    const handleDeleteList = (listId) => {
        dispatch(deleteList(listId))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="board-user">
                <div className='h2-board'>
                    <h2>{boardName}</h2>
                </div>
                <div className='but-con-list'>
                    <button onClick={openModal}>Добавить список</button>
                </div>
                <div className='basic'>
                    <div className='litst-create-con'>
                        {isModalOpen && (
                            <div className="modal-overlay">
                                <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" className="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                                <div className="modal-content">
                                    <input type="text" placeholder="Обзови списоЧЕК" value={newListName} onChange={handleInputChange} onKeyDown={handleKeyDown} autoFocus/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='glav'>
                        <div className='modal-lists-con'>
                            {lists.map((list, index) => (
                                <Modal_lists
                                    key={list.id}
                                    list={list}
                                    updateList={(updatedList) => dispatch(updateList(updatedList))}
                                    deleteList={handleDeleteList}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

export default BoardPage