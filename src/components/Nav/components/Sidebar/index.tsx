/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ButtonProps } from '@nextui-org/react';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	strokeWidth={1.5}
	stroke="currentColor"
	className="size-6"
>
	<path
		strokeLinecap="round"
		strokeLinejoin="round"
		d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
	/>
</svg>;

export interface SidebarProps {
	open?: boolean;
}

const Sidebar: FC<SidebarProps> = ({ open = true }) => {
	const { pathname } = useLocation();
	const nav = useNavigate();

	const btnProps = (path: string): ButtonProps => ({
		color: pathname.includes(path) ? 'primary' : 'default',
	});

	return (
		<div className="p-2 border-r flex flex-col">
			<Button
				isIconOnly
				{...btnProps('dashboard')}
				className="mb-2"
				onClick={() => nav('/dashboard')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
					/>
				</svg>
			</Button>
			<Button
				isIconOnly
				{...btnProps('account')}
				className="mb-2"
				onClick={() => nav('/account')}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>
			</Button>
		</div>
	);
};

export default Sidebar;
