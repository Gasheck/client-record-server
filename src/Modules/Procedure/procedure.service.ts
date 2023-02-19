import { getRepository } from "typeorm";
import { Service } from "typedi";
import { Procedure } from "./procedure.model";
import { ProcedureInput } from "./dto/procedure.input";

@Service()
export default class ProcedureService {
    async findAll() {
        return getRepository(Procedure).find({
            relations: ["masters"],
        });
    }

    findOneById(id: number) {
        return getRepository(Procedure).findOne(id, { relations: ["masters"] });
    }

    findByMasterId(masterId: number) {
        return getRepository(Procedure)
            .createQueryBuilder("procedure")
            .innerJoin(
                "procedure.masters",
                "master",
                "master.id IN (:...masterIds)",
                { masterIds: [masterId] }
            )
            .getMany();
    }

    async save(data: ProcedureInput): Promise<Procedure> {
        const { masterIds, ...procedure } = data;

        const masters = masterIds.map((id) => ({ id }));

        const { id } = await getRepository(Procedure).save({
            ...procedure,
            masters,
        });

        /**
         * TODO: refactor this after typeOrm implements a feature of returning the whole saved entity:
         * https://github.com/typeorm/typeorm/pull/5680
         */
        return this.findOneById(id);
    }

    async delete(id: number): Promise<boolean> {
        const { affected } = await getRepository(Procedure).delete(id);
        return !!affected;
    }
}
