const {
    getTopics, 
    getAPI, 
    getArticleById,
    getArticles,
    getArticleComments
} = require("./controller")
const express = require("express")

const app = express()

app.get('/api/topics', getTopics)
app.get('/api', getAPI)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getArticleComments)

/** Error Handling Middleware */
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'invalid ID'})   
    }
    next()
}) 

/** Return error for all requests to invalid endpoints i.e. get/invalidEndpoint */ 
app.all('*', (req, res, next) => {
    res.status(404).send({msg: 'endpoint not found'})   
})

module.exports = app;