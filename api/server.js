const express = require('express');
const RecipeRouter= require('./recipe/recipe-router');

const server = express();

server.use(express.json());
server.use('/api/recipe', RecipeRouter);

server.use("*", (req,res)=>{
    res.status(404).json({ message: "Not Found"})
})

module.exports= server;