const mongoUser=require('../data/mongodb/user')
export function emailVerification(email:string){
    if(email.length>8 &&  /[0-9]/.test(email) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(email)){
    return true
    }
    else{
    return false
    }
}
export async function userRegistration(name:string,lastname:string,email:string){
    if(emailVerification(email)){
        try{
            const user=new mongoUser({
                name:name,
                lastname:lastname,
                email:email,
                status:"Pending Verification"
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