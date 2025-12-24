import { CreateUserDto } from "./CreateUser.dto.js";
export interface UpdateUserDto extends Partial<CreateUserDto> {}
