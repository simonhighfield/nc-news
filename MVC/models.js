const { log } = require('console');
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

exports. fetchArticleComments = () => {
    return db.query(
        `SELECT
            comments.comment_id,
            comments.votes,
            comments.created_at,
            comments.author,
            comments.body, 
            comments.article_id
        FROM comments
        WHERE article_id = 1
        ;`)
    .then(({ rows }) => {
        console.log(rows);
        return {comments: rows};
    });
}