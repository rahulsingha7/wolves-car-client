import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut,  createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification, updateProfile  } from "firebase/auth";
import { useState, useEffect } from "react";
import initializeFirebase from "../Login/Firebase/Firebase.init";

initializeFirebase();

const useFirebase =() =>{
    const [user,setUser]= useState({});
    const [name,setName] =useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const auth= getAuth();
    const registerNewUser = () =>{
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      if (!/(?=.*[0-9].*[0-9])/.test(password)) {
        setError('Password Must Contain 2 digits');
        return;
      }
     return createUserWithEmailAndPassword(auth, email, password)
      // .then(result=>{
      //   const user=result.user;
      //   setError('');
      //   setSuccess('successfully created account');
      //   verifyEmail();
      //   setUserName();
      // })
      .catch(error => {
        setError(error.message);
      })
     }
    const processLogin = () =>{
      // e.preventDefault();
        if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }
        if (!/(?=.*[0-9].*[0-9])/.test(password)) {
          setError('Password Must Contain 2 digits');
          return;
        }
         return  signInWithEmailAndPassword(auth, email, password)
      // .then(result=>{
       
      //   setUser(result.user);
      //   setError('');
      //   setUserName();
      //   setSuccess('successfully logged in')
        
      // })
      .catch(error => {
        setError(error.message);
      })
  
     }
     const handleNameChange = e =>{
      setName(e.target.value);
    }
    const handleEmailChange = e => {
      setEmail(e.target.value);
    }
    const handlePasswordChange = e => {
      setPassword(e.target.value);
    }

    const verifyEmail= () =>{
      sendEmailVerification(auth.currentUser)
      .then(result=>{
        
      })
    }
    const setUserName = () =>{
      updateProfile (auth?.currentUser,{displayName: name})
      .then(result=>{
      })
    }
   
 

       //google sign in
    const signInUsingGoogle = () =>{
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();
       return  signInWithPopup(auth,googleProvider)
      
        .finally(()=>setIsLoading(false));
    }
    useEffect(()=>{
        const unsubscribed = onAuthStateChanged(auth,user=>{
            if(user){
                setUser(user);
            }
            else{
                setUser({});
            }
            setIsLoading(false);
        });
        return ()=>unsubscribed;
    },[])
    const logOut =()=>{
        setIsLoading(true);
        signOut(auth)
        .then(()=>{ })
        .finally(()=>setIsLoading(false));

    }
    
    return{
        user,
        isLoading,
        signInUsingGoogle,
        logOut,
        error,
        handleEmailChange,
        handlePasswordChange,
        handleNameChange,
        processLogin,
        registerNewUser,
    }
  }
export default useFirebase;