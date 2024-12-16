import { Button, Slider } from '@nextui-org/react';
import { Conveyor } from '@system/conveyor';
import { FC } from 'react';
import logo from './logo.svg';

export interface MapProps {
	value: Conveyor;
	onChange: (value: Conveyor) => void;
}

const Map: FC<MapProps> = ({ value, onChange }) => {
	return (
		<div className="border-r min-w-64 bg-gray-900 text-white">
			<div className="p-8">
				<div>
					<div className="flex flex-row items-center gap-2 mb-12">
						<img src={logo} alt="buildform" className="h-8 w-8 " />
						<p className="text-2xl font-semibold">buildform</p>
					</div>
				</div>
				<p className="text-xl font-semibold mb-2">Settings</p>
				<div className="flex justify-between mb-2">
					<p>Belt Width</p>
					<p>{value.belt.width}"</p>
				</div>
				<Slider
					minValue={8}
					maxValue={56}
					step={1}
					value={value.belt.width}
					onChange={(val) => {
						if (typeof val === 'number') {
							onChange({ ...value, belt: { ...value.belt, width: val } });
						}
					}}
				/>
				<div className="flex justify-between mt-2 mb-2">
					<p>Belt Radius</p>
					<p>{value.belt.radius}"</p>
				</div>
				<Slider
					minValue={8}
					maxValue={56}
					step={1}
					value={value.belt.radius}
					onChange={(val) => {
						if (typeof val === 'number') {
							onChange({ ...value, belt: { ...value.belt, radius: val } });
						}
					}}
				/>
			</div>
		</div>
	);
};

export default Map;
