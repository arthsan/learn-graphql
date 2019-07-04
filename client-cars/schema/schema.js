const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const ModelType = new GraphQLObjectType({
  name: 'Model',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    car: {
      type: ModelType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        args.id
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})