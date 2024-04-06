import React, { useState } from 'react';
//import { useJwt } from "react-jwt"; // is said to be required but isn't??
import jwtDecode from "jwt-decode";
// FOR DEMONSTRATION PURPOSES ONLY - DELETE AFTER USE - REPLACE WITH <LINK> ELEMENT FROM REACT ROUTER
import { RedirectToRegister } from './Redirect.js';

function Login()
{
	var bp = require('./Path.js');	
	
	var loginName;
	var loginPassword;
	
	const [message,setMessage] = useState('');
	
	const doLogin = async event =>
	{
		event.preventDefault();
		
		var obj = {login:loginName.value,password:loginPassword.value};
		
		var js = JSON.stringify(obj);
	
		try
		{
			const response = await fetch(bp.buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
			
			var res = JSON.parse(await response.text());
			
			const { accessToken } = res;
			
			const decoded = jwtDecode(accessToken,{complete:true});

			try
			{
				var ud = decoded;
				var userId = ud.userId;
				var firstName = ud.firstName;
				var lastName = ud.lastName;
				
				if (userId <= 0)
				{
					setMessage("User/Password combination incorrect");
				}
				
				else
				{
					var user = {firstName:firstName,lastName:lastName,id:userId}
					localStorage.setItem('user_data', JSON.stringify(user));
					
					setMessage('');
					window.location.href = '/landing';
				}
			}
			
			// setMessage was added in, not in MERN C but its required
			catch(e)
			{
				setMessage("User/Password combination incorrect");
				return("");
			}
		}
		
		// setMessage was added in, not in MERN C but its required
		catch(e)
		{
			setMessage("User/Password combination incorrect");
			return("");
		}
	};
	
	// return(
	// 	
	// );
};

export default Login;

