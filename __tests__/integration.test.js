const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const request = require('supertest')
const app = require('../MVC/app')
const endpoints = require('../endpoints.json')
const { forEach } = require('../db/data/test-data/articles')

beforeEach(() => { 
    return seed(testData) 
})
afterAll(() => db.end())

describe('ALL /invalidEndpoint', () => {
    test('ALL METHODS 404: invalid endpoint response is an error message', () => {
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
    test('GET200: endpoint response is all topics with slug and description properties', () => {
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
    test('GET200: endpoint response is a JSON that describes all endpoints', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body })=>{
            expect(body).toEqual(endpoints)
        })
    })
})

describe('GET /api/articles/:article_id', () => {
    test('GET200: endpoint response is an article object with the correct properties', () => {
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

    test('GET404: endpoint response is 404 for article_id\'s that could be valid but are unused', () => {
        return request(app)
        .get('/api/articles/99')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('GET400: endpoint response is 400 error for article_id\'s that are invalid', () => {
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
    test('GET200: endpoint response is an array of the correct numbner of article objects with correct properties', () => {
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

    test('GET200: endpoint response is the articles sorted in descending order', () => {
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
    test('GET200: endpoint response is an array of the correct numbner of comment objects with correct properties', () => {
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

    test('GET200: endpoint response is sorted with most recent comments first', () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body
            
            expect(comments).toBeSortedBy('created_at', {descending: true})
        })
    })

    test('GET404: endpoint response is 404 error for article ids that could be valid but are unused', () => {
        return request(app)
        .get('/api/articles/999/comments')
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('GET400: endpoint response is 400 error for article ids that are invalid', () => {
        return request(app)
        .get('/api/articles/invalid/comments')
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('invalid ID')
        })
    })
    
    test('GET200: endpoint response is an empty array for a valid article with no comments', () => {
        return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body })=>{
            const { comments } = body
            
            expect(comments).toEqual([])
        })
    })
})


describe('POST /api/articles/:article_id/comments', () => {
    test('POST 201: endpoint response is the posted comment', () => {

        const newComment = {
            username: "icellusedkars",
            body: "the body of the new comment"
        }

        return request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(201)
        .then(({ body }) => {
            const { postedComment } = body
            expect(postedComment).toMatchObject({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: newComment.username,
                body: newComment.body,
                article_id: 2
            })
        })
    })

    test('POST 404: endpoint response is 404 error for an unused article number', () => {
        const newComment = {
            username: "icellusedkars",
            body: "the body of the new comment for an unused article"
        }

        return request(app)
        .post("/api/articles/99/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('POST 404: endpoint response is 404 error if post is not by a valid author', () => {
        const newComment = {
            username: "invalidUser",
            body: "the body of the new comment"
        }

        return request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('POST 400: endpoint response is 400 error if post has no body', () => {
        const newComment = {
            username: "icellusedkars",
            body: ""
        }

        return request(app)
        .post("/api/articles/2/comments")
        .send(newComment)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('bad request: no body')
        })
    })

    // Do I need a test in case article_id is invalid, e.g. article_id = notAnIdNumber
})

describe('PATCH /api/articles/:article_id', () => {
    test('PATCH200: endpoint response is the article with its votes correctly incrimented ', () => {

        const article_id = 1
        const update = {inc_votes: 1}
        const expectedArticle =   {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: '2020-07-09T20:11:00.000Z',
            votes: 100,
            article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        }
        expectedArticle.votes += update.inc_votes

        return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(update)
        .expect(200)
        .then(({ body }) => {
            const { updatedArticle } = body
            expect(updatedArticle).toEqual(expectedArticle)
        })
    })

    test('PATCH404: endpoint response is 404 error for article ids that could be valid but are unused', () => {
        const article_id = 999
        const update = {inc_votes: 1}
        
        return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(update)
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('PATCH400: endpoint response is 400 error for article ids that are invalid', () => {
        const article_id = 'abc'
        const update = {inc_votes: 1}
        
        return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(update)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('invalid ID')
        })
    })

    test('PATCH400: endpoint response is 400 error if updates has no votes', () => {
        const article_id = 2
        const update = {inc_votes: 0}

        return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(update)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('bad request: no incriment to votes')
        })
    })

})

describe('DELETE /api/comments/:commend_id', () => {
    test('DELETE204: endpoint response is 204 status with no comment', () => {

        const comment_id = 1

        return request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(204)
        .then(({ body }) => {
            const { updatedArticle } = body
        })
    })

    test('DELETE404: endpoint response is 404 error for comment ids that could be valid but are unused', () => {
        const comment_id = 999
        
        return request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(404)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('endpoint not found')
        })
    })

    test('DELETE400: endpoint response is 400 error for article ids that are invalid', () => {
        const comment_id = 'abc'
        
        return request(app)
        .delete(`/api/comments/${comment_id}`)
        .expect(400)
        .then(({ body }) => {
            const { msg } = body
            expect(msg).toBe('invalid ID')
        })
    })
})

describe('GET /api/users', () => {
    test('GET200: endpoint response is an array pf user objects with correct properties', () => {
        return request(app)
        .get(`/api/users`)
        .expect(200)
        .then(({ body }) => {
            const { users } = body

            expect(users.length).toBe(4)

            users.forEach((user)=>{
                expect(user).toMatchObject({
                    username: expect.any(String),
                    name: expect.any(String),
                    avatar_url: expect.any(String),
                })
            })
        })
    })
})


describe('GET /api/articles?topic=', () => {
    test('GET200: endpoint response is 200 status with an array containing topics matching that query', () => {
        const topic = 'mitch'

        return request(app)
        .get(`/api/articles?topic=${topic}`)
        .expect(200)
        .then(({ body }) => {
            const { articles } = body

            expect(articles.length).toBe(12)

            articles.forEach(article => {
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: topic,
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(Number)
                })
            });
        })
    })

    // what if incorrect topic?
    test.only('GET200: endpoint response is 200 empty array for a topic with no items', () => {
        const topic = 'unused topic'

        return request(app)
        .get(`/api/articles?topic=${topic}`)
        .expect(200)
        .then(({ body }) => {
            const { articles } = body
            expect(articles).toEqual([])
        })
    })
})