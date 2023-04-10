import React,{useState} from "react"

import styles from './RegisterForm.module.css'
import perfil from '../Assets/Images/perfil.png'

function RegisterForm(props){

    const [name,setName] = useState("");
    const [birth,setBirth] = useState("");
    const [bio,setBio] = useState("");
    const [image,setImage] = useState("");
    const [address,setAddress] = useState("");

    function onNameChange(e){
        setName(e.target.value)
    }
    function onBirthChange(e){
        setBirth(e.target.value)
    }

    function onAddressChange(e){
        setAddress(e.target.value)
    }

    function onBioChange(e){
        setBio(e.target.value)
    }

    function onFormSubmit(e){
        e.preventDefault();
        props.changeValues(image,name,birth,address,bio);
        setAddress("");
        setBio("");
        setBirth("");
        setImage("");
        setName("");
    }


    return(
        <div className={styles.formContainer} onSubmit={onFormSubmit}>
            <form className={styles.form}>
                <div className={styles.imageLabel}>Foto Perfil</div>
                <label  for="imageInput" className={styles.imageLabel}><img className={styles.profileImage} src={perfil} alt="profile"></img></label>
                <input type="file" id="imageInput" className={styles.imageInput} value={image} alt="form"></input>

                <label>Nome</label>
                <input type="text" value={name} onChange={onNameChange}></input>

                <label>Data de Nascimento</label>
                <input type="date" value={birth} onChange={onBirthChange}></input>

                <label>Endereço</label>
                <input type="text" value={address} onChange={onAddressChange}></input>

                <label>Biografia</label>
                <textarea value={bio} onChange={onBioChange}></textarea>

                <button type="Aplicar Mudanças" className={styles.createButton}>Criar</button>
            </form>
        </div>
    )
}

export default RegisterForm