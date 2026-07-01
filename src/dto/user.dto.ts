import { RoleDTO } from "./role.dto";

export interface CreateUserDTO {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UpdateUserDTO {
  password?:    string;
  email?:       string;
  firstName?:   string;
  lastName?:    string;
  phoneNumber?: string;
  avatarUrl?:   string;
}

export interface UserResponseDTO {
  id:           number;
  username:     string;
  email:        string;
  firstName:    string;
  lastName:     string;
  phoneNumber?: string | null;
  avatarUrl?:   string | null;
  isActive:     boolean;
  roles?:       RoleDTO[];
  createdAt:    Date;
  updatedAt:    Date;
}