"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const dotenv_1 = __importDefault(require("dotenv"));
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("@graphql-tools/schema");
const executor_http_1 = require("@graphql-tools/executor-http");
const wrap_1 = require("@graphql-tools/wrap");
const lodash_1 = __importDefault(require("lodash"));
const CTtoken_1 = require("./service/CTtoken");
const customerResolver_1 = __importDefault(require("./resolvers/customerResolver"));
const ProductsResolver_1 = __importDefault(require("./resolvers/ProductsResolver"));
const apiClientsResolver_1 = __importDefault(require("./resolvers/apiClientsResolver"));
async function startServer() {
    dotenv_1.default.config();
    try {
        const remoteSchemaURL = `${process.env.DEV_API_URL}/${process.env.DEV_PROJECT_KEY}/graphql`;
        const accessToken = await (0, CTtoken_1.getAccessToken)();
        console.log(accessToken);
        const remoteExecutor = (0, executor_http_1.buildHTTPExecutor)({
            endpoint: remoteSchemaURL,
            headers: {
                'authorization': 'Bearer ' + accessToken
            }
        });
        const subschema = {
            schema: await (0, wrap_1.schemaFromExecutor)(remoteExecutor),
            executor: remoteExecutor
        };
        const schema = (0, schema_1.makeExecutableSchema)({
            typeDefs: subschema.schema,
            resolvers: lodash_1.default.merge(customerResolver_1.default, ProductsResolver_1.default, apiClientsResolver_1.default)
        });
        const server = new server_1.ApolloServer({
            schema,
            introspection: true
        });
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)({
            origin: '*',
            credentials: true,
        }));
        await server.start();
        app.use('/graphql', (0, express4_1.expressMiddleware)(server, { context: async ({ req }) => ({ req }) }));
        app.listen(8000, () => console.log('Server started at port 8000'));
    }
    catch (error) {
        console.log("Internal Server Error", error);
    }
}
startServer().catch(error => {
    console.error('Error starting the server:', error);
});
