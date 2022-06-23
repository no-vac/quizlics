import { useStore } from "./store";
import Router from "next/router";

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

async function sendRequest({
  baseURL,
  endpoint,
  method,
  headers,
  body,
}: RequestOptions) {
  const userToken = useStore.getState().userToken;
  // console.log('token', userToken);

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
  return data;
}

export const SpotifyAPI = {
  getCurrentUser: () => {
    sendRequest({ endpoint: "/me" });
  },
  requestUserAuth: () => {
    // const clientSecret = process.env.SPOTIFY_TOKEN;
    const authorizeUrl = "https://accounts.spotify.com/authorize";
    let url = authorizeUrl;
    url += `?client_id=${client_id}`;
    url += `&response_type=code`;
    url += `&redirect_uri=${encodeURI(redirect_uri)}`;
    url += `&show_dialog=true`;
    url += `&scope=user-top-read user-read-private playlist-read-private user-read-email user-library-read playlist-read-collaborative`;
    Router.push(url);
  },
  requestAccessToken: async (code: string) => {
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
};
