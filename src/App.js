import React,{useState,useEffect} from 'react';
import './Assets/Fonts/RobotoMono-Regular.ttf'
import Profile from './components/Profile';
import styles from './App.module.css'
import Authentication from './components/Authentication';
import RegisterForm from './components/RegisterForm';

import perfil from './Assets/Images/perfil.png'

import { doc,getDoc,setDoc } from "firebase/firestore";
import {db,storage,auth} from './Config/firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {signOut} from "firebase/auth"

function App() {

  const [logged,setLogged] = useState(false);
  const [userLogged,setUserLogged] = useState("");

  const [name,setName] = useState("");
  const [birth,setBirth] = useState("");
  const [bio,setBio] = useState("");
  const [address,setAddress] = useState("");
  const [imageFile,setImageFile] = useState(perfil);

  useEffect(()=>{
    const userId = localStorage.getItem('userId')
    if(userId){
      setLogged(true);
      setUserLogged(userId)
    }
  },[])

  async function logoutHandler(){
    await signOut(auth);
    localStorage.removeItem('userId');
    setLogged(false);
    setUserLogged("");
  
    setName("");
    setBirth("");
    setBio("");
    setAddress("");
    setImageFile(perfil)

  }

  async function changeValues(updatedValues){

      if(updatedValues.name !== undefined){
        setName(updatedValues.name);
      }
      if(updatedValues.birth !== undefined){
        setBirth(updatedValues.birth)
      }
      if(updatedValues.address !== undefined){
        setAddress(updatedValues.address)
      }
      if(updatedValues.bio !== undefined){
        setBio(updatedValues.bio)
      }

      if(updatedValues.imageFile !== undefined){
        const imageRef = ref(storage, `images/${userLogged}/profilePicture`);
        await uploadBytes(imageRef, updatedValues.imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        if(imageUrl !== undefined){
          setImageFile(imageUrl)
          updatedValues.imageFile = imageUrl;
        }
      }


      await setDoc(doc(db, "users", userLogged),updatedValues, { merge: true });

  }

  async function userLoggedHandler(uid){
    setUserLogged(uid);
    localStorage.setItem('userId', uid);
    setLogged(true);
    
    const userRef = doc(db, "users", `${uid}`);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if(userData.name !== undefined){
        setName(userData.name)
      }

      if(userData.birth !== undefined){
        setBirth(userData.birth)
      }

      if(userData.address !== undefined){
        setAddress(userData.address)
      }

      if(userData.bio !== undefined){
        setBio(userData.bio)
      }

      if(userData.imageFile !== undefined){
        setImageFile(userData.imageFile)
      }

    } else {
      console.log("User does not exist!");
    }
    
  }

  return (
    <div className={styles.app}>
      {logged && <Profile name={name} imageFile={imageFile} birth={birth} address={address} bio={bio} logoutHandler={logoutHandler}></Profile>}
      {logged && <RegisterForm changeValues={changeValues}></RegisterForm>}
      {!logged && <Authentication userLoggedHandler={userLoggedHandler}></Authentication>}
    </div>
  );
}

export default App;
