import { Service } from "typedi";
import { getRepository } from "typeorm";
import { Media } from "./media.model";

@Service()
export class MediaService {
    findAll(): Promise<Media[]> {
        return getRepository(Media).find({
            relations: ["appointment"],
        });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async save(data) {
        console.log(123, data);
    }
}
