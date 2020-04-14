'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../utils/services");
const joi = require('joi');
module.exports = [
    {
        method: 'POST',
        path: '/',
        config: {
            validate: {
                payload: {
                    name: joi.string(),
                    lastname: joi.string(),
                    email: joi.string()
                }
            }
        },
        handler: async (request, h) => {
            try {
                const message = await services_1.userRegistration(request.payload.name, request.payload.lastname, request.payload.email);
                return h.response(message);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }
    }
];
