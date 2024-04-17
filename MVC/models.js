const { log } = require('console');
const db = require('../db/connection')
const fs = require('fs/promises');
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
        // I had lots of difficulty here: solution was it HAD to be groupped by articles.article_id
        // :: reformats the string into the specified INT, As relabels that column (so property)
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
    ;`)
    .then(({ rows }) => {
        console.log(rows);
        return {articles: rows};
    });
}