import Configurator from '@scenes/Configurator';
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
