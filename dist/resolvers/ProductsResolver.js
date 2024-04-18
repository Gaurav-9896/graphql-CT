"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolverService_1 = __importDefault(require("../service/resolverService"));
const productResolver = {
    Query: {
        async products(_, __, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.products;
            }
            catch (error) {
                console.log(error);
            }
        },
        async product(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.product;
            }
            catch (error) {
                console.log(error);
            }
        },
        async productTypes(_, args, contextValue) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.productTypes;
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    Mutation: {
        createProduct: async (_, __, contextValue) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.createProduct;
            }
            catch (error) {
                throw error;
            }
        },
        createProductType: async (_, __, contextValue) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.createProductType;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        },
        deleteProduct: async (_, __, contextValue) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await (0, resolverService_1.default)({ query, variables });
                return data.deleteProduct;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
};
exports.default = productResolver;
