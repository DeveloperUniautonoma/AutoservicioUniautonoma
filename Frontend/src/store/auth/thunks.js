import { logoutFirebase, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice";
import { putPersona, deletePersona } from "store/admin/peopleSlice";
import { updatePersona } from "store/admin/peopleSlice";
import { putRol } from "store/admin/rolSlice";
import { putPrograma } from "store/admin/programaSlice";
import { deletePrograma } from "store/admin/programaSlice";
import { deleteRol } from "store/admin/rolSlice";


export const startGoogleSignIn = () => { 

    return async( dispatch ) => {
        
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login(result) );
    
    }

};

export const startLogout = () => { 

    return async( dispatch ) => {
      
        await logoutFirebase();

        dispatch( logout({}) );
        dispatch( deletePersona({}) );
        dispatch( deleteRol({}) );
        dispatch( deletePrograma({}) );
       
    }
};



export const startGetPersona = (dataPrograma) => {
    return ( dispatch ) => {
    
        dispatch( putPersona(dataPrograma) );
    }
};

export const startUpdatePersona = (rol) => {
    return ( dispatch ) => {
    
        dispatch( updatePersona(rol) );
    }
};




export const startGetRol = (rol) => {
    return ( dispatch ) => {
    
        dispatch( putRol(rol) );
    }
};

export const startGetPrograma = (programa) => {
    return ( dispatch ) => {
    
        dispatch( putPrograma(programa) );
    }
};