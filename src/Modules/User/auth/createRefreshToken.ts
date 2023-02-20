import { sign } from "jsonwebtoken";
import { User } from "../user.model";

export const createRefreshToken = (user: User) => {
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.AUTH_REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d",
        }
    );
};
