import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

function Cards({ cards, updateCards }) {
    const [newCardText, setNewCardText] = useState('')
    const [editingCardId, setEditingCardId] = useState(null)
    const [editedCardText, setEditedCardText] = useState('')

    const sortCardsAlphabetically = (cards) => {
        return [...cards].sort((a, b) => a.text.localeCompare(b.text))
    }
    const handleKeyPress = (event) => {
        if (event.key == 'Enter' && newCardText.trim() !== '') {
            const newCard = {
                id: Date.now().toString(),
                text: newCardText,
                isActive: true,
            }
            const updatedCards = sortCardsAlphabetically([...cards, newCard])
            updateCards(updatedCards)
            setNewCardText('')
        }
    }
    const handleDeleteCard = (cardId) => {
        const cardToDelete = cards.find((card) => card.id == cardId)
        if (cardToDelete && cardToDelete.isActive) {
            const updatedCards = cards.filter((card) => card.id !== cardId)
            updateCards(sortCardsAlphabetically(updatedCards))
        } 
    }
    const handleToggleCardStatus = (cardId) => {
        const updatedCards = cards.map((card) => {
            if (card.id == cardId) {
                return { ...card, isActive: !card.isActive };
            } else {
                return card;
            }
        });
        updateCards(sortCardsAlphabetically(updatedCards));
    }    
    const handleEditCard = (cardId, currentText) => {
        const cardToEdit = cards.find((card) => card.id == cardId)
        if (cardToEdit && cardToEdit.isActive) {
            setEditingCardId(cardId)
            setEditedCardText(currentText)
        }
    }
    const handleSaveCard = (cardId) => {
        const updatedCards = cards.map((card) => {
            if (card.id == cardId) {
                return { ...card, text: editedCardText };
            } else {
                return card;
            }
        });
        updateCards(sortCardsAlphabetically(updatedCards));
        setEditingCardId(null);
    };
    return (
        <div className='main-lists-con'>
            <div className='input-con'>
                <input type="text" value={newCardText} minLength={1} maxLength={20} onChange={(e) => setNewCardText(e.target.value)} onKeyPress={handleKeyPress} placeholder="Добавить CARточку"/>
            </div>
            {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided) => (
                        <div className="card-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="del" viewBox="0 0 16 16" onClick={() => handleDeleteCard(card.id)}>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`card-con ${!card.isActive ? 'inactive' : ''}`}>
                                {editingCardId === card.id ? (
                                <div className="input-button">
                                    <input className='card-edit' type="text" value={editedCardText} onChange={(e) => setEditedCardText(e.target.value)} minLength={1} maxLength={15}/>
                                    <svg onClick={() => handleSaveCard(card.id)} xmlns="http://www.w3.org/2000/svg" className='save' viewBox="0 0 16 16">
                                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                                    </svg>
                                </div>
                                ) : (
                                    <p onClick={() => handleEditCard(card.id, card.text)}>{card.text}</p>
                                )}
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="check" viewBox="0 0 16 16" onClick={() => handleToggleCardStatus(card.id)}>
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                            </svg>
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    )
}

export default Cards