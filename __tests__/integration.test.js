const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const request = require('supertest')
const app = require('../MVC/app')
const {updateEndpoints} = require('../update-endpoints')

beforeEach(() => { 
    return seed(testData) 
})
afterAll(() => db.end())

describe('ALL: /invalidEndpoint', () => {
    test('ALL METHODS 404: invalid endpoint responds with an error message', () => {
        return request(app)
        .get("/api/invalidEndpoint")
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
        })
    })
})


describe('GET: /api/topics', () => {
    test('GET200: endpoint that responds with all topics with slug and description properties', () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body})=>{
            const topics = body
            expect(topics.length).toBe(testData.topicData.length)
            topics.forEach((topic)=>{
                expect(typeof topic.slug).toBe("string")
                expect(typeof topic.description).toBe("string")
            })
        })
    })
})

describe.only('GET: /api', () => {
    test('GET200: endpoint responds with a JSON object describing each endpoint, with correct properties', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({body})=>{
            const endpoints = body

            // expect length of of returned array, to equal length of JSON.Parse endpointsfile

         
        })
    })
})