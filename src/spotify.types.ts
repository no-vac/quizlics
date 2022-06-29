export interface RequestOptions {
  endpoint: string;
  baseURL?: string;
  method?: string;
  headers?: HeadersInit;
  body?: string;
}

export interface Playlist {
  name: String;
  id: String;
}
export interface PlayLists {
  items: Array<Playlist>;
  limit?: number;
  offset?: number;
  previous?: number;
}

export interface UserToken {
  token: string;
  refreshToken: string;
}
