"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoUser = require('../data/mongodb/user');
const encrypt = require('bcrypt-nodejs');
function emailVerification(email) {
    return email.length > 8 && /[0-9]/.test(email) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(email) ? true : false;
}
exports.emailVerification = emailVerification;
async function userRegistration(name, lastname, email, password) {
    if (emailVerification(email)) {
        try {
            const salt = await encrypt.genSaltSync(10);
            const encrypt_password = await encrypt.hashSync(password, salt);
            const user = new mongoUser({
                name: name,
                lastname: lastname,
                email: email,
                status: "Pending Verification",
                password: encrypt_password
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
async function userFilter(name) {
    const regex = new RegExp(escapeRegex(name), 'gi');
    const users = await mongoUser.find({ name: regex });
    return users;
}
exports.userFilter = userFilter;
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
;
