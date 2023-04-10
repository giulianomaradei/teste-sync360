import React,{useState} from "react";
import RegisterForm from "./RegisterForm"

import styles from './Profile.module.css'


function Profile(){

    const [name,setName] = useState("");
    const [birth,setBirth] = useState("");
    const [bio,setBio] = useState("");
    const [address,setAddress] = useState("");
    const [image,setImage] = useState("");

    function changeValues(image,name,birth,address,bio){
        if(image !== ""){
            setImage(image);
        }
        if(name !== ""){
            setName(name);
        }
        if(birth !== ""){
            setBirth(birth);
        }
        if(address !== ""){
            setAddress(address);
        }
        if(bio !== ""){
            setBio(bio);
        }

    }

    return(
        <div className={styles.profileContainer}>
            
            <div className={styles.profile}>
                <div>Foto Perfil:</div>
                <div><img src={image} alt="perfil"></img></div>

                <div>Nome: {name}</div>
                

                <div>Nascimento: {birth}</div>

                <div>Endereço: {address}</div>

                <div>Biografia: {bio}</div>
            </div>
            <RegisterForm changeValues={changeValues}></RegisterForm>   
        </div>
        
    )
}

export default Profile