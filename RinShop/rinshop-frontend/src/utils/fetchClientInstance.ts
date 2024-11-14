import { globalSetting } from '@/constanst/configs';
const URL_API = globalSetting.URL_API;


class HttpClient {
    private baseURL: string;
  
    constructor() {
      this.baseURL = URL_API;
    }
  
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      const url = `${this.baseURL}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
  
      try {
        const response = await fetch(url, { ...options, headers });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Request failed:', error);
        throw error;
      }
    }
  
    async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      return this.request<T>(endpoint, {
        ...options,
        method: 'GET',
      });
    }
  
    async post<T, D>(endpoint: string, data: D, options: RequestInit = {}): Promise<T> {
      return this.request<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
  
    async put<T, D>(endpoint: string, data: D, options: RequestInit = {}): Promise<T> {
      return this.request<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }
  
    async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      return this.request<T>(endpoint, {
        ...options,
        method: 'DELETE',
      });
    }
  }
  // Singleton pattern
  class FetchClient extends HttpClient {
    private static instance: FetchClient;
  
    private constructor() {
      super();
    }
  
    public static getInstance(): FetchClient {
      if (!FetchClient.instance) {
        FetchClient.instance = new FetchClient();
      }
      return FetchClient.instance;
    }
  }
  // Get instance
  const fetchApi = FetchClient.getInstance();
  
  // Prevent new instance creation
  Object.freeze(fetchApi);
  
  export default fetchApi;
  
  // Export type for using in other files
  export type FetchApiType = typeof fetchApi;
