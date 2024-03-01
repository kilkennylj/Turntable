const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (firstName, lastName, id)
{
	return _createToken(firstName, lastName, id);
}

_createToken = function (firstName, lastName, id)
{
	try
	{
		const expiration = new Date();
		const user = {userId:id, firstName:firstName, lastName:lastName};
		
		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
		
		/*
		// for values other than default
		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '30m' } );
		*/
		
		var ret = {accessToken:accessToken};
	}
	
	catch(e)
	{
		var ret = {error:e.message};
	}
	
	return ret;
}

exports.isExpired = function( token )
{
	var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
		(err, verifiedJwt) =>
	{
		if (err)
		{
			return true;
		}
		
		else
		{
			return false;
		}
	});
	
	return isError;
}

exports.refresh = function(token)
{
	var ud = jwt.decode(token,{complete:true});
	
	var userId = ud.payload.id;
	var firstName = ud.payload.firstName;
	var lastName = ud.payload.lastName;
	
	return _createToken(firstName, lastName, userId);
}
