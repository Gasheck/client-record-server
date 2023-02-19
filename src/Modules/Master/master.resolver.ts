import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import MasterService from "./master.service";
import { Service } from "typedi";
import { Master } from "./master.model";
import { MasterInput } from "./dto/master.input";

@Service()
@Resolver(Master)
export class MasterResolver {
    constructor(private masterService: MasterService) {}

    @Query(() => [Master])
    masters() {
        return this.masterService.findAll();
    }

    @Query(() => Master)
    master(@Arg("id", () => ID) id: number) {
        return this.masterService.findOneById(id);
    }

    @Mutation(() => Master)
    createMaster(@Arg("inputMaster") newMaster: MasterInput) {
        return this.masterService.save(newMaster);
    }

    @Mutation(() => Master)
    updateMaster(@Arg("inputMaster") inputMaster: MasterInput) {
        return this.masterService.save(inputMaster);
    }

    @Mutation(() => Boolean)
    deleteMaster(@Arg("id", () => ID) id: number) {
        return this.masterService.delete(id);
    }
}
