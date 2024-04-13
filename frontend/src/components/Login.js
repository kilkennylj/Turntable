import React, { useState } from 'react';
//import { useJwt } from "react-jwt"; // is said to be required but isn't??
import { jwtDecode } from "jwt-decode";
// FOR DEMONSTRATION PURPOSES ONLY - DELETE AFTER USE - REPLACE WITH <LINK> ELEMENT FROM REACT ROUTER
import { RedirectToRegister } from './Redirect.js';
import { RedirectToForgotPassword } from './Redirect.js';

function Login()
{
	var bp = require('./Path.js');	
	
	var loginName;
	var loginPassword;
	
	const [message,setMessage] = useState('');
	
	const doLogin = async event =>
	{
		if(loginName !== "" && loginPassword !== "")
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
		}
		else
		{
			setMessage("Please fill out all forms");
		}
	};
	
	return(
		<div className="tw-flex tw-justify-center tw-items-center">
			<div className="tw-z-[60] tw-absolute tw-w-[384px] tw-h-[496px] tw-border-2 tw-border-white tw-rounded-md tw-px-12 tw-pt-8 tw-pb-8 max-sm:tw-border-none"></div>
			<form className="tw-z-[60] tw-relative tw-rounded-md tw-px-12 tw-pt-8 tw-pb-8" onSubmit={doLogin}>
				{/* Title text*/}
				<div className="tw-mt-20 tw-mb-10 tw-flex tw-justify-center">
					<label className="tw-w-56 tw-h-20 tw-text-red tw-text-5xl tw-font-normal tw-font-Hendangan">Turntable</label>
				</div>
				{/* Username */}
                <div className="tw-mb-2">
                    <label className="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">Username</label>
                    <input className="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="text" id="loginName" placeholder="Your username..." ref={ (c) => loginName = c} /><br />
                </div>
				{/* Password */}
                <div className="tw-mb-0">
                    <label className="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">Password</label>
                    <input className="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="password" id="loginPassword" placeholder="Your password..." ref={ (c) => loginPassword = c} /><br />
                </div>
				{/* Forgot password subtext
                <div className="tw-mb-2">
                    <label className="tw-text-white tw-text-xs tw-underline tw-cursor-pointer tw-font-TWGr" onClick={RedirectToForgotPassword}>Forgot password?</label>
                </div> */}
				{/* Login Button */}
                <div className="tw-mb-2 tw-flex tw-justify-center">
                    <input className="tw-w-28 tw-h-10 tw-bg-white hover:tw-bg-gray-50 tw-rounded-3xl tw-underline tw-cursor-pointer tw-text-sm tw-font-TWGsb" type="submit" id="loginButton" value = "Login" onClick={doLogin} />
                </div>
				{/* Register a new account subtext */}
                <div className="tw-mb-2 tw-flex tw-justify-center">
                    <label className="tw-pr-2 tw-text-white tw-text-xs tw-font-TWGr">Don't have an account?</label>
                    <label className="tw-underline tw-cursor-pointer tw-text-white tw-text-xs tw-font-TWGr" onClick={RedirectToRegister}>Register</label>
                </div>
				{/* Error message */}
                <div className="tw-flex tw-justify-center">
                    <span id="loginResult">{message}</span>
                </div>
			</form>
		</div>
	);
};

export default Login;

