const {fetchTopics, fetchAPI, fetchArticle} = require("./models")

exports. getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({topics: topics})
    })
}

exports. getAPI = (req, res, next) => {
    res.status(200).send(fetchAPI())
}

exports. getArticle = (req, res, next) => {
    const { article_id } = req.params
    fetchArticle(article_id)
    .then((article) => {
        res.status(200).send({article: article})
    })
    .catch(next)
    // this catches BOTH SQL errors and custom ones
}