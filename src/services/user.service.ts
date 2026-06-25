import { IUser } from "../models/user.model";
import { IRole } from "../models/role.model";

export const createUser = async(payload: IUser) => {
    console.log("Service Payload", payload);
    return payload;
}