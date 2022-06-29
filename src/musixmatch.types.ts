export interface RequestOptions {
  /** request url endpoint */
  endpoint: string;
  /** optionsal baseURL if different from default */
  baseURL?: string;
  /** optional query parameters */
  query?: QueryOptions;
  /** optional request method. default = GET */
  method?: string;
  /** optional request headers */
  headers?: HeadersInit;
  /** optional request body */
  body?: string;
}

export interface QueryOptions {
  /** track name */
  q_track?: string;
  /** artist name */
  q_artist?: string;
  /** api key */
  apikey?: string;
}
