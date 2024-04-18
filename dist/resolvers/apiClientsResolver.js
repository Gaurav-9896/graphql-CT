"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolverService_1 = __importDefault(require("../service/resolverService"));
const apiClientResolver = {
    Query: {
        async apiClients(_, __, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.apiClients;
            }
            catch (error) {
                console.log(error);
            }
        },
        async apiClient(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.apiClient;
            }
            catch (error) {
                console.log(error);
            }
        }
    }
};
exports.default = apiClientResolver;
