import getDataFromCommerceTool from "../service/resolverService";
const apiClientResolver = {
    Query: {
        async apiClients(_: any, __: any, contextValue: { req: { body: { query: any; variables: any; }; }; }) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.apiClients;
            } catch (error) {
                console.log(error);
            }
        },

        async apiClient(_: any, args: any, contextValue: { req: { body: { query: any; variables: any; }; }; }) {
            try {
                const { query, variables } = contextValue.req.body;
                const data = await getDataFromCommerceTool({ query, variables });
                return data.apiClient;
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default apiClientResolver;