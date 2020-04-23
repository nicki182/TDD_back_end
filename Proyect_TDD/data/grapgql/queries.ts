import {IResolvers} from "graphql-tools";
import {userFind,userFilter} from "../../utils/services";

const query:IResolvers=
    {
        Query: {
            getUser:async (_,{name})=>{
                const user= await userFind(name)
                return user;
            },
            filterUser:async (_,{name})=>{
               const users=await userFilter(name)
               return users
}
        }
    };
export default query;