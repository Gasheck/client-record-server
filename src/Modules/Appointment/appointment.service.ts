import { Appointment } from "./appointment.model";
import { AppointmentInput } from "./dto/appointment.input";
import { getRepository } from "typeorm";
import { Service } from "typedi";

@Service()
export class AppointmentService {
    async findOneById(id: number): Promise<Appointment> {
        return getRepository(Appointment).findOne(id, {
            relations: [
                "client",
                "client.channel",
                "client.phones",
                "master",
                "master.procedures",
                "procedures",
                "media",
            ],
        });
    }

    findAll(): Promise<Appointment[]> {
        return getRepository(Appointment).find({
            relations: [
                "client",
                "client.channel",
                "client.phones",
                "master",
                "master.procedures",
                "procedures",
                "media",
            ],
        });
    }

    async save(data: AppointmentInput): Promise<Appointment> {
        const {
            procedures: procedureIds,
            media: mediaItemsIds,
            ...appointment
        } = data;

        const procedures = procedureIds.map((id) => ({ id: parseInt(id) }));
        const media = mediaItemsIds.map((id) => ({ id: parseInt(id) }));

        const { id } = await getRepository(Appointment).save({
            ...appointment,
            procedures,
            media,
        });

        return this.findOneById(id);
    }

    async delete(id: number): Promise<boolean> {
        const { affected } = await getRepository(Appointment).delete(id);
        return !!affected;
    }
}
