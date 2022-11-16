import request from 'supertest'
import { app } from '../../src'

describe('/users', () => {
    beforeEach( async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/users')
            .expect(200, [])
    })

    it('should return 404 for not existing course', async () => {
        await request(app)
            .get('/users/99999999999')
            .expect(404)
    })

    it(`should create user with "Unknown" name`, async () => {
        const user = await request(app)
            .post('/users')
            .send({name: ''})
            .expect(201)

        expect(user.body.name).toBe("Unknown")
    })

    it(`should create user with sended Name`, async () => {
        const newUser = { name: "Debik" }
        const user = await request(app)
            .post('/users')
            .send(newUser)
            .expect(201)
        
        const createUser = user.body

        expect(createUser).toEqual({
            id: expect.any(Number),
            name: newUser.name
        })

        await request(app)
            .get('/users')
            .expect(200, [createUser])
    })
})