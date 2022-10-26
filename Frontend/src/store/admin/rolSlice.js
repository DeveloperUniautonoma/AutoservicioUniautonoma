import { createSlice } from '@reduxjs/toolkit';

export const rolSlice = createSlice({
   name: 'rol',
   initialState: {
        rol_activo: null,
    },
    reducers: {
        putRol:( state, { payload }) =>{
            state.rol_activo = payload;    
        
        },

        deleteRol: ( state )=> {
            state.rol_activo = null;
        },
    }
});


export const { putRol, deleteRol } = rolSlice.actions;