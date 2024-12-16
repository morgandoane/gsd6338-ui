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
			<Route index element={<Configurator />} />
		</Routes>
	);
};

export default App;
