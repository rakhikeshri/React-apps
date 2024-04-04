import {configureStore} from '@reduxjs/toolkit'
import featReducer from './features/featSlice'

const store =  configureStore({
    reducer:{
        feat: featReducer
    }
})

export default store;