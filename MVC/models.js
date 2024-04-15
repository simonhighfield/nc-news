const db = require('../db/connection')

exports. fetchTopics = (argument1) => {
    return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
        return rows;
    });
}

// console.log('models.js guten tag');
