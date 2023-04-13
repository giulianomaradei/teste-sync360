import React,{useState,useEffect} from 'react';
import {auth,googleProvider} from '../Config/firebase';
import {createUserWithEmailAndPassword,getRedirectResult,signInWithEmailAndPassword,signInWithRedirect} from 'firebase/auth'

import styles from './Authentication.module.css'

function Authentication(props){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [view,setView] = useState(1);

    const [errorMessage,setErrorMessage] = useState("");


    useEffect(()=>{
        if (window.sessionStorage.getItem('loginStarted')) {
            setView(3);
            window.sessionStorage.removeItem('loginStarted');
        }
        getRedirectResult(auth).then((result)=>{
            console.log(result.user)
            props.userLoggedHandler(result.user.uid) 
        });
        // eslint-disable-next-line
    },[]);


    function viewChangeHandler(){
        
        setView(prev => {
            if(prev === 1){
                return 2
            }else{
                return 1;
            }
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    function retrieveErrorDescription(error){
        const errorCode = error.code;

        console.log(errorCode);

        if(errorCode === "auth/invalid-email"){
            setErrorMessage("E-mail inválido")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }

        if(errorCode === "auth/wrong-password"){
            setErrorMessage("E-mail ou senha inválidos")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }

        if(errorCode === "auth/email-already-in-use"){
            setErrorMessage("E-mail já está em uso")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }

        if(errorCode === "not matching passwords"){
            setErrorMessage("Senhas não coincidem")
            setTimeout(()=>{
                setErrorMessage("");
            },3000)
        }

        if(errorCode === "auth/user-not-found"){
            setErrorMessage("Usuario Não Encontrado")
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
            console.log("teste");
            window.sessionStorage.setItem('loginStarted', true);
            await signInWithRedirect(auth,googleProvider)
        }catch(e){
            console.log(e);
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
            <div className={styles.login}> 
                <h1>Entrar</h1>

                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>

                <label>Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>

                
                
                <div className={styles.errorMessage}>{errorMessage}</div>
                <button onClick={signIn} className={styles.signInButon}> Entrar</button>
                <div className={styles.orParagraph}> or </div>
                <button className={styles.googleButton} onClick={signInWithGoogle}></button>
                <button className={styles.dontHaveAccountButton} onClick={viewChangeHandler}>Não possui uma conta?</button>
            </div>
            
    const registerContent = 
            <div className={styles.login}> 
                <h1>Registro</h1>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <label>Confirme a senha</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <div className={styles.errorMessage}>{errorMessage}</div>
                <button onClick={signUp} className={styles.signInButon}> Criar conta</button>
                <button className={styles.dontHaveAccountButton} onClick={viewChangeHandler}>Já possui uma conta?</button>
            </div>
    ;

    const waitingContent = <span class={styles.loader}></span>

    return(
        <div className={styles.auth}>
            {view === 1 && loginContent}
            {view === 2 && registerContent}    
            {view === 3 && waitingContent}
        </div>
    )
}

export default Authentication