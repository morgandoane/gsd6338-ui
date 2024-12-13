import { Button } from '@nextui-org/react';
import { Conveyor } from '@system/assemblies/conveyor';
import { FC } from 'react';

export interface MapProps {
	value: Conveyor;
	onChange: (value: Conveyor) => void;
}

const Map: FC<MapProps> = ({ value, onChange }) => {
	return (
		<div className="">
			<div>
				{value.sections.map((section, index) => (
					<div key={index} className="flex"></div>
				))}
				<Button
					onPress={() => {
						onChange({
							...value,
							sections: [...value.sections, { type: 'straight', length: 96 }],
						});
					}}
				>
					Add Section
				</Button>
			</div>
		</div>
	);
};

export default Map;
