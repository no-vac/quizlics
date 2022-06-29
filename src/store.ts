import create from "zustand";
import { persist } from "zustand/middleware";
import { UserState } from "./store.types";


export const useStore = create(persist<UserState>((set)=>({
    sbAuthenticated:false,
    userName:"",
    userToken:"",
    userRefreshToken:"",
    setSBAuthenticated: (authed:boolean)=>{
        set((state)=>({
            sbAuthenticated:authed
        }))
    },
    setUserName: (name: string) => {
        set((state) => ({
          userName:name
        }));
      },
    setUserToken:(token:string)=>{
        set((state)=>({
            userToken:token
        }))
    },
    setUserRefreshToken:(token:string)=>{
        set((state)=>({
            userRefreshToken:token
        }))
    },

}),{name:'quizlics-store'}));
