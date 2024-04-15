const {getTopics} = require("./controller")
const express = require("express")

const app = express()

app.get('/api/topics', getTopics)

module.exports = app;