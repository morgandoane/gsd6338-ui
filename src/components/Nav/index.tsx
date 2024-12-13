import { FC, PropsWithChildren } from 'react';
import Sidebar from './components/Sidebar';

const Nav: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="h-screen flex overflow-hidden items-stretch">
			<Sidebar />
			<div className="flex-1 flex flex-row justify-center items-start p-8">
				<div className="flex-1 max-w-screen-xl">{children}</div>
			</div>
		</div>
	);
};

export default Nav;
