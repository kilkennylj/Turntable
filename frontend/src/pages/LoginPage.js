import React from 'react';
import Login from '../components/Login';
import Background from '../components/Background';

const LoginPage = () =>
{
	return(
		<div className="overflow-hidden w-screen h-screen flex justify-center items-center max-sm:bg-gray-300">
			<div className="relative flex items-end justify-end">
				<Login />
				<div className="flex items-center justify-center text-white">
					<Background />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
