import { configureStore } from '@reduxjs/toolkit';
import { peopleSlice } from './admin/peopleSlice';
import { programaSlice } from './admin/programaSlice';
import { rolSlice } from './admin/rolSlice';
import { authSlice } from './auth/authSlice';


export const store = configureStore({
  reducer: {
        auth: authSlice.reducer,
        people: peopleSlice.reducer,
        rol: rolSlice.reducer,
        programa: programaSlice.reducer,
    },
})
