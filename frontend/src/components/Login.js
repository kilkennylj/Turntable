import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import { jwtDecode } from "jwt-decode";

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
				var userId = ud.userId; // might be wrong case
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
			
			catch(e)
			{
				console.log(e.toString());
				return("");
			}
		}
		
		catch(e)
		{
			console.log(e.toString());
			return("");
		}
	};
	
	return(
		<div id="loginDiv">
			<form onSubmit={doLogin}>
			<span id="inner-title">Log In</span><br />
			<input type="text" id="loginName" placeholder="Username"
				ref={ (c) => loginName = c} /><br />
			<input type="password" id="loginPassword" placeholder="Password"
			ref={ (c) => loginPassword = c} /><br />
			<input type="submit" id="loginButton" class="buttons" value = "Do It"
				onClick={doLogin} />
			</form>
			<span id="loginResult">{message}</span>
		</div>
	);
};

export default Login;

