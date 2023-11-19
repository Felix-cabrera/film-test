const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require ('../models')

let id;

test("GET /movies me debe de traer todas las peliculas", async() => {
    const res = await request(app).get("/movies");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test ("POST /movies debe crear una pelicula", async () => {
    const movie = {
        name:"La era de hielo",
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/prisaradioco/TWZTHZ47AFLFLANMA5YA3V47BA.jpg',
        synopsis: '1996-09-10',
        releaseYear: 2000
    }
    const res = await request(app).post('/movies').send(movie);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    id = res.body.id
    expect(res.body.name).toBe(movie.name)
})

test('PUT /movies/:id debe actualizar una pelicula', async () => {
    const movie = {
        name:"La era de hielo 2"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(movie.name);
})

test('POST /movies/:id/actors debe insertar los actores a la pelicula', async () => {
    const actor = await Actor.create({
        firstName:"Juanita",
        lastName:"Peres",
        nationality:"Mexico",
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/prisaradioco/TWZTHZ47AFLFLANMA5YA3V47BA.jpg',
        birthday: '1997-05-10',
    });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
})

test('POST /movies/:id/directors debe insertar los directores a la pelicula', async () => {
    const director = await Director.create({
        firstName:"Juan",
        lastName:"lopez",
        nationality:"colombia",
        image: 'https://cloudfront-us-east-1.images.arcpublishing.com/prisaradioco/TWZTHZ47AFLFLANMA5YA3V47BA.jpg',
        birthday: '1987-04-10',
    });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
})

test('POST /movies/:id/genres debe insertar los genero a la pelicula', async () => {
    const genre = await Genre.create({
        name:"Comedia",
    });
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1)
})

test('DELETE /movies/:id debe eliminar una pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
})