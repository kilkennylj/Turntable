require('express');
require('mongodb');

const axios = require('axios')

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

	// Slow old way. Will delete later, just kept to avoid some confusion.
/*	app.post('/api/addalbum', async (req, res, next) =>
	{
		// incoming : name, year, genres(array), rating, tracks(array), length(array), cover, jwtToken
		// outgoing : error
		var error = '';

		const { name, year, genres, rating, tracks, length, cover, jwtToken } = req.body;

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

		const newAlbum = { Name: name, Year: year, Genres: genres, Rating: rating, Tracks: tracks, Length: length, Cover: cover };

		try
		{
			const db = client.db("Turntable");
			const result = db.collection("Albums").insertOne(newAlbum);
		}
		catch (e)
		{
			error = e.toString();
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

		var ret = { error: error, jwtToken: refreshedToken };
		res.status(200).json(ret);
	});
	*/

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

	// NOT DONE
	app.post('/api/adduseralbum', async (req, res, next) =>
	{
		// incoming: userId, name, jwtToken
		// outgoing: error, jwtToken
		/*
			This one is simple because of the functions at the bottom.
			Use SearchAlbum, grab _id, add it to the user's album array, add (int)-1 to rating's array.
			You will need to grab the LastFM key from the .env here.
			
			REMEMBER! When calling an ASYNC function write await before the call.
			var results = await searchArtist(search);

			Delete this block comment once completed
		*/
		res.status(500).json( {error: "Has not been completed yet." } );
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

		// Fix typo and clean string. Extra LastFM API call but it allows typos
		var cleanSearch = (await albumSearch(key, search)).name;

		cleanSearch = cleanSearch.replace(/[^a-zA-Z0-9\s']/g, '');

		// Checks our MongoDB Database first.
		const db = client.db("Turntable");
		var results = await db.collection('Albums').find({Name: {$regex: cleanSearch+'.*', $options:'i'}}).toArray();

		var ret;

		var refreshedToken = null;

		try
		{
			refreshedToken = token.refresh(jwtToken);
		}

		catch (e)
		{
			console.log(e.message);
		}

		if (results.length > 0)
		{
			ret = {results: results[0], error:error, jwtToken: refreshedToken};
		}

		// If it isn't in our database, search LastFM
		else
		{
			results = await addAlbum(key, cleanSearch);

			ret = { results: results.album, jwtToken: refreshedToken }
		}

		res.status(200).json(ret);
	});

	// NOT DONE
	// NOTICE, THIS USES GET NOT POST!!
	// This searches the database 
	app.get('app/searchuseralbum', async(req, res) =>
	{
		// incoming: userId, search, jwtToken
		// outgoing: name, artist, year, tags, tracks, length, cover, error, jwtToken
		/*
			This one is slightly more tricky than other endpoints.
			 - First DO NOT USE albumSearch. We don't use this because it was made for singular albums.
			 - What we do is a simple search through our database. 
				 - This is only one line so its not like it will be a big deal not using that function
			 - Get ALL of the _id's from the albums.
			 - Search the user's albums array now for all the values.
			 - Return all albums that are found in that search.

			Make this a function so I can call it from updateUserRating

			REMEMBER! When calling an ASYNC function write await before the call.
			var results = await searchArtist(search);
		*/
		res.status(500).json( {error: "Has not been completed yet." } );
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
			return({ error: "Album already in database"});

		else
		{
			const newAlbum = await albumInfoSearch(key, search);

			// Checks again with new name, gets edge cases.
			try
			{
				const db = client.db("Turntable");

				// Allows alphabet, numbers, (), '', and spaces
				newAlbum.Name = newAlbum.Name.replace(/[^a-zA-Z0-9\s']/g, '');

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
			return ({album: newAlbum, error: error});
		}
	}

	// LastFM integration below here. Flipped function naming convention to show they are different.

	// This is the function that finds an album based off of album title text
	async function albumSearch(key, search)
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
	async function albumInfoSearch(key, search)
	{
		var searchRes = await albumSearch(key, search);

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
					api_key: key,
					format: 'json'
				}
			});

			const album = response.data.album;

			year = 0; // We need a work around for this

			for(var i = 0; i < album.tags.tag.length; i++)
			{
				tags[i] = album.tags.tag[i].name;
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

}
