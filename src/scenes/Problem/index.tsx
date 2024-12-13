import { FC, PropsWithChildren } from 'react';

export interface ProblemProps {
	title?: string;
	description?: string;
	error?: Error;
}

const Problem: FC<PropsWithChildren<ProblemProps>> = ({
	title = 'Yikes!',
	description = 'Something went wrong.',
	error = new Error('An unknown error occurred.'),
	children = null,
}) => {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">{title}</h1>
			<p className="text-lg">{description}</p>
			{import.meta.env.MODE === 'development' && (
				<pre className="text-sm text-left mt-4">
					{error.message}
					{error.stack}
				</pre>
			)}
			{children}
		</div>
	);
};

export default Problem;
