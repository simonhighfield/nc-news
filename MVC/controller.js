const {fetchTopics} = require("./models")

exports. getTopics = (req, res, next) => {
    // console.log('controller.js bounjour');
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
}

