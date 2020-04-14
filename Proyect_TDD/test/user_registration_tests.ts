import 'mocha'
import {expect} from 'chai'
import {emailVerification,userRegistration,userFind} from "../utils/services";
try {
    const
        uri = 'mongodb://127.0.0.1:27017/TDD';
    const
        moongose = require("mongoose");
    moongose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}
catch (e)
{
    console.log(e)
}
describe('User registration', () => {
    it('verifies if email haves is correct length',()=>{
        const email1="nicki1@gmail.com"
        const email2="papa1()"
        expect(emailVerification(email1)).to.equal(true)
        expect(emailVerification(email2)).to.equal(false)
    })
    it('verifies if email haves 1 number and 1 sign', ()=>{
        const email1="nicki1@gmail.com"
        const email2="papafsdsfdfsfsdjfs"
        const email3="fdsjjkfkfsjklfd1"
        const email4="fsjkjfdskf)"
        expect(emailVerification(email1)).to.equal(true)
        expect(emailVerification(email2)).to.equal(false)
        expect(emailVerification(email3)).to.equal(false)
        expect(emailVerification(email4)).to.equal(false)
    })
    it('verifies if user is registered as Pending Verification once registered', async ()=>{
        const user1={
            name:"nicki",
            lastname:"1",
            email:"nicki1@gmail.com"
        }
        const user2={
            name:"BAHHHH",
            lastname: "BAHHHH",
            email:"BAHHH"
        }
        await userRegistration(user1.name,user1.lastname,user1.email)
        await userRegistration(user2.name,user2.lastname,user2.email)
        const user_1=await userFind(user1.name)
        const user_2=await userFind(user2.name)
        expect(user_1.status).to.equal('Pending Verification')
        expect(user_2).to.equal(null)
    })
})