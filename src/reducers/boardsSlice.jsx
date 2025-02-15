import { createSlice } from '@reduxjs/toolkit'

const boardsSlice = createSlice({
    name: 'boards',
    initialState: {
        boards: JSON.parse(localStorage.getItem('storedBoards')) || [],
    },
    reducers: {
        addBoard: (state, action) => {
            const newBoard = {
                id: Date.now(),
                name: action.payload,
            };
            state.boards.push(newBoard)
            localStorage.setItem('storedBoards', JSON.stringify(state.boards))
        },
        deleteBoard: (state, action) => {
            state.boards = state.boards.filter(board => board.id !== action.payload)
            localStorage.setItem('storedBoards', JSON.stringify(state.boards))
        },
        editBoard: (state, action) => {
            const { id, newName } = action.payload
            const board = state.boards.find(board => board.id === id)
            if (board) {
                board.name = newName
            }
            localStorage.setItem('storedBoards', JSON.stringify(state.boards))
        },
    },
})

export const { addBoard, deleteBoard, editBoard } = boardsSlice.actions
export default boardsSlice.reducer