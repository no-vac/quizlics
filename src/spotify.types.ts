export interface RequestOptions {
  /** request url endpoint */
  endpoint: string;
  /** optionsal baseURL if different from default */
  baseURL?: string;
  /** optional request method. default = GET */
  method?: string;
  /** optional request headers */
  headers?: HeadersInit;
  /** optional request body */
  body?: string;
}

export interface Playlist {
  /** playlist name */
  name: String;
  /** spotify playlist id */
  id: String;
}
export interface PlayLists {
  /** Playlist array */
  items: Array<Playlist>;
  /** size of response array for pagination */
  limit?: number;
  /** offset for pagination */
  offset?: number;
  /** previous offset for pagination */
  previous?: number;
}

export interface UserToken {
  /** spotify user access token */
  token: string;
  /** spotify user refresh token */
  refreshToken?: string;
}
