/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  heightMin: 30,
  heightMax: 40,
  weightMin: 14,
  weightMax: 17,
  spanLife: 15,
  image: ''
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs sin params', () => {
    it('deberia obtener status 200', async () =>
      await agent.get('/dogs').expect(200)
    );
  });
});

describe('Get /temperaments', () => {
    it('deberia obtener status 200', async () =>
      await agent.get('/temperaments').expect(200)
    );
  });

