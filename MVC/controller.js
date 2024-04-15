const {fetchTopics, fetchAPI} = require("./models")

exports. getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
}

exports. getAPI = (req, res, next) => {
    console.log('get API');
    fetchAPI()
    .then((topics) => {
        res.status(200).send(topics)
    })
}

// console.log('controller.js bonjour');