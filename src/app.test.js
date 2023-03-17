import { assert } from 'chai';
import { agent } from 'supertest';

import app from './app.js';

describe('Testing test libraries configurations', () => {
  it('Simple test to test mocha and chai configuration', () => {
    assert.equal(1, 1, 'olha ai o erro');
  });

  it('Simple test to test supertest configuration', () => {
    agent(app)
      .get('/test')
      .expect(200)
      .end((err) => {
        if (err) throw err;
      });
  });
});
