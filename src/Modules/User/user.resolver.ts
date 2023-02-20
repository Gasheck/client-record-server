import {Arg, Ctx, ID, Int, Mutation, Query, Resolver} from "type-graphql";
import { Service } from "typedi";
import { hash, compare } from "bcryptjs";
import { User } from "./user.model";
import UserService from "./user.service";
import { LoginResponse } from "./dto/login-response";
import { sendRefreshToken } from "./auth/sendRefreshToken";
import { createAccessToken } from "./auth/createAccessToken";
import { verify } from "jsonwebtoken";
import { UserInputError } from "apollo-server-express";
import { Context } from "../../Types/Context";

@Service()
@Resolver(User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => User, { nullable: true })
    me(@Ctx() context: Context) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(
                token,
                process.env.AUTH_ACCESS_TOKEN_SECRET!
            );
            return User.findOne(payload.userId);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }) {
        sendRefreshToken(res, "");

        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("userId", () => ID) userId: string) {
        await this.userService.incrementTokenVersion(userId);
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string
        // @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UserInputError("could not find user");
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new UserInputError("bad password");
        }

        // login successful
        // sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
            user,
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            throw new UserInputError("User with this email already exists");
        }

        const hashedPassword = await hash(password, 12);
        return this.userService.add(email, hashedPassword);
    }
}
