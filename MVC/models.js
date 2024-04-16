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

