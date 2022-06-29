export interface UserState {
    /** is user Signed in with Spotify */
    sbAuthenticated:boolean;
    /** Spotify User Name */
    userName: string;
    /** Spotify User Auth Token */
    userToken: string;
    /** Spotify User Refresh Token */
    userRefreshToken:string;
    /** setter for sbAuthenticated */
    setSBAuthenticated: (sbAuthenticated:boolean)=>void;
    /** setter for userName */
    setUserName: (name:string)=>void;
    /** setter for userToken */
    setUserToken:(token:string)=>void;
    /** setter for userRefreshToken */
    setUserRefreshToken:(token:string)=>void;
}