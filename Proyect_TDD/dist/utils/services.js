"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoUser = require('../data/mongodb/user');
function emailVerification(email) {
    if (email.length > 8 && /[0-9]/.test(email) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(email)) {
        return true;
    }
    else {
        return false;
    }
}
exports.emailVerification = emailVerification;
async function userRegistration(name, lastname, email) {
    if (emailVerification(email)) {
        try {
            const user = new mongoUser({
                name: name,
                lastname: lastname,
                email: email,
                status: "Pending Verification"
            });
            await user.save().exec();
        }
        catch (e) {
            return e;
        }
        return "User registered successfully";
    }
    else {
        return "EMAIL FORMAT WRONG";
    }
}
exports.userRegistration = userRegistration;
async function userFind(name) {
    return await mongoUser.findOne({ name: name }).exec();
}
exports.userFind = userFind;
