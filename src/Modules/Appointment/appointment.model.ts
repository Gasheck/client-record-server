import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm";

import { Field, ID, ObjectType } from "type-graphql";
import { Client } from "../Client/client.model";
import { Master } from "../Master/master.model";
import { Procedure } from "../Procedure/procedure.model";
import { Media } from "../Media/media.model";

@Entity()
@ObjectType()
export class Appointment {
    @Field(() => ID)
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Field(() => String)
    @Column("text")
    complaints!: string;

    @Field(() => Number)
    @Column("bigint")
    date!: number;

    @Field(() => Boolean)
    @Column("boolean", { default: false })
    withCoating: boolean;

    @Field(() => Number)
    @Column("int", { default: 0 })
    price: number;

    @Field(() => String)
    @Column("varchar")
    results!: string;

    @Field(() => String, { nullable: true })
    @Column("varchar", { nullable: true })
    comments: string;

    @Field(() => Client)
    @ManyToOne(() => Client, (client) => client.id, { nullable: false })
    client: Client;

    @Field(() => Master)
    @ManyToOne(() => Master, (master) => master.id, { nullable: false })
    master: Master;

    @Field(() => [Procedure], { nullable: true })
    @ManyToMany(() => Procedure, (procedure) => procedure.id, {
        cascade: true,
        nullable: true,
    })
    @JoinTable()
    procedures?: Procedure[];

    @Field(() => [Media], { nullable: true })
    @OneToMany(() => Media, (media) => media.appointment, {
        cascade: true,
        nullable: true,
    })
    media: Media[];
}
