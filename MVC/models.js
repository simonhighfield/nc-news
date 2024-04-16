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
    // return fs.readFile('./endpoints.json', 'utf-8')      // WHY does single dot work here?!?!
    // .then((rawFile) => {
    //     return JSON.parse(rawFile)
    // })
    return endpoints
}

