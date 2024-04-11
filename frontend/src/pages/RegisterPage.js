import React from 'react';
import Register from '../components/Register';
import Background from '../components/Background';

const RegisterPage = () =>
{
	return(
		<div className="overflow-hidden w-screen h-screen flex justify-center items-center max-sm:bg-gray-300">
			<div className="relative flex items-end justify-end">
				<Register />
				<div className="flex items-center justify-center text-white">
					<Background />
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;