import { Service } from "typedi";
import { getConnection } from "typeorm";
import { User } from "./user.model";

@Service()
export default class UserService {
    async findByEmail(email: string) {
        return User.findOne({ where: { email } });
    }

    async add(email: string, hashedPassword: string) {
        try {
            await User.insert({
                email,
                password: hashedPassword,
            });
            return true;
        } catch {
            return false;
        }
    }

    async incrementTokenVersion(userId: string) {
        await getConnection()
            .getRepository(User)
            .increment({ id: userId }, "tokenVersion", 1);
    }
}
