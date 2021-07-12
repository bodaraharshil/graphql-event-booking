const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require("./middleware/is-auth");

const graphqlSchema = require('./graphql/schema/index');
const graphqlresolver = require('./graphql/resolver/index');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlresolver,
    graphiql: true
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.5or1o.mongodb.net/graphql-testing?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection errror:'));
db.once('open', function () {
    console.log('🚀 Server running:', PORT);
    app.listen(PORT);
});