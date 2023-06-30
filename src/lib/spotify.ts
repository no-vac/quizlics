import { env } from "~/env.mjs";
import { stringify } from "querystring";
import { v4 as uuidv4 } from 'uuid';

const queryString = stringify({
    client_id: env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: env.NEXT_PUBLIC_SPOTIFY_CLIENT_CALLBACK,
})

const stateKey = 'spotify_auth_state'

const generateStateCookie = (): { stateKey: string, randomId: string } => {
    const randomId = uuidv4();
    return { stateKey, randomId };
}


export default {
    stateKey,
    authURI: `https://accounts.spotify.com/authorize?${queryString}`,
    generateStateCookie
}