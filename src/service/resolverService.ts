import axios from "axios";
import { getAccessToken } from "./CTtoken";


   const  getDataFromCommerceTool= async ({ query, variables }:any) => {
        try {
            const accessToken = await getAccessToken();
            variables = variables || {};
            const data = JSON.stringify({
                query: query,
                variables: Object.keys(variables).length ? variables : {}
            });

            const config = {
                method: 'post',
                url: `${process.env.DEV_API_URL}/${process.env.DEV_PROJECT_KEY}/graphql`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                data
            };
            const resp = (await axios(config)).data;
            return resp.data;
        } catch (error) {
            console.log(error)
        }
   }

   export default getDataFromCommerceTool;