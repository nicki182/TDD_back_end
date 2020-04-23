"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const mutations = {
    Mutation: {
        registerUser: async (_, { type }) => {
            return await services_1.userRegistration(type.name, type.lastname, type.email, type.password);
        }
    }
};
exports.default = mutations;
//# sourceMappingURL=mutations.js.map