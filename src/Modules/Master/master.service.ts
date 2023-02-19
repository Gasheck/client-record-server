import { getRepository } from "typeorm";
import { Master } from "./master.model";
import { Service } from "typedi";
import { MasterInput } from "./dto/master.input";

@Service()
export default class MasterService {
    findAll() {
        return getRepository(Master).find();
    }

    findOneById(id: number) {
        return getRepository(Master).findOne(id, { relations: ["procedures"] });
    }

    async save(data: MasterInput): Promise<Master> {
        const { procedureIds, ...master } = data;

        const procedures = procedureIds.map((id) => ({ id }));

        const { id } = await getRepository(Master).save({
            ...master,
            procedures,
        });

        /**
         * TODO: refactor this after typeOrm implements a feature of returning the whole saved entity:
         * https://github.com/typeorm/typeorm/pull/5680
         */
        return this.findOneById(id);
    }

    async delete(id: number): Promise<boolean> {
        const { affected } = await getRepository(Master).delete(id);
        return !!affected;
    }
}
