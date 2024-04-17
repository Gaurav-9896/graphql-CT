import getDataFromCommerceTool from "../service/resolverService";
const customerResolvers = {
    Query: {
        async customers(_: any, __: any, contextValue: { req: { body: { query: any; variables: any; }; }; }) {
            try { 
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.customers;
            } catch (error) {
                console.log(error);
            }
        },

        async customer(_: any, args: any, contextValue: { req: { body: { query: any; variables: any; }; }; }) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.customer;
            } catch (error) {
                console.log(error);
            }
        },

    },
    Mutation:{
        createCustomerGroup: async (_: any, __: any, contextValue: { req: { body: { query: any,variables:any }; }; }) => {
            try {
                const { query,variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query,variables});
                return data.createProduct;
            } catch (error) {
                throw error; 
            }},
    
          
        },
};

export default customerResolvers;