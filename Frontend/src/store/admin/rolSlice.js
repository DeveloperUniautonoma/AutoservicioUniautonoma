import { createSlice } from '@reduxjs/toolkit';

export const rolSlice = createSlice({
   name: 'rol',
   initialState: {
        rol: null,
    },
    reducers: {
        putRol:( state, { payload }) =>{
            state.rol = payload.rol;    
        
        },

        deleteRol: ( state )=> {
            state.rol = null;
        },
    }
});


export const { putRol, deleteRol } = rolSlice.actions;