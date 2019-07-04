const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLSchema, 
  GraphQLInt,
  GraphQLID
 } = graphql;

const car = require('../models/car');

const ModelType = new GraphQLObjectType({
  name: 'Model',
  fields: () => ({
    id: { type: GraphQLID },
    model: { type: GraphQLString },
    year: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    car: {
      type: ModelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return _.find(car, { id: args.id });
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})