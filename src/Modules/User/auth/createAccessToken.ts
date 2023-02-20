import { sign } from "jsonwebtoken";
import { User } from "../user.model";

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.AUTH_ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
    });
};
