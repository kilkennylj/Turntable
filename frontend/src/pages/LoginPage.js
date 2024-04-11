import React from 'react';
import Login from '../components/Login';
import Background from '../components/Background';

const LoginPage = () =>
{
	return(
		<div className="tw-overflow-hidden tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center max-sm:tw-bg-gray-300">
			<div className="tw-relative tw-flex tw-items-end tw-justify-end">
				<Login />
				<div className="tw-flex tw-items-center tw-justify-center tw-text-white">
					<Background />
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
