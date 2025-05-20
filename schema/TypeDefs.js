const { gql } = require("apollo-server")

const typeDefs = gql`
   """Representa a un usuario dentro del sistema"""
    type User{
        id: ID! """ Identificador unido del usuario"""
        name: String!
        email: String!
    }
    type Query {
    """ Devuelve todos los usuarios del sistema"""
        getUsers:[User]
        getUser (id: ID) : User
    }
    type Mutation {
        createUser(name:String!,email:String!):User
        updateUser(id:ID!,name:String!,email:String!):User
        deleteUser(id:ID!):User
    }
`;

module.exports = typeDefs