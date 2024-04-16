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

exports. fetchArticle = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
        if (rows.length) {
            return rows[0];
        } else {
            return Promise.reject({msg: 'endpoint not found'})
        }
    });
}

