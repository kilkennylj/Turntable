import React from 'react';
import Register from '../components/Register';
import Background from '../components/Background';

const RegisterPage = () =>
{
	return(
		<div class="tw-overflow-hidden tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center max-sm:tw-bg-gray-300">
			<div class="tw-relative tw-flex tw-items-end tw-justify-end">
				<Register />
				<div class="tw-flex tw-items-center tw-justify-center tw-text-white">
					<Background />
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;