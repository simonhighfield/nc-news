const {fetchTopics, fetchAPI} = require("./models")

exports. getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send(topics)
    })
}

exports. getAPI = (req, res, next) => {
    // fetchAPI()
    // .then((api) => {
    //     console.log(api);
    //     res.status(200).send(api)
    // })
    // .catch((err) => {
    //     console.log('error is ');
    // })
    res.status(200).send(fetchAPI())
}
