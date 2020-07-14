const express = require("express");
const morgan = require('morgan')
const chalk = require('chalk');
const accoutRouter = require('../accounts/accountRouter')
const cors = require('cors')

const db = require("../data/dbConfig.js");

const server = express();
server.use(cors())

server.use(express.json());
server.use(morgan('dev'))
server.use('/api/account', accoutRouter )

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
  });
  



module.exports = server;
