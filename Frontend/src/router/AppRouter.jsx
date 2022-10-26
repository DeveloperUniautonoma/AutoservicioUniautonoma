
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { useEffect, useState } from "react";
//
import { logout } from "store/auth/authSlice";
import { login } from "store/auth/authSlice";
import { Loading } from "components/Loading/Loading";
import AdminLayout from "../layouts/Admin";
import AuthLayout from "../layouts/Auth.js";

import { ValidarCorreo } from "controller/functions/DatosPersona";


export const AppRouter = () => {

    const { status, email } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [emailValid, setEmailValid] = useState(false);
  

    const validarCorreoPower = async( email ) =>{
        const resultDatos = await ValidarCorreo(email);
        if ( !resultDatos.ok ) return dispatch( logout({}) );

        setEmailValid(true);
          
      };
    
    

    useEffect(() => {
      
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if (!user ){
                setEmailValid(false);
                return dispatch( logout() );
            }else{
            
                const { uid, displayName, email, photoURL } = user;
                validarCorreoPower( email );
                dispatch( login({ uid, displayName, email, photoURL }) )
            }
            
        } )
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    if ( status === 'checking' ){
        return <Loading />
    }
    return (
        <Switch>
            {          
                ( status === 'authenticated' && email.includes('@uniautonoma.edu.co') && emailValid )
                ? <Route path="/*" render={(props) => <AdminLayout {...props} />} />
                : <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            }

                <Redirect from="/*" to="/auth" />
        </Switch>
    )
}


