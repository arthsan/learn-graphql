const graphql = require('graphql');
const _= require('lodash');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLSchema, 
  GraphQLInt,
  GraphQLID,
  GraphQLList
 } = graphql;

const car = require('../models/car');
const brand = require('../models/brand')

const ModelType = new GraphQLObjectType({
  name: 'Model',
  fields: () => ({
    id: { type: GraphQLID },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    brand: {
      type: BrandType,
      resolve(parent, args){
        return _.find(brand, { id: parent.brandId });
      }
    }
  })
});

const BrandType = new GraphQLObjectType({
  name: 'Brand',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cars: {
      type: new GraphQLList(ModelType),
      resolve(parent, args){
        return _.filter(car, { brandId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    car: {
      type: ModelType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args){
        return _.find(car, { id: args.id });
      }
    },
    brand: {
      type: BrandType,
      args: { id: { type: GraphQLID } },
      resolve(parent,args){
        return _.find(brand, { id: args.id });
      }
    },
    cars: {
      type: new GraphQLList(ModelType),
      resolve(parent, args){
        return car;
      }
    },
    brands: {
      type: new GraphQLList(BrandType),
      resolve(parent, args){
        return brand;
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})