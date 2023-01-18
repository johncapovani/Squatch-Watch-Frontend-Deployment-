import { configureStore } from '@reduxjs/toolkit'
//Import auth slice
import authReducer from '../features/auth/authSlice'
import sightingsReducer from '../features/sightings/sightingSlice'

export const store = configureStore({

    reducer: {
        
        auth: authReducer,
        sightings: sightingsReducer

    },


})