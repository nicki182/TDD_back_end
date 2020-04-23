'use strict'
const {gql }=require('apollo-server-hapi')
const typeDefs = gql`
type Query{
          getUser(name:String):User
          filterUser(name:String):[User]
     }
    input inputRegister{
    name:String
    lastname:String
    email:String
    password:String
    }
    type Mutation{
    registerUser(type:inputRegister):String
    }
    type User{
    name:String
    lastname:String
    email:String 
    password:String
    } 
    `
;
export default typeDefs;