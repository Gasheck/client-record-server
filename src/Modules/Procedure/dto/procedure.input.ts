import { Field, InputType } from "type-graphql";

@InputType()
export class ProcedureInput {
    @Field({ nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field(() => [Number])
    masterIds: number[];
}
