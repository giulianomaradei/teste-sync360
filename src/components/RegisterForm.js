import React,{useState} from "react"

import styles from './RegisterForm.module.css'
import perfil from '../Assets/Images/perfil.png'

function RegisterForm(props){

    const [name,setName] = useState("");
    const [birth,setBirth] = useState("");
    const [bio,setBio] = useState("");
    const [imageName,setImageName] = useState("");
    const [imageFileUrl,setImageFileUrl] = useState(perfil);
    const [imageFile,setImageFile] = useState("");
    const [address,setAddress] = useState("");

    function onImageChange(e){
        const file = e.target.files[0];
        setImageName(file.name)
        setImageFileUrl(URL.createObjectURL(file))
        setImageFile(file);
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
        const updatedValues = {};
        if (name !== "") updatedValues.name = name;
        if (birth !== "") updatedValues.birth = birth;
        if (address !== "") updatedValues.address = address;
        if (bio !== "") updatedValues.bio = bio;
        if (imageFile !== "") updatedValues.imageFile = imageFile;

        props.changeValues(updatedValues);
        setAddress("");
        setBio("");
        setBirth("");
        setImageName("");
        setImageFile("");
        setImageFileUrl(perfil)
        setName("");
    }


    return(
        <div className={styles.formContainer} onSubmit={onFormSubmit}>
            
            <form className={styles.form}>
                <h1 className={styles.title}>Atualizar Dados</h1>
                <div className={styles.imageLabel}>Foto Perfil</div>
                <label  htmlFor="imageInput" className={styles.imageLabel}><img className={styles.profileImage} src={imageFileUrl} alt="profile"></img></label>
                <input type="file" id="imageInput" accept=".png,.jpeg,.webp" onChange={onImageChange} className={styles.imageInput} filename={imageName} alt="form"></input>

                <label>Nome</label>
                <input type="text" value={name} onChange={onNameChange}></input>

                <label>Data de Nascimento</label>
                <input type="date" value={birth} onChange={onBirthChange}></input>

                <label>Endereço</label>
                <input type="text" value={address} onChange={onAddressChange}></input>

                <label>Biografia</label>
                <textarea value={bio} onChange={onBioChange}></textarea>

                <button type="Aplicar Mudanças" className={styles.createButton}>Aplicar Mudanças</button>
            </form>
        </div>
    )
}

export default RegisterForm