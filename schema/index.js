const graphql = require('graphql');
const Product = require('../models/Product');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                proteins: { type: new GraphQLNonNull(GraphQLInt) },
                carbs: { type: new GraphQLNonNull(GraphQLInt) },
                fat: { type: new GraphQLNonNull(GraphQLInt) },
                calories: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const newProduct = new Product({
                    name: args.name,
                    proteins: args.proteins,
                    carbs: args.carbs,
                    fat: args.fat,
                    calories: args.calories,
                });
                return newProduct.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
