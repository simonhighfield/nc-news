const {fetchTopics, fetchAPI, fetchArticle} = require("./models")

exports. getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
}

exports. getAPI = (req, res, next) => {
    res.status(200).send(fetchAPI())
}

exports. getArticle = (req, res, next) => {
    const { article_id } = req.params
    fetchArticle(article_id)
    .then((article) => {
        res.status(200).send(article)
    })
    .catch((err) => {
        next()
    })
}