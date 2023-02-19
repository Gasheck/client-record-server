import {Arg, ID, Query, Resolver} from "type-graphql";
import {Channel} from "./channel.model";
import {Service} from "typedi";
import {ChannelService} from "./channel.service";

@Service()
@Resolver(Channel)
export class ChannelResolver {
    constructor(private channelService: ChannelService) {}

    @Query(() => [Channel])
    channels() {
        return this.channelService.findAll();
    }

    @Query(() => Channel)
    channel(@Arg("id", () => ID) id: number) {
        return this.channelService.findOneById(id);
    }
}
