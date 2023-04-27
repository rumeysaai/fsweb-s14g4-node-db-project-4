const express = require('express');
const RecipeRouter= require('./recipe/recipe-router');

const server = express();

server.use(express.json());
server.use('api/recipe', RecipeRouter);

module.exports= server;