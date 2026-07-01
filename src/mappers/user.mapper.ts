import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { UserResponseDTO } from '../dto/user.dto';
import { RoleDTO } from '../dto/role.dto';

export const toUserResponseDTO = (user: User): UserResponseDTO => {
    const roles = (user as any).roles?.map((role: Role): RoleDTO => ({
        id:        role.id,
        name:      role.name,
        createdAt: role.createdAt,
    }));

    return {
        id:          user.id,
        username:    user.username,
        email:       user.email,
        firstname:   user.firstName,
        lastname:    user.lastName,
        phoneNumber: user.phoneNumber,
        avatarUrl:   user.avatarUrl,
        isActive:    user.isActive,
        roles:       roles,
        createdAt:   user.createdAt,
        updatedAt:   user.updatedAt,
    };
};