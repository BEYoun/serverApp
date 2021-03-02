import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async () => {
    const conn = await createConnection();
    const app = express();


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false
        }),
        context: ({ req, res }) => ({
            req,
            res
        })
    })
    apolloServer.applyMiddleware({ app });

    app.listen(5000, () => {
        console.log("server started on locaddddlhost:5000");
    });
}


main().catch((err) => {
    console.error(err);
});