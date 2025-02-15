import { createSlice } from '@reduxjs/toolkit'

const listsSlice = createSlice({
    name: 'lists',
    initialState: [],
    reducers: {
        addList: (state, action) => {
            state.push(action.payload)
        },
        updateList: (state, action) => {
            const { id, name, cards } = action.payload
            const listIndex = state.findIndex(list => list.id === id)
            if (listIndex !== -1) {
                state[listIndex] = { ...state[listIndex], name, cards }
            }
        },
        deleteList: (state, action) => {
            return state.filter(list => list.id !== action.payload)
        },
        addCard: (state, action) => {
            const { listId, card } = action.payload
            const listIndex = state.findIndex(list => list.id === listId)
            if (listIndex !== -1) {
                state[listIndex].cards.push(card)
            }
        },
        deleteCard: (state, action) => {
            const { listId, cardId } = action.payload
            const listIndex = state.findIndex(list => list.id === listId)
            if (listIndex !== -1) {
                state[listIndex].cards = state[listIndex].cards.filter(card => card.id !== cardId)
            }
        },
        toggleCardStatus: (state, action) => {
            const { listId, cardId } = action.payload
            const listIndex = state.findIndex(list => list.id === listId)
            if (listIndex !== -1) {
                const cardIndex = state[listIndex].cards.findIndex(card => card.id === cardId)
                if (cardIndex !== -1) {
                    state[listIndex].cards[cardIndex].isActive = !state[listIndex].cards[cardIndex].isActive
                }
            }
        },
        editCard: (state, action) => {
            const { listId, cardId, newText } = action.payload
            const listIndex = state.findIndex(list => list.id === listId)
            if (listIndex !== -1) {
                const cardIndex = state[listIndex].cards.findIndex(card => card.id === cardId)
                if (cardIndex !== -1) {
                    state[listIndex].cards[cardIndex].text = newText
                }
            }
        },
        sortCards: (state, action) => {
            const { listId } = action.payload
            const listIndex = state.findIndex(list => list.id === listId)
            if (listIndex !== -1) {
                state[listIndex].cards.sort((a, b) => a.text.localeCompare(b.text))
            }
        },
    },
});

export const { addList, updateList, deleteList, addCard, deleteCard, toggleCardStatus, editCard, sortCards } = listsSlice.actions

export default listsSlice.reducer