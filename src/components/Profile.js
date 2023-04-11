import React,{useState} from "react";
import RegisterForm from "./RegisterForm"

import styles from './Profile.module.css'
import perfil from '../Assets/Images/perfil.png'

function Profile(){

    const [name,setName] = useState("");
    const [birth,setBirth] = useState("");
    const [bio,setBio] = useState("");
    const [address,setAddress] = useState("");
    const [imageFile,setImageFile] = useState(perfil);

    function changeValues(imageFile,name,birth,address,bio){
        if(imageFile !== ""){
            setImageFile(imageFile);
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
                <div className={styles.profileImageLabelContainer}>
                    <div>Foto Perfil:</div>
                    <div><img src={imageFile} className={styles.profileImage} alt="perfil"></img></div>
                </div>
                
                <div><span className={styles.infoText}>Nome: </span>{name}</div>

                <div><span className={styles.infoText}>Nascimento: </span>{birth}</div>

                <div><span className={styles.infoText}>Endereço: </span>{address}</div>

                <div><span className={styles.infoText}>Biografia: </span>{bio}</div>
            </div>
            <RegisterForm changeValues={changeValues}></RegisterForm>   
        </div>
        
    )
}

export default Profile