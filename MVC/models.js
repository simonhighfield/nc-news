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
            // This returns either a sucessful request with resulst ... 
            // ... or an SQL error (e.g. if invalid id)
        } else {
            return Promise.reject({msg: 'endpoint not found'})
            // if there is no result after searching for an id that could be valid ...
            // ... there is no SQL error, so a custom error is returned
        }
    });
}

