import React from "react";

import styles from './Profile.module.css'
import logout from '../Assets/Images/logout.png'

function Profile(props){

    const imageFile = props.imageFile;
    const name = props.name;
    const birth = props.birth;
    const address = props.address;
    const bio = props.bio;


    return(
        <div className={styles.profileContainer}>
            <h1 className={styles.title}>Dados</h1>
            <div className={styles.infoContainer}>
                <div>
                    <div><span className={styles.infoText}>Nome: </span>{name}</div>
                    <div><span className={styles.infoText}>Nascimento: </span>{birth}</div>
                    <div><span className={styles.infoText}>Endereço: </span>{address}</div>
                    <div><span className={styles.infoText}>Biografia: </span>{bio}</div> 
                </div>
                <div><img className={styles.profileImage} src={imageFile} alt="perfil"></img></div>
            </div>
            <div><img className={styles.logout} src={logout} onClick={props.logoutHandler} alt="logout"></img></div>
        </div>
        
    )
}

export default Profile