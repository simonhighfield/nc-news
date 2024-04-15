const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const request = require('supertest')
const app = require('../MVC/app')

beforeEach(() => { return seed(testData) })
afterAll(() => db.end())

describe('GET/api/topics', () => {
    test('check this runs', () => {

    })
})