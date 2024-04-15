const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const request = require('supertest')
const app = require('../MVC/app')

beforeEach(() => { return seed(testData) })
afterAll(() => db.end())

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