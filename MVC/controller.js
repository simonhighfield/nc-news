const {
    fetchTopics, 
    fetchAPI, 
    fetchArticleById,
    fetchArticles
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

function countComments() {
    // SQL query to database to get the comments
    // export the raw comments data
}