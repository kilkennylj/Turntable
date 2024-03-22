require('express');
require('mongodb');

const axios = require('axios')

exports.setApp = function (app, client) {
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
		// incoming : firstName, lastName, login, password, email, albums(empty)
		// outgoing : error
		var error = '';

		const { firstName, lastName, email, login, password } = req.body;

		var _ret = [];

		try
		{
			const db = client.db("Turntable");
			var albums = [];

			// somehow get the largest UserID in the database, add one, put it in the newUser
			// also check for error here, just realized this function doesn't do that

			var newUser = { FirstName: firstName, LastName: lastName, Login: login, Password: password, Albums: albums, Email: email };
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
		// outgoing : error
		var error = '';

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

		// LastFM integration
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

			var refreshedToken = null;

			try
			{
				refreshedToken = token.refresh(jwtToken);
			}

			catch (e)
			{
				console.log(e.message);
			}

			// const searchRes = ; // equals something
			// const name;
			// const artist;

			// Change 0 to a different number for different sizes
			const cover = album.image[0]['#text'];

			// Send the response data back to the client
			res.json({ name, artist, cover, error: error, refreshedToken: refreshedToken });
		}
		catch (error)
		{
			// Handle errors
			console.error('Error fetching data from Last.fm:', error);
			res.status(500).json({ error: 'Error fetching data from Last.fm' });
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

	app.post('/api/addartist', async (req, res, next) => 
	{
		// incoming : name, year, genres(array), rating, albums(array), jwtToken
		// outgoing : error
		var error = '';

		const { name, year, genres, rating, albums, jwtToken } = req.body;

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

		const newArtist = { Name: name, Year: year, Genres: genres, Rating: rating, Albums: albums };

		try
		{
			const db = client.db("Turntable");
			const result = db.collection("Artists").insertOne(newArtist);
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

	// NOTICE, THIS USES GET NOT POST!!
	// This searchs LastFM for an album given some text relating to album title
	app.get('/api/searchalbum', async (req, res) =>
	{
		// incoming: search, jwtToken
		// outgoing: name, artist, cover, error, refreshedToken
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

		results = await albumSearch(key, search);

		const name = results.name;

		if(results.error == null || results.error.length == 0)
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

			var ret = { results, refreshedToken: refreshedToken}

			res.status(200).json(ret);
		}	

		// should be correct for when it fails. hard to test since it only happens when the API limit is reached.
		else
			res.status(500).json(results.error);
	});

	// LastFM integration
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

			// Change 0 to a different number for different sizes
			const cover = album.image[0]['#text'];

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

}
