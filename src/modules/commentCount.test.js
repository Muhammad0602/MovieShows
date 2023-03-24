import {commentCount} from './popup.js';

describe('comments count', () => {
    const testComments = ['comment1', 'comment2','comment3'];
    it('it should return 3', () => {
      expect(commentCount(testComments)).toEqual(3);
    });
    it('it should return 0', () => {
      expect(commentCount([])).toEqual(0);
    });
    it('it should return 0', () => {
        expect(commentCount()).toEqual(0);
      });
  });