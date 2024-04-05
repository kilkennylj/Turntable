class Track {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

class Tracklist {
  constructor(tracks) {
    this.tracks = tracks;
  }
}

class Album {
  constructor(albumName, artistName, albumYear, albumTags, tracklists, coverImage) {
    this.albumName = albumName;
    this.artistName = artistName;
    this.albumYear = albumYear;
    this.albumTags = albumTags;
    this.tracklists = tracklists;
    this.coverImage = coverImage;
  }
}
