require('express');
require('mongodb');

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
		const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

		var id = -1;
		var firstName = '';
		var lastName = '';

		var ret;

		// if valid
		if ( results.length > 0 )
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

			catch(e)
			{
				ret = {error:e.message};
			}
		}

		// if invalid
		else
		{
			ret = {error:"Login or Password is incorrect"};
		}

		console.log(ret);

		// note that this returns a JWT
		res.status(200).json(ret);
	});

	app.post('/api/register', async (req, res, next) =>
    {
    	// incoming : firstName, lastName, login, password, email, albums(empty)
    	// outgoing : error
    	var error = '';

    	const { firstName, lastName, email, login, password} = req.body;

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
		catch(e)
		{
			error = e.toString();
		}

		// I believe it should be like this, like the other endpoints
		var ret = {results: _ret, error: error};
    	res.status(200).json(ret);
    });

    app.post('/api/addalbum', async (req, res, next) =>
    {
		// incoming : name, year, genres(array), rating, tracks(array), length(array), cover
		// outgoing : error
		var error = '';

		const { name, year, genres, rating, tracks, length, cover, jwtToken } = req.body;

		var token = require('./createJWT.js');

		try
		{
			if (token.isExpired(jwtToken))
			{
				var r = {error:'The JWT is no longer valid', jwtToken: ''};
				res.status(200).json(r);
				return;
			}
		}

		catch(e)
		{
			console.log(e.message);
		}

		const newAlbum = {Name: name, Year: year, Genres: genres, Rating: rating, Tracks: tracks, Length: length, Cover: cover};

		try
		{
			const db = client.db("Turntable");
			const result = db.collection("Albums").insertOne(newAlbum);
		}
		catch(e)
		{
			error = e.toString();
		}

		var refreshedToken = null;

		try
		{
			refreshedToken = token.refresh(jwtToken);
		}

		catch(e)
		{
			console.log(e.message);
		}

		var ret = {error: error, jwtToken: refreshedToken};
		res.status(200).json(ret);
    });

    app.post('/api/addartist', async (req, res, next) =>
    {
		// incoming : name, year, genres(array), rating, tracks(array), length(array), cover
		// outgoing : error
		var error = '';

		const { name, debut, genres, rating, albums, jwtToken } = req.body;

		var token = require('./createJWT.js');

		try
		{
			if (token.isExpired(jwtToken))
			{
				var r = {error:'The JWT is no longer valid', jwtToken: ''};
				res.status(200).json(r);
				return;
			}
		}

		catch(e)
		{
			console.log(e.message);
		}

		const newArtist = {Name: name, Debut: debut, Genres: genres, Rating: rating, Albums: albums};

		try
		{
			const db = client.db("Turntable");
			const result = db.collection("Albums").insertOne(newAlbum);
		}
		catch(e)
		{
			error = e.toString();
		}

		var refreshedToken = null;

		try
		{
			refreshedToken = token.refresh(jwtToken);
		}

		catch(e)
		{
			console.log(e.message);
		}

		var ret = {error: error, jwtToken: refreshedToken};
		res.status(200).json(ret);
    });

}
