import React, { useState } from 'react';
//import { useJwt } from "react-jwt"; // is said to be required but isn't??
import { jwtDecode } from "jwt-decode";
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
					var user = {firstName:firstName,lastName:lastName,id:userId,jwtToken:accessToken}
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
	
	return(
		<div className="flex justify-center items-center">
			<div className="z-[60] absolute w-[386px] h-[498px] border-2 border-white rounded-md px-12 pt-8 pb-8 max-sm:border-none"></div>
			<form className="z-[60] relative rounded-md px-12 pt-8 pb-8" onSubmit={doLogin}>
				{/* Title text*/}
				<div className="mt-20 mb-10 flex justify-center">
					<label className="w-56 h-20 text-red text-5xl font-normal font-Hendangan">Turntable</label>
				</div>
				{/* Username */}
                <div className="mb-2">
                    <label className="block w-max text-white text-sm font-TWGsb">Username</label>
                    <input className="w-72 h-10 rounded-3xl py-2 px-3 bg-gray-200 border border-black appearance-none" type="text" id="loginName" ref={ (c) => loginName = c} /><br />
                </div>
				{/* Password */}
                <div className="mb-0">
                    <label className="block w-max text-white text-sm font-TWGsb">Password</label>
                    <input className="w-72 h-10 rounded-3xl py-2 px-3 bg-gray-200 border border-black appearance-none" type="password" id="loginPassword" ref={ (c) => loginPassword = c} /><br />
                </div>
				{/* Forgot password subtext */}
                <div className="mb-2">
                    <label className="text-white text-xs underline cursor-pointer font-TWGr">Forgot password?</label>
                </div>
				{/* Login Button */}
                <div className="mb-2 flex justify-center">
                    <input className="w-28 h-10 bg-white hover:bg-gray-50 rounded-3xl underline cursor-pointer text-sm font-TWGsb" type="submit" id="loginButton" value = "Login" onClick={doLogin} />
                </div>
				{/* Register a new account subtext */}
                <div className="mb-2 flex justify-center">
                    <label className="pr-2 text-white text-xs font-TWGr">Don't have an account?</label>
                    <label className="underline cursor-pointer text-white text-xs font-TWGr" onClick={RedirectToRegister}>Register</label>
                </div>
				{/* Error message */}
                <div className="flex justify-center">
                    <span id="loginResult">{message}</span>
                </div>
			</form>
		</div>
	);
};

export default Login;

