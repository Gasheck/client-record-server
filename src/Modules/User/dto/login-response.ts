import { Field, ObjectType } from "type-graphql";
import { User } from "../user.model";

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}
