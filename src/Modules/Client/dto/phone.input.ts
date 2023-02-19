import {Field, InputType} from "type-graphql";

@InputType()
export class PhoneInput {
    @Field()
    value: string;

    // @Field()
    // client: number;
}
