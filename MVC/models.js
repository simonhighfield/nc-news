const { log } = require('console');
const db = require('../db/connection')
const fs = require('fs/promises')


exports. fetchTopics = () => {
    return db.query(`SELECT * FROM topics;`)
    .then(({ rows }) => {
        return rows;
    });
}

exports. fetchAPI = () => {
    console.log('fetchAPI');
    return fs.readFile('./endpoints.json', 'utf-8')      // WHY does single dot work here?!?!
    .then((rawFile) => {
        console.log('.then()');
        const parsedResponse = JSON.parse(rawFile)
        console.log(parsedResponse);
        console.log('Hello, I made it to line 20 in models.js. I have an object, so now I can count the number of methods in it! ... And check if all methods of app (exported from app.js) belong inside it. Wooop! ');
        return rawFile;
    });
}


// const request = https.request(taskOneOptions, (response) => {
        
//     /* Every time a new packet arrives, add to the string */
//     let responseAsString = ''
//     response.on('data', (packet) => {
//         responseAsString += packet
//     })
//     /* On end: all packets arrived, we have all the data ... */
//     response.on('end', () => {
//         console.log('reached the end')

//         /* Parse the string object to get a usable object */
//         const parsedResponse = JSON.parse(responseAsString)

// console.log('models.js guten tag');
