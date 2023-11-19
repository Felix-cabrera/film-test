const request = require('supertest');
const app = require('../app')

let id;

test("GET /actors me debe de traer todos los actores", async() => {
    const res = await request(app).get("/actors");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test ("POST /actors debe crear un actor", async () => {
    const actor = {
        firstName:"Johnson",
        lastName:"Dwayne",
        nationality:"USA",
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/prisaradioco/TWZTHZ47AFLFLANMA5YA3V47BA.jpg',
        birthday: '1996-09-10',
    }
    const res = await request(app).post('/actors').send(actor);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    id = res.body.id
    expect(res.body.firstName).toBe(actor.firstName)
})

test('PUT /actors/:id debe actualizar un actor', async () => {
    const actor = {
        firstName:"johnson Actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName);
})

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204)
})