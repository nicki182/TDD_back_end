'use strict';
const mongoose=require('mongoose');
const User_schema=mongoose.Schema;
mongoose.Promise = global.Promise;
const userSchema = new User_schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('User', userSchema)
export default userSchema.methods;