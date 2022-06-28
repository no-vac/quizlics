import create from "zustand";
import {persist} from "zustand/middleware";
interface UserState {
    sbAuthenticated:boolean;
    userName: string;
    userToken: string;
    userRefreshToken:string;
    setSBAuthenticated: (sbAuthenticated:boolean)=>void;
    setUserName: (name:string)=>void;
    setUserToken:(token:string)=>void;
    setUserRefreshToken:(token:string)=>void;
}

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

}),{name:'userState-storage'}));
