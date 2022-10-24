import { createSlice } from '@reduxjs/toolkit';

export const programaSlice = createSlice({
   name: 'programa',
   initialState: {
        codigoPrograma: null,
        nombrePrograma: null,
    },
    reducers: {
        putPrograma: ( state, { payload }) => {
        
            state.codigoPrograma = payload.codigoPrograma;
            state.nombrePrograma = payload.nombrePrograma;
        
        },
        deletePrograma: ( state ) => {
            state.codigoPrograma = null;
            state.nombrePrograma = null;
        },
    }
});


export const { putPrograma, deletePrograma } = programaSlice.actions;