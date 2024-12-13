import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Problem from '@scenes/Problem/index.tsx';
import { NextUIProvider } from '@nextui-org/react';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<NextUIProvider>
			<ErrorBoundary fallbackRender={({ error }) => <Problem error={error} />}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ErrorBoundary>
		</NextUIProvider>
	</StrictMode>
);
