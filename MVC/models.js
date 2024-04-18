const db = require('../db/connection')
const app = require('./app');
const endpoints = require('../endpoints.json')

exports. fetchTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
        return rows;
    });
}

exports. fetchAPI = () => {
    return endpoints
}

exports. fetchArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
        if (rows.length) {
            return rows[0];
            // This returns either a sucessful request with resulst ... 
            // ... or an SQL error (e.g. if invalid id)
        } else {
            return Promise.reject({msg: 'endpoint not found'})
            // if there is no result after searching for an id that could be valid ...
            // ... there is no SQL error, so a custom error is returned
        }
    });
}

exports. fetchArticles = () => {
    return db.query(
        `SELECT
            articles.author,
            articles.title, 
            articles.article_id,
            articles.topic,
            articles.created_at,
            articles.votes,
            articles.article_img_url,
        COUNT(comment_id) :: INT AS comment_count
        FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY articles.created_at DESC
    ;`)
    .then(({ rows }) => {
        return {articles: rows};
    });
}

exports. fetchArticleComments = (article_id) => {
    return db.query(
        `SELECT
            comments.comment_id,
            comments.votes,
            comments.created_at,
            comments.author,
            comments.body, 
            comments.article_id
        FROM comments
        WHERE article_id = $1
        ORDER BY comments.created_at DESC
        ;`, [article_id])
    .then(({ rows }) => {
        return {comments: rows};
  
    });
}

exports. checkIfArticleExists = (article_id) => {
    // Used in get comments to check why there might be no comments. 
    // If it's becasue the article doesn't exist, return an error leading to 404
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({msg: 'endpoint not found'})
        }
    })
}

exports. insertComment = (article_id, username, body) => {
    return db.query(
        `INSERT INTO comments 
            (article_id, author, body) 
        VALUES 
            ($1, $2, $3) 
        RETURNING 
            *
        ;`, [article_id, username, body])
    .then(({ rows }) => {
        console.log(rows);
        return {postedComment: rows[0]};
    });
}
