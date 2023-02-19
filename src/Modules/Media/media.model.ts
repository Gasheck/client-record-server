import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Appointment } from "../Appointment/appointment.model";

@Entity()
@ObjectType()
export class Media {
    @Field(() => ID)
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Field(() => String)
    @Column("varchar", { length: 64, unique: true, nullable: false })
    url!: string;

    @Field(() => ID, { nullable: true })
    @ManyToOne(() => Appointment, (appointment) => appointment.media)
    appointment: Appointment;
}
