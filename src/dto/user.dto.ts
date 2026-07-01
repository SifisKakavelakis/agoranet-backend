import { RoleDTO } from "./role.dto";

export interface CreateUserDTO {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
}

export interface UpdateUserDTO {
  password?:    string;
  email?:       string;
  firstname?:   string;
  lastname?:    string;
  phoneNumber?: string;
  avatarUrl?:   string;
}

export interface UserResponseDTO {
  id:           number;
  username:     string;
  email:        string;
  firstname:    string;
  lastname:     string;
  phoneNumber?: string | null;
  avatarUrl?:   string | null;
  isActive:     boolean;
  roles?:       RoleDTO[];
  createdAt:    Date;
  updatedAt:    Date;
}