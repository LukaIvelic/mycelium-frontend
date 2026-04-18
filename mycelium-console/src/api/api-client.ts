import { HttpMethod } from "@/lib/types/web-api";
import { BASE_API_URL } from "@/lib/constants/routes";
import { tokenStorage } from "./token-storage";

export class ApiClient {
    private readonly baseUrl: string = BASE_API_URL;

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        return this.request<T>(endpoint, HttpMethod.GET, undefined, params);
    }

    async post<T, B = unknown>(endpoint: string, body: B): Promise<T> {
        return this.request<T>(endpoint, HttpMethod.POST, body);
    }

    async patch<T, B = unknown>(endpoint: string, body: B): Promise<T> {
        return this.request<T>(endpoint, HttpMethod.PATCH, body);
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, HttpMethod.DELETE);
    }

    private async request<T>(
        endpoint: string, 
        method: HttpMethod, 
        body?: unknown, 
        params?: Record<string, any>
    ): Promise<T> {
        const url = this.buildUrl(endpoint, params);
        const includeBody = body !== undefined;
        const headers = this.getHeaders(includeBody);

        const response = await fetch(url, {
            method,
            headers,
            ...(includeBody && { body: JSON.stringify(body) }),
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${text}`);
        }

        return text ? JSON.parse(text) : ({} as T);
    }

    private getHeaders(includeBody: boolean = false): HeadersInit {
        const base: Record<string, string> = {
            "Accept": "application/json",
            ...(includeBody && { "Content-Type": "application/json" }),
        };

        if (typeof window === "undefined") {
            return base;
        }

        const token = tokenStorage.getToken();

        return {
            ...base,
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

    private buildUrl(
        endpoint: string,
        params?: Record<string, any>
    ): string {
        const url = new URL(`${this.baseUrl}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if(value === undefined || value === null) return;
                url.searchParams.append(key, String(value));
            });
        }

        return url.toString();
    }
}

export const apiClient = new ApiClient();