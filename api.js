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
		
		res.status(200).json(ret);
	});
}
