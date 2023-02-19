import {getRepository} from "typeorm";
import {Service} from "typedi";
import {Channel} from "./channel.model";

@Service()
export class ChannelService {
    findAll() {
        return getRepository(Channel).find();
    }

    findOneById(id: number) {
        return getRepository(Channel).findOne(id);
    }
}
