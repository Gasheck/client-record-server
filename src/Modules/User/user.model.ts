import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Field()
    @Column("text")
    email: string;

    @Column("text")
    password: string;

    @Column("int", { default: 0 })
    tokenVersion: number;
}
