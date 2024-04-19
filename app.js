const {
    getTopics, 
    getAPI, 
    getArticleById,
    getArticles,
    getArticleComments,
    postComment,
    patchVotes,
    deleteComment,
    getUsers
} = require("./MVC/controller")
const express = require("express")

const app = express()
app.use(express.json())

app.get('/api/topics', getTopics)
app.get('/api', getAPI)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getArticleComments)
app.post('/api/articles/:article_id/comments', postComment)
app.patch('/api/articles/:article_id', patchVotes)
app.delete('/api/comments/:comment_id', deleteComment)
app.get('/api/users', getUsers)



/** Error Handling Middleware */
app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: 'invalid ID'})   
    }
    next(err)
})
app.use((err, req, res, next) => {
    if (err.code === '23503') {
        // this occurs when no matching column - e.g. as article_id or username not found
        res.status(404).send({msg: 'endpoint not found'})
    }
    next()
})

/** Return error for all requests to invalid endpoints i.e. get/invalidEndpoint */ 
app.all('*', (req, res, next) => {
    res.status(404).send({msg: 'endpoint not found'})   
})

module.exports = app;