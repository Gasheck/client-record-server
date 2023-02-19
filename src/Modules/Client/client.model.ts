import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    Unique,
    OneToMany,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Channel } from "../Channel/channel.model";
import { Phone } from "../Phone/phone.model";

@Entity()
@ObjectType()
@Unique("UNIQUE_NAMES", ["firstName", "lastName", "middleName"])
// @Unique("UNIQUE_CONTACTS", ["instagramName"])
// @Check(
//     "CHECK_CONTACTS_ALL_NULL",
//     `"phones" is not null OR "instagramName" is not null`
// )
export class Client {
    @Field(() => ID)
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Field(() => String)
    @Column("varchar", { length: 32 })
    firstName!: string;

    @Field(() => String)
    @Column("varchar", { length: 32, default: "" })
    lastName: string;

    @Field(() => String)
    @Column("varchar", { length: 32, default: "" })
    middleName: string;

    @Field(() => String)
    @Column("varchar", { length: 32, nullable: true, unique: true })
    instagramName: string;

    @Field(() => [Phone])
    @OneToMany(() => Phone, (phone) => phone.client, {
        nullable: false,
        cascade: true,
    })
    phones: Phone[];

    @Field(() => Channel)
    @ManyToOne(() => Channel, (channel) => channel.id, { nullable: false })
    channel!: Channel;
}
