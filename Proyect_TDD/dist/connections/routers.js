'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../utils/services");
const joi = require('joi');
const cors = require('cors');
module.exports = [
    {
        method: 'POST',
        path: '/REGISTER',
        config: {
            validate: {
                payload: {
                    name: joi.string(),
                    lastname: joi.string(),
                    email: joi.string(),
                    password: joi.string()
                }
            }
        },
        handler: async (request, h) => {
            try {
                const message = await services_1.userRegistration(request.payload.name, request.payload.lastname, request.payload.email, request.payload.password);
                return h.response(message);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }
    },
    {
        method: 'POST',
        path: '/',
        config: {
            validate: {
                payload: {
                    name: joi.string()
                }
            }
        },
        handler: async (request, h) => {
            try {
                console.log(request.payload.name);
                const message = await services_1.userFilter(request.payload.name);
                return h.response(message);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }
    }
];
//# sourceMappingURL=routers.js.map