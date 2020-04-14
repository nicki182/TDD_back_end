"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const services_1 = require("../utils/services");
try {
    const uri = 'mongodb://127.0.0.1:27017/TDD';
    const moongose = require("mongoose");
    moongose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}
catch (e) {
    console.log(e);
}
describe('User registration', () => {
    it('verifies if email haves is correct length', () => {
        const email1 = "nicki1@gmail.com";
        const email2 = "papa1()";
        chai_1.expect(services_1.emailVerification(email1)).to.equal(true);
        chai_1.expect(services_1.emailVerification(email2)).to.equal(false);
    });
    it('verifies if email haves 1 number and 1 sign', () => {
        const email1 = "nicki1@gmail.com";
        const email2 = "papafsdsfdfsfsdjfs";
        const email3 = "fdsjjkfkfsjklfd1";
        const email4 = "fsjkjfdskf)";
        chai_1.expect(services_1.emailVerification(email1)).to.equal(true);
        chai_1.expect(services_1.emailVerification(email2)).to.equal(false);
        chai_1.expect(services_1.emailVerification(email3)).to.equal(false);
        chai_1.expect(services_1.emailVerification(email4)).to.equal(false);
    });
    it('verifies if user is registered as Pending Verification once registered', async () => {
        const user1 = {
            name: "nicki",
            lastname: "1",
            email: "nicki1@gmail.com"
        };
        const user2 = {
            name: "BAHHHH",
            lastname: "BAHHHH",
            email: "BAHHH"
        };
        await services_1.userRegistration(user1.name, user1.lastname, user1.email);
        await services_1.userRegistration(user2.name, user2.lastname, user2.email);
        const user_1 = await services_1.userFind(user1.name);
        const user_2 = await services_1.userFind(user2.name);
        chai_1.expect(user_1.status).to.equal('Pending Verification');
        chai_1.expect(user_2).to.equal(null);
    });
});
