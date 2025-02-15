import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { updateList } from '../reducers/listsSlice'
import Cards from '../Lists/Cards'
import '../Modal/Modal_lists.css'

function Modal_lists({ list, deleteList }) {
    const dispatch = useDispatch();
    const [editingListName, setEditingListName] = useState(false)
    const [tempListName, setTempListName] = useState(list.name)
    
    const startEditingListName = () => {
        setEditingListName(true);
    }

    const saveListName = () => {
        if (tempListName.trim() === '') return;
        dispatch(updateList({ ...list, name: tempListName }))
        setEditingListName(false);
    }

    const editListName = (e) => {
        setTempListName(e.target.value)
    }

    return (
        <div className="modal-con-list">
            <svg xmlns="http://www.w3.org/2000/svg" className="trash" viewBox="0 0 16 16" onClick={() => deleteList(list.id)}>
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
            <div className='render-h'>
                {editingListName ? (
                    <div className="input-button">
                        <input type="text" value={tempListName} onChange={editListName} minLength={1} maxLength={15}/>
                        <svg onClick={saveListName} xmlns="http://www.w3.org/2000/svg" className='save' viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                        </svg>
                    </div>
                ) : (
                    <h1 onClick={startEditingListName}>{list.name}</h1>
                )}
            </div>
            <Droppable droppableId={list.id}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        <Cards listId={list.id} cards={list.cards}/>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default Modal_lists