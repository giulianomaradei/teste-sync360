import React,{useState} from 'react';
import {auth,googleProvider} from '../Config/firebase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'

import styles from './Authentication.module.css'

function Authentication(props){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [view,setView] = useState(true);

    const [errorMessage,setErrorMessage] = useState("");

    function viewChangeHandler(){
        setView(prev => !prev);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    function retrieveErrorDescription(error){
        const errorCode = error.code;

        console.log(errorCode);

        if(errorCode === "auth/invalid-email"){
            setErrorMessage("Invalid E-mail")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }

        if(errorCode === "auth/wrong-password"){
            setErrorMessage("Wrong E-mail or Password")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }

        if(errorCode === "auth/email-already-in-use"){
            setErrorMessage("E-mail already in use")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }

        if(errorCode === "not matching passwords"){
            setErrorMessage("Not Matching Passwords")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }
    }

    async function signUp(){
        try{
            if(password !== confirmPassword){
                let error = new Error();
                error.code = "not matching passwords"
                throw error;
            }
            const userCredential = await createUserWithEmailAndPassword(auth,email,password)
            props.userLoggedHandler(userCredential.user.uid)
        }catch(e){
            retrieveErrorDescription(e);
        }   
    }

    async function signIn(){
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password)
            props.userLoggedHandler(userCredential.user.uid)
        }catch(e){
            retrieveErrorDescription(e);
        }

    }

    async function signInWithGoogle(){
        try{
            const userCredential = await signInWithPopup(auth,googleProvider)
            props.userLoggedHandler(userCredential.user.uid)
        }catch(e){
            retrieveErrorDescription(e);
        }
    }
    // eslint-disable-next-line
    async function signOut(){
        try{
            await signOut(auth)
        }catch(e){
            console.error(e);
        }
    }

    const loginContent = 
            <React.Fragment>
                <h1>Sign In</h1>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <div className={styles.errorMessage}>{errorMessage}</div>
                <button onClick={signIn} className={styles.signInButon}> Sign In</button>
                <div className={styles.orParagraph}> or </div>
                <button className={styles.googleButton} onClick={signInWithGoogle}></button>
                <button className={styles.dontHaveAccountButton} onClick={viewChangeHandler}>Don't have an account?</button>
            </React.Fragment>
            
    const registerContent = 
            <React.Fragment>
                <h1>Register</h1>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <div className={styles.errorMessage}>{errorMessage}</div>
                <button onClick={signUp} className={styles.signInButon}> Sign Up</button>
                <button className={styles.dontHaveAccountButton} onClick={viewChangeHandler}>Already have an account?</button>
            </React.Fragment>
    ;

    return(
        <div className={styles.auth}>
            <div className={styles.login}> 
                {view  ? loginContent : registerContent}
            </div>
        </div>
    )
}

export default Authentication