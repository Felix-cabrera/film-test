const request = require('supertest');
const app = require('../app')

let id;

test("GET /directors me debe de traer todos los directores", async() => {
    const res = await request(app).get("/directors");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test ("POST /directors debe crear un director", async () => {
    const director = {
        firstName:"Juanito",
        lastName:"Juarez",
        nationality:"Mexicano",
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/prisaradioco/TWZTHZ47AFLFLANMA5YA3V47BA.jpg',
        birthday: '1997-08-10',
    }
    const res = await request(app).post('/directors').send(director);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    id = res.body.id
    expect(res.body.firstName).toBe(director.firstName)
})

test('PUT /directors/:id debe actualizar un director', async () => {
    const director = {
        firstName:"johnson Actualizado"
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(director.firstName);
})

test('DELETE /directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
})