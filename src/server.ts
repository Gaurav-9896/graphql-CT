import { ApolloServer } from '@apollo/server';
import dotenv from 'dotenv'
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor } from "@graphql-tools/wrap";
import lodash from 'lodash';
import { getAccessToken } from './service/CTtoken';
import customerResolvers from './resolvers/customerResolver';
import productResolvers from './resolvers/ProductsResolver';
import {ApolloServerPluginLandingPageLocalDefault} from "@apollo/server/plugin/landingPage/default";


   async function startServer() {
    
    dotenv.config();
  
    try {
        const remoteSchemaURL = `${process.env.DEV_API_URL}/${process.env.DEV_PROJECT_KEY}/graphql`;
       
        const accessToken = await getAccessToken();
        console.log(accessToken);
        const remoteExecutor = buildHTTPExecutor({
            endpoint: remoteSchemaURL,
            headers: {
                'authorization': 'Bearer ' + accessToken
            }
        });
        const subschema = {
            schema: await schemaFromExecutor(remoteExecutor),
            executor: remoteExecutor
        };
        const schema = makeExecutableSchema({
            typeDefs: subschema.schema,
            resolvers: lodash.merge(
                customerResolvers,
                productResolvers
            )
        });
      

        const server = new ApolloServer({
            schema,
          
            introspection: true
        });

        const app = express();
        app.use(express.json());
        app.use(cors({
            origin: '*', // Allow requests from all domains
            credentials: true, // Enable CORS response for requests with credentials
        }));
        

        await server.start();
        app.use('/graphql', expressMiddleware(server,{context: async({ req }) => ({ req })}));

        app.listen(8000, () => console.log('Server started at port 8000'));
    } catch (error) {
        console.log("Internal Server Error", error);
    }
}



startServer().catch(error => {
    console.error('Error starting the server:', error);
});
