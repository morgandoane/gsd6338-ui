import Nav from '@components/Nav';
import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Dashboard: FC = () => {
	const nav = useNavigate();
	return (
		<Nav>
			<div className="flex justify-between items-center">
				<p className="text-3xl font-bold">Conveyors</p>
				<Button
					onPress={() => {
						nav('new');
					}}
					color="primary"
					endContent={<PlusIcon />}
				>
					New
				</Button>
			</div>
			<div></div>
		</Nav>
	);
};

export default Dashboard;
