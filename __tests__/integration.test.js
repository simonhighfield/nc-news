const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const request = require('supertest')
const app = require('../MVC/app')
const endpoints = require('../endpoints.json')

beforeEach(() => { 
    return seed(testData) 
})
afterAll(() => db.end())

describe('ALL /invalidEndpoint', () => {
    test('ALL METHODS 404: invalid endpoint responds with an error message', () => {
        return request(app)
        .get("/api/invalidEndpoint")
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })
})
// passing topics back as an object here

describe('GET /api/topics', () => {
    test('GET200: endpoint that responds with all topics with slug and description properties', () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body })=>{
            const {topics} = body
            expect(topics.length).toBe(testData.topicData.length)
            topics.forEach((topic)=>{
                expect(typeof topic.slug).toBe("string")
                expect(typeof topic.description).toBe("string")
            })
        })
    })
})

describe('GET /api', () => {
    test('GET200: endpoint responds with a JSON that describes all endpoints', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body })=>{
            expect(body).toEqual(endpoints)
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    test('GET200: endpoint responds with an article object with the correct properties', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body })=>{
            const { article } = body
            expect(typeof article.author).toBe('string')
            expect(typeof article.title).toBe('string')
            expect(typeof article.article_id).toBe('number')
            expect(typeof article.body).toBe('string')
            expect(typeof article.topic).toBe('string')
            expect(typeof article.created_at).toBe('string')
            expect(typeof article.votes).toBe('number')
            expect(typeof article.article_img_url).toBe('string')
        })
    })

    test('GET404: endpoint responds with appropriate error for article ids that could be valid but are unused', () => {
        return request(app)
        .get('/api/articles/99')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('GET400: endpoint responds with appropriate error for article ids that are invalid', () => {
        return request(app)
        .get('/api/articles/invalid')
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('invalid ID')
        })
    })
})


describe('GET /api/articles', () => {
    test('GET200: endpoint responds with an array of the correct numbner of article objects with correct properties', () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body })=>{
            const { articles } = body
            
            expect(articles.length).toBe(13)

            articles.forEach((article)=>{
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number)
                })

                expect(article.body).toBe(undefined)
            })
        })
    })

    test('GET200: endpoint responds with the articles sorted in descending order', () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body })=>{
            const { articles } = body
            
            expect(articles).toBeSortedBy('created_at', {descending: true})
        })
    })

    // No need to have a 404 test in this block: we are already testing for it in a dedicated endpoint.
})

describe('GET /api/articles/:article_id/comments', () => {
    test('GET200: endpoint responds with an array of the correct numbner of comment objects with correct properties', () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body
            
            expect(comments.length).toBe(11)

            comments.forEach((comment)=>{
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: 1
                })
            })
        })
    })

    test('GET200: endpoint responds with most recent comments first', () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body
            
            expect(comments).toBeSortedBy('created_at', {descending: true})
        })
    })

    test('GET404: endpoint responds with appropriate error for article ids that could be valid but are unused', () => {
        return request(app)
        .get('/api/articles/999/comments')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('GET400: endpoint responds with appropriate error for article ids that are invalid', () => {
        return request(app)
        .get('/api/articles/invalid/comments')
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('invalid ID')
        })
    })
    
})