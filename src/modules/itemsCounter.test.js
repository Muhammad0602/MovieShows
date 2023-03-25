import itemsNumber from './itemsCounter.js';

describe('Properly counts the number of movies on the homepage', () => {
  test('it should be false until the page is rendered', () => {
    expect(itemsNumber()).toBeFalsy();
  });
  test('there should 0 items as the async function is not populated', () => {
    expect(itemsNumber()).toEqual(0);
  });
  test('It should not return null', () => {
    expect(itemsNumber()).not.toBeNull();
  });
  test('It should not return undefined', () => {
    expect(itemsNumber()).not.toBeUndefined();
  });
});