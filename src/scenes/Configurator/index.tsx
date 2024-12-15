import { FC, useState } from 'react';
import Map from './Map';
import View from './View';
import { Conveyor } from '@system/assemblies/conveyor';
import { Section } from '@system/assemblies/section';
import Popover from './View/components/Popover';

export type Focus = {
	section: Section;
	index: number;
	x: number;
	y: number;
};

const Configurator: FC = () => {
	const [focus, setFocus] = useState<Focus | null>(null);

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
		sidewall: {
			thickness: 0.1875,
		},
	});

	return (
		<div className="h-screen flex items-stretch">
			<Map value={conveyor} onChange={setConveyor} />
			<View
				value={conveyor}
				onChange={setConveyor}
				setFocus={setFocus}
				focus={focus}
			/>
			<Popover
				value={
					focus ? { ...focus, section: conveyor.sections[focus.index] } : null
				}
				onChange={(value) => {
					if (value) {
						setConveyor({
							...conveyor,
							sections: conveyor.sections.map((section, index) =>
								index === focus?.index ? value : section
							),
						});
					} else {
						setFocus(null);
					}
				}}
				onClose={() => setFocus(null)}
			/>
		</div>
	);
};

export default Configurator;
