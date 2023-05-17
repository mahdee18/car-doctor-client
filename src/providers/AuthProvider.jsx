import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthContext = createContext()

const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();

    const createUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleSignIn=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }
    const logOut = ()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,loggedUser =>{
            console.log('Logged User',loggedUser)
            setUser(loggedUser)
            setLoading(false)

            if (loggedUser) {
                const users = {
                    email: loggedUser.email
                }
                fetch('https://car-doctor-server-three-mu.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(users)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        localStorage.setItem("car-access-token", data.token);
                    })
            }
            else {
                localStorage.removeItem("car-access-token")
            }
        })
        return ()=>{
            return unsubscribe()
        }
    },[])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;