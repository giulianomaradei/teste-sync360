import React,{useState} from "react"

import styles from './RegisterForm.module.css'
import perfil from '../Assets/Images/perfil.png'

function RegisterForm(props){

    const [name,setName] = useState("");
    const [birth,setBirth] = useState("");
    const [bio,setBio] = useState("");
    const [imageName,setImageName] = useState("");
    const [imageFile,setImageFile] = useState(perfil);
    const [address,setAddress] = useState("");

    function onImageChange(e){
        const file = e.target.files[0];
        setImageName(file.name)
        setImageFile(URL.createObjectURL(file))
    }

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
        props.changeValues(imageFile,name,birth,address,bio);
        setAddress("");
        setBio("");
        setBirth("");
        setImageName("");
        setImageFile(perfil);
        setName("");
    }


    return(
        <div className={styles.formContainer} onSubmit={onFormSubmit}>
            <form className={styles.form}>
                <div className={styles.imageLabel}>Foto Perfil</div>
                <label  htmlFor="imageInput" className={styles.imageLabel}><img className={styles.profileImage} src={imageFile} alt="profile"></img></label>
                <input type="file" id="imageInput" onChange={onImageChange} className={styles.imageInpu} filename={imageName} alt="form"></input>

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