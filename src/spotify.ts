import { useStore } from "./store";
import { RequestOptions, UserToken, PlayLists, Playlist } from "./spotify.types";

const redirect_uri: string = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECTURI || "";
const client_id: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID || "";
const client_secret: string = process.env.NEXT_PUBLIC_SPOTIFY_SECRET || "";


/**
 * send request to spotify API
 * @param options json object with request options (endpoint, baseURL, method, headers, and body)
 * @returns Promise with json object of the response
 */
async function sendRequest(options: RequestOptions): Promise<any> {
  let { baseURL, endpoint, method, headers, body } = options;
  const userToken = useStore.getState().userToken;

  //setting defaults
  baseURL = baseURL ? baseURL : "https://api.spotify.com/v1";
  method = method ? method : "GET";

  const fetchoptions = {
    method,
    body,
    headers: headers
      ? headers
      : {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
  }
  const response: Response = await fetch(baseURL + endpoint, fetchoptions );
  let data: any = await response.json();
  
  //handle http error response
  if(!response.ok){
    //token invalid
    if(response.status==400){
      useStore.setState({sbAuthenticated:false});
    }
    //token expired
    if(response.status==401){
      //refresh token
      const token = SpotifyAPI.requestNewAccessToken();
      useStore.setState({userToken:token.toString()});

      const response: Response = await fetch(baseURL + endpoint, fetchoptions );
       data = await response.json();

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
    url += `&scope=user-top-read user-read-private playlist-read-private user-library-read playlist-read-collaborative`;
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

  requestNewAccessToken: async ():Promise<string>=>{
    const refresh_token = useStore.getState().userRefreshToken;
    const options: RequestOptions = {
      baseURL: "https://accounts.spotify.com",
      endpoint: "/api/refresh_token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      body: `grant_type=refresh_token&refresh_token=${refresh_token}`,
    };
    const data = await sendRequest(options);
    return data.access_token;
  },

  /**
   * Get Current User's playlists
   * @returns json data with user playlists
   */
  //TODO: figure out pagination
  getCurrentUserPlaylists: async () =>{
    const data = await sendRequest({ endpoint: "/me/playlists" });
    const playlists:PlayLists = {items:[], offset:data.offset,limit:data.limit, previous:data.previous};
    data.items.map((pl:any)=>{
      const playlist:Playlist = {name:pl.name, id:pl.id}
      playlists.items.push(playlist);
    })
    return playlists;
  }
};
