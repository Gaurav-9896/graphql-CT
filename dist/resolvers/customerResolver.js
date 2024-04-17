"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolverService_1 = __importDefault(require("../service/resolverService"));
const customerResolvers = {
    Query: {
        async customers(_, __, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.customers;
            }
            catch (error) {
                console.log(error);
            }
        },
        async customer(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.customer;
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    Mutation: {
        createCustomerGroup: async (_, __, contextValue) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.createProduct;
            }
            catch (error) {
                throw error;
            }
        },
    },
};
exports.default = customerResolvers;
