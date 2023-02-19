import { Field, InputType } from "type-graphql";

@InputType()
export class MasterInput {
    @Field({ nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field(() => [Number])
    procedureIds: number[];
}
