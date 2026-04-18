import { User } from "@/lib/types/user";
import { apiClient, ApiClient } from "../../api-client";
import { CreateUserPayload, UpdateUserPayload } from "./user-service.types";
import { Project } from "@/lib/types/project";

export class UsersService {
  private apiClient: ApiClient = apiClient;

  async findMe() {
    return this.apiClient.get<User>("/users/me");
  }

  async findOne(id: string) {
    return this.apiClient.get<User>(`/users/${id}`);
  }

  async create(payload: CreateUserPayload) {
    return this.apiClient.post<User>("/users", payload);
  }

  async update(id: string, payload: UpdateUserPayload) {
    return this.apiClient.patch<User>(`/users/${id}`, payload);
  }

  async invalidate(id: string) {
    return this.apiClient.delete<void>(`/users/${id}`);
  }

  async findProjectsById(id: string) {
    return this.apiClient.get<Project[]>(`/users/${id}/projects`);
  }
}
