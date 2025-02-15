import { configureStore } from '@reduxjs/toolkit'
import boardsReducer from './boardsSlice'
import listsReducer from './listsSlice'


export default configureStore({
    reducer: {
        boards: boardsReducer,
        lists: listsReducer,
        
    },
})