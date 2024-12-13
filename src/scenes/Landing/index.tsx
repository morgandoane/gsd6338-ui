import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: FC = () => {
	const nav = useNavigate();
	return (
		<div className="h-screen">
			<div>
				<Button onPress={() => nav('/dashboard')}>Get Started</Button>
			</div>
		</div>
	);
};

export default Landing;
