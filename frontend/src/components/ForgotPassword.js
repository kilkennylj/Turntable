import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";

function ForgotPassword()
{
    var bp = require('./Path.js');

    var email;

    const [message,setMessage] = useState('');

    const doForgetPassword = async event =>
    {
        if(email.value != "")
        {
            // Send email
            event.preventDefault();

            var obj = {email:email.value};

            var js = JSON.stringify(obj);

            try
            {
                const response = await fetch(bp.buildPath('api/forgotpassword'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                var res = JSON.parse(await response.text());

                const { accessToken } = res;

                const decoded = jwtDecode(accessToken,{complete:true});

                try
				{
					var ud = decoded;
					var userId = ud.userId;
                    var error = ud.error;
					
					if (userId <= 0)
					{
						setMessage("User/Password combination incorrect");
					}
					
					else
					{
						var user = {id:userId,jwtToken:accessToken}
						localStorage.setItem('user_data', JSON.stringify(user));
						
						setMessage('');
						window.location.href = '/';
					}
				}

				catch(e)
				{
                    // Message
				}
            }
            catch(e)
            {
                // Message
            }
        }
        else
        {
            // Email empty
        }
    }

    return(
        <div class="tw-flex tw-justify-center tw-items-center">
            <form class="tw-z-[60] tw-relative tw-rounded-md tw-px-12 tw-pt-12 tw-pb-8">
                {/* Forgot Password */}
				<div class="tw-mt-20 tw-mb-5 tw-flex tw-justify-center">
					<label class="tw-text-white tw-text-2xl tw-font-TWGsb">Forgot Password</label>
				</div>
                {/* Email */}
                <div class="tw-mb-2">
                    <label class="tw-block tw-w-max tw-text-white tw-text-sm tw-font-TWGsb">Email</label>
                    <input class="tw-w-72 tw-h-10 tw-rounded-3xl tw-pt-1 tw-px-3 tw-bg-gray-200 tw-border tw-border-black tw-appearance-none tw-placeholder-gray-300 tw-font-TWGsb tw-text-sm tw-text-black" type="email" id="email" placeholder="Your email..." ref={ (c) => email = c} /><br />
                </div>
                {/* Submit Button */}
                <div class="tw-mb-3 tw-flex tw-justify-center">
                    <input class=" tw-w-32 tw-h-10 tw-bg-white hover:tw-bg-gray-50 tw-rounded-3xl tw-underline tw-cursor-pointer tw-text-sm tw-font-TWGsb" type="submit" id="loginButton" value="Submit" onClick={doForgetPassword} />
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword