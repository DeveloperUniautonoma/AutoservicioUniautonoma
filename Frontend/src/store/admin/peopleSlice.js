import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
   name: 'people',
   initialState: {
        idPersona: null,
        rol: null,
        codigoPower: null,
        codigoPrograma: null,
        nombrePrograma: null,
    },
    reducers: {
        putPersona: ( state, { payload } )=> {
            state.idPersona = payload.idPersona;
            state.rol = payload.rol;
            state.codigoPower = payload.codigoPower;
            state.codigoPrograma = payload.codigoPrograma;
            state.nombrePrograma = payload.nombrePrograma;
        },

        updatePersona: ( state, { payload } )=> {
            
            state.rol = payload;

        },


        deletePersona: ( state )=> {
            state.idPersona = null;
            state.rol = null;
            state.codigoPower = null;
            state.codigoPrograma = null;
            state.nombrePrograma = null;
        },
    }
});


export const { putPersona, updatePersona, deletePersona } = peopleSlice.actions;