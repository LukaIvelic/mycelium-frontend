import { UsersService } from "@/api/services/user-service/user-service";
import { CreateUserPayload } from "@/api/services/user-service/user-service.types";

export function useUsers() {
    const usersService = new UsersService();

    const findMe = () => usersService.findMe();
    const findOne = (id: string) => usersService.findOne(id);
    const create = (payload: CreateUserPayload) => usersService.create(payload);
    const update = (id: string, payload: CreateUserPayload) => usersService.update(id, payload);
    const invalidate = (id: string) => usersService.invalidate(id);
    const findProjectsById = (id: string) => usersService.findProjectsById(id); 
    const getProjectsCount = (id: string) => usersService.findProjectsById(id).then(projects => projects.length);

    return {
        findMe,
        findOne,
        create,
        update,
        invalidate,
        findProjectsById,
        getProjectsCount
    }
}