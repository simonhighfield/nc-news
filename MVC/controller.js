const {
    fetchTopics, 
    fetchAPI, 
    fetchArticleById,
    fetchArticles,
    fetchArticleComments,
    checkIfArticleExists,
    insertComment,
    checkIfUserExists
} = require("./models")

exports. getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics: topics})
    })
}

exports. getAPI = (req, res, next) => {
    res.status(200).send(fetchAPI())
}

exports. getArticleById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id)
    .then((article) => {
        res.status(200).send({article: article})
    })
    .catch(next)
    // this catches BOTH SQL errors and custom ones
}

exports. getArticles = (req, res, next) => {
    fetchArticles()
    .then(({ articles }) => {
        res.status(200).send({articles: articles})
    })
    // add comment count from comments data to that article id

    .catch(next)
    // this catches BOTH SQL errors and custom ones
}

exports. getArticleComments = (req, res, next) => {
    const { article_id } = req.params
    // retrive comments, and check if article exists simultaneously
    Promise.all([fetchArticleComments(article_id), checkIfArticleExists(article_id)])
    .then(([comments]) => {
        res.status(200).send(comments)  // if no error from check, .then() returns []
    })
    .catch(next) // leads to 404
}

exports. postComment = (req, res, next) => {
    const { article_id } = req.params
    const { username, body } = req.body
    insertComment(article_id, username, body)   
    .then((postedComment) => {
        res.status(201).send(postedComment)
    })
    .catch(next)
}