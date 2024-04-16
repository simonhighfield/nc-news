const {getTopics, getAPI, getArticle} = require("./controller")
const express = require("express")

const app = express()

app.get('/api/topics', getTopics)
app.get('/api', getAPI)
app.get('/api/articles/:article_id', getArticle)

// Return error for all requests to invalid endpoints i.e. get/invalidEndpoint
app.all('*', (req, res, next) => {
    res.status(404).send({msg: 'endpoint not found'})   
        // question for whoever's giving me feedback: where is 'res' defined as either res or response?
        // I struggled for a long time doing response.status ...
})

module.exports = app;