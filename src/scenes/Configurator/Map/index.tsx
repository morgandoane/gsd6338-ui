import { Button, Slider } from '@nextui-org/react';
import { Conveyor } from '@system/assemblies/conveyor';
import { FC } from 'react';

export interface MapProps {
	value: Conveyor;
	onChange: (value: Conveyor) => void;
}

const Map: FC<MapProps> = ({ value, onChange }) => {
	return (
		<div className="bg-slate-50 border-r min-w-48">
			<div>
				{value.sections.map((section, index) => (
					<div key={index} className="flex"></div>
				))}
				<p className="text-lg">Belt Width</p>
				<Slider
					minValue={8}
					maxValue={56}
					step={1}
					value={value.belt.width}
					onChange={(width) => {
						if (typeof width === 'number') {
							onChange({
								...value,
								belt: {
									...value.belt,
									turnRadiusInside: width + 2,
									width,
								},
							});
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Map;
