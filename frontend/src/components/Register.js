import React, { useState } from 'react';
//import { useJwt } from "react-jwt"; // is said to be required but isn't??
// FOR DEMONSTRATION PURPOSES ONLY - DELETE AFTER USE - REPLACE WITH <LINK> ELEMENT FROM REACT ROUTER
import { RedirectToLogin } from './Redirect.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import PasswordComplexity from './PasswordComplexity.js';
import { PasswordComplexityBoolean } from './PasswordComplexityBoolean.js';

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
    
		// var bool = PasswordComplexityBoolean(loginPassword);

        if(firstName.value !== "" && lastName.value !== "" && email.value !== "" && loginName.value !== "" && loginPassword !== "")
        {
            event.preventDefault();
		
            var obj = {firstName:firstName.value,lastName:lastName.value,email:email.value,login:loginName.value,password:loginPassword.value};
            
            var js = JSON.stringify(obj);
        
            try
            {
                await fetch(bp.buildPath('api/register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            
                RedirectToLogin();
            }
            
            // setMessage was added in, not in MERN C but its required
            catch(e)
            {
                setMessage("User account already exists");
                return("");
            }
        }
        else
        {
            setMessage("Please fill out all forms")
        }
	};

	const [ password, setPassword ] = useState('');
	
	return(
		<div className="tw-flex tw-justify-center tw-items-center">
			<div className="tw-z-[60] tw-absolute tw-w-[384px] tw-h-[667px] tw-border-2 tw-border-white tw-rounded-md tw-px-12 tw-pt-8 tw-pb-8 max-sm:tw-border-none"></div>
			<form className="tw-z-[60] tw-relative tw-rounded-md tw-px-12 tw-pt-12 tw-pb-8" onSubmit={doRegister}>
                {/* First Name */}
                <div className="tw-mb-2">
                    <label className="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">First Name</label>
                    <input className="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="text" id="firstName" placeholder="Your first name..." ref={ (c) => firstName = c} /><br />
                </div>
                {/* Last Name */}
                <div className="tw-mb-2">
                    <label className="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">Last Name</label>
                    <input className="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="text" id="lastName" placeholder="Your last name..." ref={ (c) => lastName = c} /><br />
                </div>
                {/* Email  */}
                <div className="tw-mb-2">
                    <label className="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">Email</label>
                    <input className="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="email" id="email" placeholder="Your email..." ref={ (c) => email = c} /><br />
                </div>
                {/* Username */}
                <div className="tw-mb-2">
                    <label className="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">Username</label>
                    <input className="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="text" id="loginName" placeholder="Your username..." ref={ (c) => loginName = c} /><br />
                </div>
                {/* Password */}
                <div className="tw-mb-2">
                    <label className="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">Password</label>
                    <input className="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="password" id="loginPassword" placeholder="Your password..." ref={ (c) => loginPassword = c} onChange={e => setPassword(e.target.value)} /><br />
                </div>
				{/* <div class="tw-mb-3">
					<PasswordComplexity password={password}/>
				</div> */}
                {/* Register Button */}
                <div className="tw-mb-3 tw-flex tw-justify-center">
                    <input className=" tw-w-32 tw-h-10 tw-bg-white hover:tw-bg-gray-50 tw-rounded-3xl tw-underline tw-cursor-pointer tw-text-sm tw-font-TWGsb" type="submit" id="loginButton" value="Register" onClick={doRegister} />
                </div>
                {/* Login to existing account subtext */}
                <div className="tw-mb-2 tw-flex tw-justify-center">
                    <label className="tw-pr-2 tw-text-white tw-text-xs tw-font-TWGr">Already have an account?</label>
                    <label className="tw-underline tw-cursor-pointer tw-text-white tw-text-xs tw-font-TWGr" onClick={RedirectToLogin}>Login</label>
                </div>
                {/* Error message */}
                <div className="tw-absolute tw-text-red">
                    <span id="loginResult">{message}</span>
                </div>
			</form>
		</div>
	);
};

export default Register;

