import { FirebaseAuth } from "./config";

const { GoogleAuthProvider, signInWithPopup } = require("firebase/auth");


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        const { displayName, email, photoURL, uid} = result.user;
        
        return{
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        console.log(error);
    
        const errorMessage = error.message;

        return{
            ok:false,
            errorMessage
            
        }
    }

}


export const logoutFirebase = async() => { 

    return await FirebaseAuth.signOut();
}