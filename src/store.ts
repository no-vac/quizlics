import create from "zustand";
interface UserState {
    userName: string;
    userToken: string;
    userRefreshToken:string;
    setUserName: (name:string)=>void;
    setUserToken:(token:string)=>void;
    setUserRefreshToken:(token:string)=>void;
}

export const useStore = create<UserState>((set)=>({
    userName:"",
    userToken:"",
    userRefreshToken:"",
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

}))
