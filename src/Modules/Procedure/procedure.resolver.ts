import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import ProcedureService from "./procedure.service";
import { Procedure } from "./procedure.model";
import { ProcedureInput } from "./dto/procedure.input";

@Service()
@Resolver(Procedure)
export class ProcedureResolver {
    constructor(private procedureService: ProcedureService) {}

    @Query(() => [Procedure])
    procedures() {
        return this.procedureService.findAll();
    }

    @Query(() => Procedure)
    procedure(@Arg("id", () => ID) id: number) {
        return this.procedureService.findOneById(id);
    }

    @Query(() => [Procedure])
    procedureByMaster(@Arg("masterId", () => ID) masterId: number) {
        return this.procedureService.findByMasterId(masterId);
    }

    @Mutation(() => Procedure)
    createProcedure(@Arg("inputProcedure") newProcedure: ProcedureInput) {
        return this.procedureService.save(newProcedure);
    }

    @Mutation(() => Procedure)
    updateProcedure(@Arg("inputProcedure") inputProcedure: ProcedureInput) {
        return this.procedureService.save(inputProcedure);
    }

    @Mutation(() => Boolean)
    deleteProcedure(@Arg("id", () => ID) id: number) {
        return this.procedureService.delete(id);
    }
}
