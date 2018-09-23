const graphql = require('graphql');
const Product = require('../models/Product');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        proteins: { type: GraphQLInt },
        carbs: { type: GraphQLInt },
        fat: { type: GraphQLInt },
        calories: { type: GraphQLInt },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id);
            },
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return Product.find({});
            },
        },
    },
});


module.exports = new GraphQLSchema({
    query: RootQuery,
});
