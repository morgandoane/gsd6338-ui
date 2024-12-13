import { FC, useState } from 'react';
import Map from './Map';
import View from './View';
import { Conveyor } from '@system/assemblies/conveyor';

const Configurator: FC = () => {
	const [conveyor, setConveyor] = useState<Conveyor>({
		sections: [],
		belt: {
			thickness: 0.5,
			width: 48,
			turnRadiusInside: 50,
			name: 'PR620',
			material: {
				name: 'Acetal',
			},
		},
	});

	return (
		<div className="h-screen flex items-stretch">
			<Map value={conveyor} onChange={setConveyor} />
			<View value={conveyor} onChange={setConveyor} />
		</div>
	);
};

export default Configurator;
