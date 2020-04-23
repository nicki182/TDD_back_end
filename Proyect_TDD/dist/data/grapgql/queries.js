"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const query = {
    Query: {
        getUser: async (_, { name }) => {
            const user = await services_1.userFind(name);
            return user;
        },
        filterUser: async (_, { name }) => {
            const users = await services_1.userFilter(name);
            return users;
        }
    }
};
exports.default = query;
//# sourceMappingURL=queries.js.map