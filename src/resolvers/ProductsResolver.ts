import getDataFromCommerceTool from "../service/resolverService";
const productResolver = {
    Query: {
        async products(_: any, __: any, contextValue: { req: { body: { query: any; variables: any; }; }; }) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.products;
            } catch (error) {
                console.log(error);
            }
        },

        async product(_: any, args: any, contextValue: { req: { body: { query: any; variables: any; }; }; }) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.product;
            } catch (error) {
                console.log(error);
            }
        },

        async productTypes(_: any, args: any, contextValue: { req: { body: { query: any; variables: any; }; }; }) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.productTypes;
            } catch (error) {
                console.log(error);
            }
        },

    },


    Mutation: {
        createProduct: async (_: any, __: any, contextValue: { req: { body: { query: any, variables: any }; }; }) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.createProduct;
            } catch (error) {
                throw error;
            }
        },

        createProductType: async (_: any, __: any, contextValue: { req: { body: { query: any, variables: any }; }; }) => {
            try {

                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.createProductType;
            } catch (error) {
                console.log(error)
                throw error;
            }
        },

        deleteProduct: async (_: any, __: any, contextValue: { req: { body: { query: any, variables: any }; }; }) => {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.deleteProduct;
            } catch (error) {
                console.log(error)
                throw error;
            }
        },


    },
};

export default productResolver;