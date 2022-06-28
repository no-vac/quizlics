import { useStore } from "./store";

const redirect_uri: string = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECTURI || "";
const client_id: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID || "";
const client_secret: string = process.env.NEXT_PUBLIC_SPOTIFY_SECRET || "";

interface RequestOptions {
  endpoint: string;
  baseURL?: string;
  method?: string;
  headers?: HeadersInit;
  body?: string;
}

interface UserToken {
  token:string;
  refreshToken:string;
}

/**
 * 
 * @param options json object with request options (endpoint, baseURL, method, headers, and body)
 * @returns Promise with json object of the response
 */
async function sendRequest(options: RequestOptions): Promise<any> {
  let { baseURL, endpoint, method, headers, body } = options;
  const userToken = useStore.getState().userToken;

  //setting defaults
  baseURL = baseURL ? baseURL : "https://api.spotify.com/v1";
  method = method ? method : "GET";

  const response: Response = await fetch(baseURL + endpoint, {
    method,
    body,
    headers: headers
      ? headers
      : {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
  });
  const data: any = await response.json();
  
  //handle http error response
  if(!response.ok){

    //token invalid or expired
    if(response.status==400){
      useStore.setState({sbAuthenticated:false});
    }

    const error = (data && data?.message) || response.status;
    return Promise.reject(error);
  }
  return data;
}

export const SpotifyAPI = {
  /**
   * Get current Spotify user info
   * @returns Promise with json object with user info
   */
  getCurrentUser: async () => {
    const data = await sendRequest({ endpoint: "/me" }).catch(error=>{
      return Promise.reject(error);
    });
    return data;
  },

  /**
   * generate user authentication request link to get code used to get token and refresh token
   */
  generateUserAuthURL: ():string => {
    const authorizeUrl = "https://accounts.spotify.com/authorize";
    let url = authorizeUrl;
    url += `?client_id=${client_id}`;
    url += `&response_type=code`;
    url += `&redirect_uri=${encodeURI(redirect_uri)}`;
    url += `&show_dialog=true`;
    url += `&scope=user-top-read user-read-private playlist-read-private user-read-email user-library-read playlist-read-collaborative`;
    return url;
  },


  /**
   * Request user auth token and refresh token
   * @param code code recieved from user authentication callback
   * @returns json with auth token and refresh token
   */
  requestAccessToken: async (code: string):Promise<UserToken> => {
    const options: RequestOptions = {
      baseURL: "https://accounts.spotify.com",
      endpoint: "/api/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
    };
    const data = await sendRequest(options);
    return { token: data.access_token, refreshToken: data.refresh_token };
  },

  /**
   * Get Current User's playlists
   * @returns json data with user playlists
   */
  //TODO: create return type for user playlists
  //TODO: figure out pagination
  getCurrentUserPlaylists: async () =>{
    const data = await sendRequest({ endpoint: "/me/playlists" });
    console.log('data',data);
    return data;
  }
};
