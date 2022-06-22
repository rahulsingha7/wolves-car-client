import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,  createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification, updateProfile, getIdToken  } from "firebase/auth";
import { useState, useEffect } from "react";
import initializeFirebase from "../Login/Firebase/Firebase.init";

initializeFirebase();

const useFirebase =() =>{
  const [user,setUser] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  const [token,setToken] = useState('');
  const [authError,setAuthError]=useState('');
  const [admin,setAdmin] = useState(false);
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();


const registerUser = (email,password,name,navigate)=>{
  setIsLoading(true);
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        setAuthError('');
        const newUser = {email,displayName:name};
        setUser(newUser);
        //save user to database
        saveUser(email,name,'POST');
        //send name to firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
        }).catch((error) => {
        }); 
        navigate('/');
      })
      .catch((error) => {
        setAuthError(error.message);
        // ..
      })
      .finally(()=>setIsLoading(false));

}
 const loginUser = (email,password,location,navigate)=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const destination = location?.state?.from || '/';
       navigate(destination);
      setAuthError('');
    })
    .catch((error) => {
        setAuthError(error.message);
    })
    .finally(()=>setIsLoading(false));

 }
 //google sign in 
const signInWithGoogle = (location,navigate) =>{
  setIsLoading(true);
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const user = result.user;
    saveUser(user.email,user.displayName,'PUT');
    setAuthError('');
    const destination = location?.state?.from || '/';
    navigate(destination);
  }).catch((error) => {
    setAuthError(error.message);

  })
  .finally(()=>setIsLoading(false));
}
useEffect(()=>{
  const unsubcribe=  onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          getIdToken(user)
          .then(idToken=>{
            setToken(idToken)
          })
        } else {
          setUser({})
        }
        setIsLoading(false);
      });
      return ()=>unsubcribe;
},[])
useEffect(()=>{
  fetch(`https://protected-brook-65806.herokuapp.com/users/${user.email}`)
  .then(res=>res.json())
  .then(data=>setAdmin(data.admin))
},[user.email])
const logOut = () =>{
   
    signOut(auth).then(() => {
      setIsLoading(true);
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      })
      .finally(()=>setIsLoading(false));

}
const saveUser = (email,displayName,method) =>{
    const user = {email,displayName};
    fetch(`https://protected-brook-65806.herokuapp.com/users`,{
      method: method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then()
}
  return{
      user,
      admin,
      isLoading,
      token,
      registerUser,
      logOut,
      loginUser,
      authError,
      signInWithGoogle
  }
  }
export default useFirebase;