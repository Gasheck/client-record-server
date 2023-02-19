import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Client } from "./client.model";
import { ClientService } from "./client.service";
import { Master } from "../Master/master.model";
import { ClientInput } from "./dto/client.input";

@Service()
@Resolver(Client)
export class ClientResolver {
    constructor(private clientService: ClientService) {}

    @Query(() => [Client])
    clients() {
        return this.clientService.findAll();
    }

    @Query(() => Client)
    client(@Arg("id", () => ID) id: number) {
        return this.clientService.findOneById(id);
    }

    @Mutation(() => Client)
    createClient(@Arg("inputClient") newClient: ClientInput) {
        return this.clientService.save(newClient);
    }

    @Mutation(() => Master)
    updateClient(@Arg("inputClient") inputClient: ClientInput) {
        return this.clientService.save(inputClient);
    }

    @Mutation(() => Boolean)
    deleteClient(@Arg("id", () => ID) id: number) {
        return this.clientService.delete(id);
    }
}
