const mongoUser=require('../data/mongodb/user');
const encrypt=require('bcrypt-nodejs')
export function emailVerification(email:string){
    return email.length>8 &&  /[0-9]/.test(email) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(email)? true:false
}
export async function userRegistration(name:string,lastname:string,email:string,password:string){
    if(emailVerification(email)){
        try{
            const salt = await encrypt.genSaltSync(10)
            const encrypt_password = await encrypt.hashSync(password, salt)
            const user=new mongoUser({
                name:name,
                lastname:lastname,
                email:email,
                status:"Pending Verification",
                password:encrypt_password
            })
           await user.save().exec()
        }catch (e) {
            return e;
        }
        return "User registered successfully"
    }
    else{
        return "EMAIL FORMAT WRONG"
    }
}
export async function userFind(name:string) {

   return  await mongoUser.findOne({name:name}).exec()
}
export async function userFilter(name:string) {
const regex =new RegExp(escapeRegex(name), 'gi');
const users=await mongoUser.find({name:regex})
    return users
}
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};