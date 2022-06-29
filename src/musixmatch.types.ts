export interface RequestOptions {
  endpoint: string;
  query?: QueryOptions;
  baseURL?: string;
  method?: string;
  headers?: HeadersInit;
  body?: string;
}

export interface QueryOptions {
  q_track?: string;
  q_artist?: string;
  apikey?: string;
}
