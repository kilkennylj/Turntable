require('express');
require('mongodb');

const axios = require('axios')

// Required for searching by _id
const { ObjectId } = require('mongodb');

var spotifyKey;

exports.setApp = function (app, client)
{
	// This is the code from MERN C. It is completely incorrect
	// I have no idea why he asks us to add it here. It is wrong.
	// I'm keeping in here just in case.
	// Above will have the JWT stuff that this function fails to implement correctly.
	app.post('/api/login', async (req, res, next) =>
	{
		// incoming: login, password
		// outgoing: id, firstName, lastName, error
		var error = '';

		// we have to use different cases than database so we don't overwrite
		// Login is in the database. same for others and UserID
		// login is on the api (in this file). same for others with id (as UserID)
		const { login, password } = req.body;

		const db = client.db("Turntable");
		const results = await db.collection('Users').find({ Login: login, Password: password }).toArray();

		var id = -1;
		var firstName = '';
		var lastName = '';

		var ret;

		// if valid
		if (results.length > 0)
		{
			// as discussed above, the left should have one case type, the right has another
			id = results[0].UserID;
			firstName = results[0].FirstName;
			lastName = results[0].LastName;

			// required JWT
			try
			{
				const token = require("./createJWT.js");
				ret = token.createToken(firstName, lastName, id);
			}

			catch (e)
			{
				ret = { error: e.message };
			}
		}

		// if invalid
		else
		{
			ret = { error: "Login or Password is incorrect" };
		}

		// note that this returns a JWT
		res.status(200).json(ret);
	});

	app.post('/api/register', async (req, res, next) =>
	{
		// incoming : firstName, lastName, login, password, email
		// outgoing : results, error
		var error = '';

		const { firstName, lastName, email, login, password } = req.body;

		var _ret = [];

		try
		{
			const db = client.db("Turntable");
			var albums = []; // Empty. Don't enter for API
			var ratings = []; // Empty. Don't enter for API

			// somehow get the largest UserID in the database, add one, put it in the newUser
			// also check for error here, just realized this function doesn't do that

			var newUser = { FirstName: firstName, LastName: lastName, Login: login, Password: password, Albums: albums, Ratings: ratings, Email: email };
			_ret = await db.collection('Users').insertOne(newUser);
		}
		catch (e)
		{
			error = e.toString();
		}

		// I believe it should be like this, like the other endpoints
		var ret = { results: _ret, error: error };
		res.status(200).json(ret);
	});

	app.post('/api/addalbum', async (req, res, next) =>
	{
		// incoming : search, jwtToken
		// outgoing : error, jwtToken

		var error = "";

		const { search, jwtToken } = req.body;

		require('dotenv').config();
		const key = process.env.LASTFM_API_KEY;

		var token = require('./createJWT.js');

		try
		{
			if (token.isExpired(jwtToken))
			{
				var r = { error: 'The JWT is no longer valid', jwtToken: '' };
				res.status(200).json(r);
				return;
			}
		}

		catch (e)
		{
			console.log(e.message);
		}

		var ret = await addAlbum(key, search);

		if (ret.error.length > 0)
		{
			res.status(500).json( { error: ret.error } );
		}

		else
		{
			var refreshedToken = null;

			try
			{
				refreshedToken = token.refresh(jwtToken);
			}

			catch (e)
			{
				console.log(e.message);
			}

			var ret = { error: error, jwtToken: refreshedToken };

			res.status(200).json(ret);
		}
	});

	app.post('/api/adduseralbum', async (req, res, next) =>
	{
		// incoming: userId, name, jwtToken
		// outgoing: error, jwtToken
		var error = '';
		const { userId, name, jwtToken } = req.body;

		require('dotenv').config();
		const key = process.env.LASTFM_API_KEY;

		var token = require('./createJWT.js');

		try
		{
			if (token.isExpired(jwtToken))
			{
				var r = { error: 'The JWT is no longer valid', jwtToken: '' };
				res.status(200).json(r);
				return;
			}
		}

		catch (e)
		{
			console.log(e.message);
		}

		try
		{
			const db = client.db("Turntable");
			var results = await db.collection('Albums').find({Name: {$regex: name+'.*', $options:'i'}}).toArray();
			var user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

			var albumId;

			// In Database
			if (results.length > 0)
			{
				albumId = results[0]._id;
			}

			// Not in database
			else
			{
				albumId = await searchAlbum(key, name).album._id;
			}

			await db.collection('Users').updateOne(
				{ _id: new ObjectId(userId) },
				{ $push: { Albums: albumId, Ratings: -1 } }
			  );

			var refreshedToken = null;

			try
			{
				refreshedToken = token.refresh(jwtToken);
			}

			catch (e)
			{
				console.log(e.message);
			}
		}

		catch (e)
		{
			console.log(e.message);
		}

		res.status(200).json( {error: error, jwtToken: refreshedToken } );
	});
	/**
 * Update user rating for an album.
 *
 * Endpoint: POST /api/updateuserrating
 *
 * @param {string} userId - The ID of the user.
 * @param {string} search - The name of the album to search for.
 * @param {string} jwtToken - The JWT token for authentication.
 * @param {number} rating - The new rating for the album.
 *
 * @returns {object} Response object with error and refreshed JWT token.
 */

app.post('/api/updateuserrating', async (req, res, next) => {
  // incoming: userId, search, jwtToken, rating

  const { userId, search, jwtToken, rating } = req.body;

  // Function to search for the user album
  async function searchUserAlbum(userId, search) {
    const db = client.db("Turntable");
    const user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

    // Find the index of the album in the user's collection
    const albumIndex = user.Albums.findIndex(album => album.Name.toLowerCase() === search.toLowerCase());
    return albumIndex;
  }

  try {
    // Check if JWT token is expired
    // Replace `token.isExpired()` with your actual implementation for token validation
    if (token.isExpired(jwtToken)) {
      return res.status(401).json({ error: 'The JWT is no longer valid' });
    }

    // Search for the album
    const albumIndex = await searchUserAlbum(userId, search);

    // If album not found, return error
    if (albumIndex === -1) {
      return res.status(404).json({ error: 'Album not found for the user' });
    }

    // Update user rating
    const db = client.db("Turntable");
    await db.collection('Users').updateOne(
      { _id: new ObjectId(userId), "Albums.Name": search },
      { $set: { "Albums.$.Rating": rating } } // Use the provided `rating` from the request body
    );

    // Refresh JWT token
    // Replace `token.refresh()` with your actual implementation for token refresh
    const refreshedToken = token.refresh(jwtToken);

    // Send response
    res.status(200).json({ error: null, jwtToken: refreshedToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
	app.post('/api/addartist', async (req, res, next) =>
	{
		// incoming : name, albums(array), jwtToken
		// outgoing : error, jwtToken
		var error = '';

		const { name, albums, jwtToken } = req.body;

		var token = require('./createJWT.js');

		try
		{
			if (token.isExpired(jwtToken))
			{
				var r = { error: 'The JWT is no longer valid', jwtToken: '' };
				res.status(200).json(r);
				return;
			}
		}

		catch (e)
		{
			console.log(e.message);
		}

		const newArtist = { Name: name, Albums: albums };

		error = await addArtist(newArtist);

		var refreshedToken = null;

		try
		{
			refreshedToken = token.refresh(jwtToken);
		}

		catch (e)
		{
			console.log(e.message);
		}

		var ret = { error: error, jwtToken: refreshedToken };
		res.status(200).json(ret);
	});

	// NOT DONE
	app.post('/api/updateuserrating', async (req, res, next) =>
	{
		// incoming: userId, search, jwtToken
		// outgoing: error, jwtToken

		/*
			Call searchUserAlbum.
			Find array position of the returned _id.
			Update that position in rating array.
		*/

		res.status(500).json( {error: "Has not been completed yet." } );
	});

	// NOTICE, THIS USES GET NOT POST!!
	// This searches LastFM for an album given some text relating to album title
	app.get('/api/searchalbum', async (req, res) =>
	{
		// incoming: search, jwtToken
		// outgoing: name, artist, year, tags, tracks, length, cover, error, jwtToken
		require('dotenv').config();
		const key = process.env.LASTFM_API_KEY;

		var error = '';

		const { search, jwtToken } = req.body;

		var token = require('./createJWT.js');

		try
		{
			if (token.isExpired(jwtToken))
			{
				var r = { error: 'The JWT is no longer valid', jwtToken: '' };
				res.status(200).json(r);
				return;
			}
		}

		catch (e)
		{
			console.log(e.message);
		}

		var ret = await searchAlbum(key, search);

		var refreshedToken = null;

		try
		{
			refreshedToken = token.refresh(jwtToken);
		}

		catch (e)
		{
			console.log(e.message);
		}

		// Was in database beforehand
		if (Array.isArray(ret.results))
		{
			ret = { results: ret.results[0], error: ret.error, jwtToken: refreshedToken };
		}

		// Wasn't in database beforehand
		else
		{
			ret = { results: ret.results.album, error: ret.error, jwtToken: refreshedToken };
		}

		res.status(200).json(ret);
	});

	// NOTICE, THIS USES GET NOT POST!!
	// This searches the database
	app.get('/api/searchuseralbum', async(req, res) =>
	{
		// incoming: userId, search, jwtToken
		// outgoing: albums {name, artist, year, tags, tracks, length, cover }, error, jwtToken

		const { userId, search, jwtToken } = req.body;

		var error = '';

		var token = require('./createJWT.js');

		require('dotenv').config();
		const key = process.env.LASTFM_API_KEY;

		try
		{
			if (token.isExpired(jwtToken))
			{
				var r = { error: 'The JWT is no longer valid', jwtToken: '' };
				res.status(200).json(r);
				return;
			}
		}

		catch (e)
		{
			console.log(e.message);
		}

		var results = [];

		// Quick populate
		if (search === "")
		{
			const db = client.db("Turntable");
			var user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

			var albumIds = user.Albums;

			for (var i = 0; i < albumIds.length; i++)
			{
				results[i] = await db.collection("Albums").findOne({ _id: new ObjectId(albumIds[i])});
			}
		}

		else
		{
			// We don't use searchAlbum because we don't want auto correct here.
			const db = client.db("Turntable");
			var searchRes = await db.collection('Albums').find({Name: {$regex: search+'.*', $options:'i'}}).toArray();

			var albumIds = [];

			for (var i = 0; i < searchRes.length; i++)
			{
				albumIds[i] = searchRes[i]._id;
			}

			try
			{
				const db = client.db("Turntable");
				var user = await db.collection('Users').findOne({ _id: new ObjectId(userId) });

				// O(n^2) but what can we really do instead.
				// If we delete the index that the found album was at,
				// we would have to calculate where the corresponding album is when the next album is found
				for (var i = 0; i < user.Albums.length; i++)
				{
					for (var j = 0; j < albumIds.length; j++)
					{
						if (user.Albums[i].equals(albumIds[j]))
						{
							results.push(searchRes[j]);
						}
					}
				}
			}

			catch(e)
			{
				console.error(e);
			}
		}

		var refreshedToken = null;

		try
		{
			refreshedToken = token.refresh(jwtToken);
		}

		catch (e)
		{
			console.log(e.message);
		}

		res.status(200).json( { albums: results, error: error, jwtToken: refreshedToken } );
	});

	async function searchArtist(search)
	{
		const db = client.db("Turntable");
		const result = await db.collection('Artists').find({Name: {$regex: search, $options:'i'}}).toArray();

		return result;
	}

	async function addArtist(newArtist)
	{
		var error = '';

		try
		{
			const db = client.db("Turntable");
			const result = db.collection("Artists").insertOne(newArtist);
		}
		catch (e)
		{
			error = e.toString();
		}

		return error;
	}

	// Used mostly for updating albums array
	async function updateArtist(artistId, albumId)
	{
		const db = client.db("Turntable");
		const result = await db.collection('Artists').updateOne(
			{ _id: artistId },
			{ $push: { Albums: albumId } }
		  );
	}

	// Adds album to the db then returns an album and an error
	async function addAlbum(key, search)
	{
		var dbCheck;
		var error = "";

		// Checks with user inputted album name. Doesn't get edge cases.
		try
		{
			const db = client.db("Turntable");

			// Checks if the album is already there
			var dbCheck = await db.collection('Albums').find({Name: {$regex: search+'.*', $options:'i'}}).toArray();
		}

		catch(e)
		{
			console.log(e.message);
		}

		if (dbCheck.length > 0)
		{
			return({ error: "Album already in database"});
		}

		else
		{
			var newAlbum = await lfmAlbumInfoSearch(key, search);

			// Checks again with new name, gets edge cases.
			try
			{
				const db = client.db("Turntable");

				// Allows alphabet, numbers, (), '', and spaces
				newAlbum.Name = newAlbum.Name.replace(/"/g, '');

				// Checks if the album is already there
				var dbCheck = await db.collection('Albums').find({
					Name:
					{
						$regex: newAlbum.Name + '.*',
						$options: 'i'
					}
				}).toArray();
			}

			catch(e)
			{
				console.log(e.message);
			}

			if (dbCheck.length > 0)
			{
				return( { error: "Album already in database" } );
			}

			newAlbum = await albumFix(newAlbum);

			try
			{
				const db = client.db("Turntable");
				const result = db.collection("Albums").insertOne(newAlbum);
			}
			catch (e)
			{
				error = e.toString();
			}

			var artist =  { Name: newAlbum.Artist, Albums: [newAlbum._id] };

			// Checks DB for the artist
			const searchRes = await searchArtist(artist.Name);

			// If not in DB, add it
			if (searchRes.length == 0)
			{
				await addArtist(artist);
			}

			// If it is in DB, add the album to the artist
			else
			{
				await updateArtist(searchRes[0]._id, newAlbum._id);
			}
			// return album error or just one
			return ({_id: newAlbum._id, album: newAlbum, error: error});
		}
	}

	async function searchAlbum(key, search)
	{
		var error = '';

		// Fix typo and clean string. Extra LastFM API call but it allows typos
		var cleanSearch = (await lfmAlbumSearch(key, search)).name;

		cleanSearch = titleCleaner(cleanSearch);

		// Checks our MongoDB Database first.
		const db = client.db("Turntable");
		var results = await db.collection('Albums').find({Name: {$regex: cleanSearch+'.*', $options:'i'}}).toArray();

		// Returns array
		if (results.length > 0)
		{
			return({results: results, error:error});
		}

		// If it isn't in our database, search LastFM, returns single album
		else
		{
			results = await addAlbum(key, cleanSearch);

			return({ results: results, error: error });
		}
	}

	// LastFM integration below here. Flipped function naming convention to show they are different.

	// This is the function that finds an album based off of album title text
	async function lfmAlbumSearch(key, search)
	{
		var error = '';

		try
		{
			// Make a request to the Last.fm API
			const response = await axios.get('http://ws.audioscrobbler.com/2.0/',
			{
				params:
				{
					method: 'ALBUM.search',
					album: search,
					api_key: key,
					format: 'json'
				}
			});

			const album = response.data.results.albummatches.album[0];

			const name = album.name;
			const artist = album.artist;

			// Returns largest version of album cover
			const cover = album.image[album.image.length - 1]['#text'];

			const results = {name : name, artist: artist, cover : cover, error: error}

			// Send the response data back to the client
			return(results);
		}
		catch (error)
		{
			// Handle errors
			console.error('Error fetching data from Last.fm:', error);
			return({ error: 'Error fetching data from Last.fm' });
		}
	}

	// This is the function that gets the info that goes into the database and shows off a search.
	async function lfmAlbumInfoSearch(key, search)
	{
		var searchRes = await lfmAlbumSearch(key, search);

		var name = searchRes.name;
		var artist = searchRes.artist;
		var cover = searchRes.cover;

		var year = 0; // Need a workaround, documentation was wrong.
		var tags = [];
		// var rating = 5; Only re add if we want a global rating for each album
		var tracks = [];
		var length = [];

		try
		{
			// Make a request to the Last.fm API
			const response = await axios.get('http://ws.audioscrobbler.com/2.0/',
			{
				params:
				{
					method: 'ALBUM.getInfo',
					artist: artist,
					album: name,
					lang: 'eng',
					api_key: key,
					format: 'json'
				}
			});

			const album = response.data.album;

			// Some albums have no tags? Don't know why
			if (album.tags!= '')
			{
				for(var i = 0; i < album.tags.tag.length; i++)
				{
					tags[i] = album.tags.tag[i].name;
				}
			}

			for(var i = 0; i < album.tracks.track.length; i++)
			{
				tracks[i] = album.tracks.track[i].name;
				length[i] = album.tracks.track[i].duration;
			}
		}
		catch (error)
		{
			// Handle errors
			console.error('Error fetching data from Last.fm:', error);
			return { error: 'Error fetching data from Last.fm' };
		}

		const newAlbum = { Name: name, Artist: artist, Year: year, Tags: tags, Tracks: tracks, Length: length, Cover: cover };

		return newAlbum;
	}

	// Checks given album for messed up things, then fixes them. Runs after adding
	async function albumFix(album)
	{
		const dotenv = require('dotenv');
		const axios = require('axios');

		// Generates a spotify api key. They expire every hour. Very annoying
		spotifyKey = process.env.SPOTIFY_API_KEY;

		// Check if key is expired. If so, renew and update dotenv
		try
		{
			const response = await axios.get('https://api.spotify.com/v1/search',
			{
				params:
				{
					q: 'Philosophy of the World', // Without this search the website will break
					type: 'album',
					limit: 1
				},
				headers:
				{
					'Authorization': `Bearer ${spotifyKey}`
				}
			});
		}

		// Bad code, here just assume token is not good.
		catch(e)
		{
			const clientId = process.env.SPOTIFY_CLIENT_ID;
			const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

			const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', null,
			{
				params:
				{
					grant_type: 'client_credentials'
				},
				auth:
				{
					username: clientId,
					password: clientSecret
				}
			});

			// Define the new token value
			const newTokenValue = tokenResponse.data.access_token;
			spotifyKey = newTokenValue;
		}
		// Grab the album name from the db
		// const db = client.db("Turntable");
		// var dbCheck = await db.collection('Albums').find({_id: albumId}).toArray();
		// var album = dbCheck[0];

		const albumName = album.Name;
		const artistName = album.Artist;
		var spotifyId;
		var year;

		// Gets Spotify ID and year. Needed for every album
		try
		{
			const query = `${albumName} ${artistName}`;
			const response = await axios.get('https://api.spotify.com/v1/search',
			{
				params:
				{
					q: query,
					type: 'album',
					limit: 1
				},
				headers:
				{
					'Authorization': `Bearer ${spotifyKey}`
				}
			});

			spotifyId = response.data.albums.items[0].id;
			var date = response.data.albums.items[0].release_date;

			year = parseInt(date.substring(0, 4));
		}
		catch (e)
		{
			console.log(e);
		}

		album.Year = year;

		var response = await axios.get(`https://api.spotify.com/v1/albums/${spotifyId}`,
		{
			headers:
			{
				'Authorization': `Bearer ${spotifyKey}`
			}
		});

		// Adds spotify's input for tags, because why not, and some lastfm albums have no tags
		album.Tags.push.apply(album.Tags, response.data.genres);

		album.Tags = removeDuplicates(album.Tags);

		// Checks for bad values
		for (var i = 0; i < album.Tracks.length; i++)
		{
			// If broken, fix using Spotify
			if (album.Length[i] == null)
			{
				var milli = response.data.tracks.items[i].duration_ms;

				album.Length[i] = Math.ceil(milli / 1000);
			}

			album.Tracks[i] = titleCleaner(album.Tracks[i]);
		}

		album.Name = titleCleaner(album.Name);

		return album;
	}

	// Used for removing duplicate tags
	function removeDuplicates(arr)
	{
		const uniqueStrings = [];
		const lowerCaseMap = new Map(); // Keeps track of strings, ignoring case

		for (const str of arr)
		{
			const lowerCaseStr = str.toLowerCase();
			if (!lowerCaseMap.has(lowerCaseStr))
			{
				uniqueStrings.push(str);
				lowerCaseMap.set(lowerCaseStr, true);
			}
		}

		return uniqueStrings;
	}

	function titleCleaner(title)
	{
		// Removes - Remaster, - 0-9*, - Single, - Album, (0-9*), (Remaster), (Deluxe), so on, and the same thing but with [] and everything after all of those.
		const pattern = /(?:\((?:Remastered|Deluxe|Parental Advisory|Explicit|Album Version|Single Version|\d+)|\[(?:Remastered|Deluxe|Parental Advisory|Explicit|Album Version|Single Version|\d+)|-\s*(?:Remaster|Album|Single|\d+))\s*.*$/i;

		// Replace the matched pattern at the end of the string with an empty string
		return title.replace(pattern, '').trim();
	}

}
