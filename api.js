require('express');
require('mongodb');

exports.setApp = function (app, client)
{
	// this is my attempt at getting JWTs to work. It doesnt work but logs in
	// even though it logs in, it cant find first, last or error.
	// please ping me the second you struggle understanding/doing here.
	// i will try to catch you up to whats happening
	/*app.post('/api/login', async (req, res, next) =>
	{
		// incoming: login, password
		// outgoing: id, firstName, lastName, error
		const { login, password } = req.body;
		
		const db = client.db('Turntable');
		const results = await 
			db.collection('Users').find({Login:login,Password:password}).toArray();
		
		var id = -1;
		var firstName = '';
		var lastName = '';
		var error = '';
		
		if( results.length > 0 )
		{
			id = results[0].UserID;
			firstName = results[0].FirstName;
			lastName = results[0].LastName;
			
			// Page 10 of MERN C seems to be missing somethign for JWT's in Login.js
			/*try
			{
				const token = require("./createJWT.js");
				ret = token.createToken(firstName, lastName, id);
			}
			
			catch(e)
			{
				ret = {id, firstName, lastName, error:e.message};
			}
		}
		
		else
		{
			error = "Login or Password is incorrect";
		}
		
		var ret = { id:id, firstName:firstName, lastName:lastName, error:error};
		res.status(200).json(ret);
	});*/
	
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
		
		res.status(200).json(ret);
	});
	
	// MERN C at 17:20 or page 5-9 have required JWT integration code to confirm that 
	// someone is logged in. code that as part of every endpoint
}
