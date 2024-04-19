const {
    fetchTopics, 
    fetchAPI, 
    fetchArticleById,
    fetchArticles,
    fetchArticleComments,
    checkIfArticleExists,
    insertComment,
    fetchVotes,
    setVotes,
    removeComment,
    fetchUsers
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

    if (body.length === 0) {res.status(400).send({msg: 'bad request: no body'})}

    insertComment(article_id, username, body)   
    .then((postedComment) => {
        res.status(201).send(postedComment)
    })
    .catch(next)
}

exports. patchVotes = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body

    if (inc_votes === 0) {res.status(400).send({msg: 'bad request: no incriment to votes'})}

    Promise.all([fetchVotes(article_id), checkIfArticleExists(article_id)])
    // the order of the functions above affects the array deconstruction below
    .then(([result]) => {
        const { votes } = result
        const newVotes = votes + inc_votes
        return setVotes(article_id, newVotes)   
    })
    .then((updatedArticle) => {
        res.status(200).send(updatedArticle)
    })
    .catch((err) => {
        next(err)})
}

exports. deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    removeComment(comment_id)
    .then(() => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)})
}

exports. getUsers = (req, res, next) => {
    fetchUsers()
    .then(({ users }) => {
        res.status(200).send({users})
    })
    .catch(next)
}