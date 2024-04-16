const {fetchTopics, fetchAPI} = require("./models")

exports. getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
}

exports. getAPI = (req, res, next) => {
    res.status(200).send(fetchAPI())
}
