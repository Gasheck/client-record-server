import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Client } from "../Client/client.model";

@Entity()
@ObjectType()
export class Phone {
    @Field(() => ID)
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Field(() => String)
    @Column("varchar", { length: 16, unique: true, nullable: false })
    value!: string;

    @Field(() => ID, { nullable: true })
    @ManyToOne(() => Client, (client) => client.phones)
    client: Client;
}
