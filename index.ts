import "reflect-metadata";
import express from "express";
import multer from "multer";
import { createConnection } from "typeorm";
import { Container } from "typedi";
import { buildSchema } from "type-graphql";
import { AppointmentResolver } from "./src/Modules/Appointment/appointment.resolver";
import { ClientResolver } from "./src/Modules/Client/client.resolver";
import { MasterResolver } from "./src/Modules/Master/master.resolver";
import { ChannelResolver } from "./src/Modules/Channel/channel.resolver";
import { UserResolver } from "./src/Modules/User/user.resolver";
import { ApolloServer } from "apollo-server-express";
import { ProcedureResolver } from "./src/Modules/Procedure/procedure.resolver";
import { MediaService } from "./src/Modules/Media/media.service";

require('dotenv-flow').config();

const upload = multer({ dest: "uploads/" });

createConnection().then(() => {
    async function startServer() {
        const app = express();

        app.post(
            "/gallery/upload",
            upload.array("media", 12),
            function (req, res, next) {
                // req.files is array of `photos` files
                // req.body will contain the text fields, if there were any
                // console.log(1111111, req.files);

                const s = new MediaService();

                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                s.save(req.files);
            }
        );

        const schema = await buildSchema({
            resolvers: [
                ClientResolver,
                AppointmentResolver,
                MasterResolver,
                ChannelResolver,
                UserResolver,
                ProcedureResolver,
            ],
            container: Container,
        });

        const apolloServer = new ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
        });
        await apolloServer.start();
        apolloServer.applyMiddleware({ app });
        app.use((req, res) => {
            res.status(200);
            res.send("Hello!");
            res.end();
        });

        // @ts-ignore
        await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
        console.log(
            `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
        );
        return { apolloServer, app };
    }

    startServer().catch((reason) => console.log(reason));
});
