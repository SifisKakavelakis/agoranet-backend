import { User } from './user.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';

User.belongsToMany(Role, {
    through:    UserRole,
    foreignKey: 'user_id',
    otherKey:   'role_id',
    as:         'roles',
});

Role.belongsToMany(User, {
    through:    UserRole,
    foreignKey: 'role_id',
    otherKey:   'user_id',
    as:         'users',
});

export { User, Role, UserRole };