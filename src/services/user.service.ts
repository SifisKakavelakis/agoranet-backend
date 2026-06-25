import { IUser, User } from "../models/user.model";

export const createUser = async (payload: IUser) => {
    console.log("Service Payload", payload);
    const user = await User.create({
        username: payload.username,
        password: payload.password,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        roleId: 2
    });
    console.log("New user: ", user);
    return user;
}