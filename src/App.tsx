import Account from '@scenes/Account';
import Configurator from '@scenes/Configurator';
import Dashboard from '@scenes/Dashboard';
import Landing from '@scenes/Landing';
import Problem from '@scenes/Problem';
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

const App: FC = () => {
	return (
		<Routes>
			<Route index element={<Landing />} />
			<Route path="account" element={<Account />} />
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="dashboard/:id" element={<Configurator />} />
			<Route
				path="*"
				element={
					<Problem
						title="404"
						description="Page not found"
						error={new Error('Page not found')}
					/>
				}
			/>
		</Routes>
	);
};

export default App;
