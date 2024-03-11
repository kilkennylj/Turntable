import React, { useState } from 'react';
//import { useJwt } from "react-jwt"; // is said to be required but isn't??
import { jwtDecode } from "jwt-decode";
// FOR DEMONSTRATION PURPOSES ONLY - DELETE AFTER USE - REPLACE WITH <LINK> ELEMENT FROM REACT ROUTER
import { RedirectToLogin } from './Redirect.js';

function Register()
{
	var bp = require('./Path.js');
	
    var firstName;
    var lastName;
    var email;
	var loginName;
	var loginPassword;
	
	const [message,setMessage] = useState('');
	
	const doRegister = async event =>
	{
		event.preventDefault();
		
		var obj = {firstName:firstName.value,lastName:lastName.value,email:email.value,login:loginName.value,password:loginPassword.value};
		
		var js = JSON.stringify(obj);
	
		try
		{
			const response = await fetch(bp.buildPath('api/register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
			
			var res = JSON.parse(await response.text());
			
			const { accessToken } = res;
			
			// const decoded = jwtDecode(accessToken,{complete:true});

			// try
			// {
			// 	var ud = decoded;
			// 	var userId = ud.userId;
			// 	var firstName = ud.firstName;
			// 	var lastName = ud.lastName;
				
			// 	if (userId <= 0)
			// 	{
			// 		setMessage("User account already exists");
			// 	}
				
			// 	else
			// 	{
			// 		var user = {firstName:firstName,lastName:lastName,id:userId}
			// 		localStorage.setItem('user_data', JSON.stringify(user));
					
			// 		setMessage('');
			// 		window.location.href = '/albums';
			// 	}
            //     window.location.href = '/login';
			// }
			
			// // setMessage was added in, not in MERN C but its required
			// catch(e)
			// {
			// 	setMessage("User account already exists");
			// 	return("");
			// }
			RedirectToLogin();
		}
		
		// setMessage was added in, not in MERN C but its required
		catch(e)
		{
			setMessage("User account already exists");
			return("");
		}
	};
	
	return(
		<div class="w-screen h-screen flex justify-center items-center">
			<form class="bg-gray-400 border border-black rounded px-12 pt-8 pb-8" onSubmit={doRegister}>
                {/* First Name */}
                <div class="mb-2">
                    <label class="block w-max text-black text-lg font-bold font-['Lucida Sans Typewriter']">First Name</label>
                    <input class="w-72 h-10 rounded-3xl py-2 px-3 bg-white border border-black appearance-none" type="text" id="firstName" ref={ (c) => firstName = c} /><br />
                </div>
                {/* Last Name */}
                <div class="mb-2">
                    <label class="block w-max text-black text-lg font-bold font-['Lucida Sans Typewriter']">Last Name</label>
                    <input class="w-72 h-10 rounded-3xl py-2 px-3 bg-white border border-black appearance-none" type="text" id="lastName" ref={ (c) => lastName = c} /><br />
                </div>
                {/* Email  */}
                <div class="mb-2">
                    <label class="block w-max text-black text-lg font-bold font-['Lucida Sans Typewriter']">Email</label>
                    <input class="w-72 h-10 rounded-3xl py-2 px-3 bg-white border border-black appearance-none" type="email" id="email" ref={ (c) => email = c} /><br />
                </div>
                {/* Username */}
                <div class="mb-2">
                    <label class="block w-max text-black text-lg font-bold font-['Lucida Sans Typewriter']">Username</label>
                    <input class="w-72 h-10 rounded-3xl py-2 px-3 bg-white border border-black appearance-none" type="text" id="loginName" ref={ (c) => loginName = c} /><br />
                </div>
                {/* Password */}
                <div class="mb-4">
                    <label class="block w-max text-black text-lg font-bold font-['Lucida Sans Typewriter']">Password</label>
                    <input class="w-72 h-10 rounded-3xl py-2 px-3 bg-white border border-black appearance-none" type="password" id="loginPassword" ref={ (c) => loginPassword = c} /><br />
                </div>
                {/* Register Button */}
                <div class="mb-2 md:flex md:justify-center">
                    <input class=" w-32 h-10 bg-white rounded-3xl font-bold underline cursor-pointer font-['Lucida Sans Typewriter']" type="submit" id="loginButton" value = "Register" onClick={doRegister} />
                </div>
                {/* Login to existing account subtext */}
                <div class="mb-2 md:flex md:justify-center">
                    <label class="pr-2">Already have an account?</label>
                    <label class="underline cursor-pointer" onClick={RedirectToLogin}>Login</label>
                </div>
                {/* Error message */}
                <div class="md:flex md:justify-center">
                    <span id="loginResult">{message}</span>
                </div>
			</form>
		</div>
	);
};

export default Register;

