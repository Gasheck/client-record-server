import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Client } from "./client.model";
import { ClientInput } from "./dto/client.input";

@Service()
export class ClientService {
    findAll(): Promise<Client[]> {
        return getRepository(Client).find({
            relations: ["channel", "phones"],
        });
    }

    findOneById(id: number): Promise<Client> {
        return getRepository(Client).findOne(id, {
            relations: ["channel", "phones"],
        });
    }

    async save(data: ClientInput): Promise<Client> {
        const { channel, ...client } = data;

        const phones = client.phones.map((value) => ({
            value,
        }));

        const { id } = await getRepository(Client).save({
            ...client,
            phones,
            channel,
        });
        return this.findOneById(id);
    }

    async delete(id: number): Promise<boolean> {
        const { affected } = await getRepository(Client).delete(id);
        return !!affected;
    }
}
