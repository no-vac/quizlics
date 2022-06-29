import { RequestOptions } from "./musixmatch.types";
const apikey: string = process.env.NEXT_PUBLIC_MUSIX_KEY || "";

/**
 * send request to MUSIX api
 * @param options request options based on custom RequestOptions type
 * @returns json data object
 */
async function sendRequest(options: RequestOptions): Promise<any> {
  let { baseURL, query, endpoint, method, headers, body } = options;

  //set defaults
  baseURL = baseURL ? baseURL : "http://api.musixmatch.com/ws/1.1";
  method = method ? method : "GET";

  //build query string
  let ar: Array<any> = [];
  for (const option in query) {
    ar.push(`${option}=${(query as any)[option]}`);
  }
  ar.push(`apikey=${apikey}`);
  let queryString: string = "?" + ar.join("&");

  //send request
  const response: Response = await fetch(baseURL + endpoint + queryString, {
    method,
    body,
    headers,
  });

  //parse and return data
  const data: any = await response.json();
  return data;
}

export const MusixAPI = {
  searchSong: async () => {
    const data = await sendRequest({endpoint:"/track", query:{q_track:"numb",q_artist:"linkin park"}})
    console.log('song data',data);
  },
};
