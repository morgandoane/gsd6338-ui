import { FC, useEffect, useState } from 'react';
import Map from './Map';
import View from './View';
import { Conveyor } from '@system/conveyor';
import { Section } from '@system/section';
import Popover from './Popover';

export type Focus = {
	section: Section;
	index: number;
	x: number;
	y: number;
};

const defaultConveryor: Conveyor = {
	sections: [],
	belt: {
		thickness: 0.5,
		width: 48,
		radius: 48,
	},
	padding: 0.5,
	height: 10,
};

const Configurator: FC = () => {
	const [focus, setFocus] = useState<Focus | null>(null);

	const [conveyor, setConveyor] = useState<Conveyor>(() => {
		// const fromStorage = localStorage.getItem('conveyor');
		// if (fromStorage) {
		// 	return JSON.parse(fromStorage);
		// } else {
		// 	return defaultConveryor;
		// }
		return defaultConveryor;
	});

	useEffect(() => {
		localStorage.setItem('conveyor', JSON.stringify(conveyor));
	}, [conveyor]);

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
					focus
						? {
								...focus,
								section: conveyor.sections[focus.index],
						  }
						: null
				}
				onChange={(val) => {
					if (!val) {
						setFocus(null);
					} else {
						setConveyor({
							...conveyor,
							sections: conveyor.sections.map((section, i) =>
								i === focus?.index ? val.section : section
							),
						});
					}
				}}
			/>
		</div>
	);
};

export default Configurator;
