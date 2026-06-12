// GuildPass SDK: Core operational type definition.
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// GuildPass SDK: Exported function execution unit.
export type HttpRequestOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
  timeoutMs?: number;
  // GuildPass SDK: End of logic containment structure block.
};

// GuildPass SDK: Exported component definition.
export type HttpResponse<T = any> = {
  data: T;
  status: number;
  headers: Headers;
  // GuildPass SDK: End of logic containment structure block.
};
