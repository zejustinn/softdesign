import { assert } from 'chai';
import ServerResponse from './ServerResponse.js';

describe('src/components/utils/ServerResponse.js', () => {
  describe('When involking "toJSON"', () => {
    describe('Should return a object', () => {
      it('With success related data', () => {
        const serverResponse = new ServerResponse(200, 'Any data');

        assert.deepEqual(serverResponse.toJSON(), {
          data: serverResponse.data,
        });
      });

      it('With error related data if "ServerResponse.isError" is true', () => {
        const serverResponse = new ServerResponse(500, 'Any data', {
          isError: true,
        });

        assert.deepEqual(serverResponse.toJSON(), {
          error: serverResponse.data,
        });
      });
    });
  });
});
