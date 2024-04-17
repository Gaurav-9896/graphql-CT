"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const CTtoken_1 = require("./CTtoken");
const getDataFromCommerceTool = async ({ query, variables }) => {
    try {
        const accessToken = await (0, CTtoken_1.getAccessToken)();
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
        const resp = (await (0, axios_1.default)(config)).data;
        return resp.data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = getDataFromCommerceTool;
