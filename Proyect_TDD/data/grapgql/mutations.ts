import {IResolvers} from "graphql-tools";
import {userRegistration} from "../../utils/services";

const mutations:IResolvers=
    {
        Mutation: {
            registerUser: async (_, {type}) => {
                return await userRegistration(type.name,type.lastname,type.email,type.password)
            }
        }
    };
export default mutations;