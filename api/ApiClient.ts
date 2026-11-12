
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseURL: string
  ) {}

  async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(`${this.baseURL}${endpoint}`);
  }

  async post(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}${endpoint}`, { data });
  }

  async put(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.put(`${this.baseURL}${endpoint}`, { data });
  }

  async patch(endpoint: string, data: unknown): Promise<APIResponse> {
    return this.request.patch(`${this.baseURL}${endpoint}`, { data });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseURL}${endpoint}`);
  }
}
