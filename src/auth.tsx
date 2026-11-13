import React,{createContext,useContext,useEffect,useState} from 'react';
import {User,onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut} from 'firebase/auth';
import {auth} from './firebase';
import {registerPushToken} from './push';
type C={user:User|null;loading:boolean;login:(e:string,p:string)=>Promise<void>;signup:(e:string,p:string)=>Promise<void>;logout:()=>Promise<void>};
const Context=createContext<C>({user:null,loading:true,login:async()=>{},signup:async()=>{},logout:async()=>{}});
export function AuthProvider({children}:{children:React.ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);
 useEffect(()=>onAuthStateChanged(auth,async u=>{setUser(u);setLoading(false);if(u){try{await registerPushToken();}catch(e){console.warn('Push registration unavailable',e);}}}),[]);
 return <Context.Provider value={{user,loading,login:async(e,p)=>{await signInWithEmailAndPassword(auth,e,p);},signup:async(e,p)=>{await createUserWithEmailAndPassword(auth,e,p);},logout:async()=>{await signOut(auth);}}}>{children}</Context.Provider>;
}
export const useAuth=()=>useContext(Context);
