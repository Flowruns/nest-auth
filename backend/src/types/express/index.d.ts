import { User } from "../../entitiesPG/user.entity";

declare module "express" {
    export interface Request {
        user?: User;
    }
}
