const {findIndex} = require('./LandingPage'); // Import the function to be tested

describe('findIndex', () => {
  const albums = [
    { Name: 'Album 1' },
    { Name: 'Album 2' },
    { Name: 'Album 3' },
  ];

  it('should return the correct index when the album is found', () => {
    const albumName = 'Album 2';
    const index = findIndex(albumName, albums);
    expect(index).toBe(1); // Album 'Album 2' is expected to be at index 1
  });

  it('should return 0 when the album is the first element in the array', () => {
    const albumName = 'Album 1';
    const index = findIndex(albumName, albums);
    expect(index).toBe(0); // Album 'Album 1' is expected to be at index 0
  });

  it('should return the last index when the album is the last element in the array', () => {
    const albumName = 'Album 3';
    const index = findIndex(albumName, albums);
    expect(index).toBe(2); // Album 'Album 3' is expected to be at index 2
  });

});