import { Button, ButtonGroup, Slider } from '@nextui-org/react';
import { Section } from '@system/assemblies/section';
import { FC } from 'react';

export interface PopoverProps {
	value: {
		section: Section;
		index: number;
		x: number;
		y: number;
	} | null;
	onChange: (value: Section | null) => void;
	onClose: () => void;
}

const Popover: FC<PopoverProps> = ({ value, onChange, onClose }) => {
	if (!value) return null;
	else {
		return (
			<div
				className="fixed bg-white border border-gray-300 rounded shadow-xl p-4"
				style={{ top: value.y, left: value.x }}
			>
				<div className="flex justify-between items-center">
					<p className="text-md font-semibold">
						{value.section.type === 'straight'
							? 'Straight Section'
							: 'Turn Section'}
					</p>
					<Button variant="light" size="sm" onPress={onClose} isIconOnly>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18 18 6M6 6l12 12"
							/>
						</svg>
					</Button>
				</div>
				<div className="mb-2" />
				{value.section.type === 'straight' && (
					<Slider
						size="sm"
						label="Length"
						value={value.section.length}
						minValue={24}
						maxValue={120}
						onChange={(e) => {
							if (typeof e === 'number') {
								onChange({
									type: 'straight',
									length: e,
								});
							}
						}}
					/>
				)}
				{value.section.type === 'turn' && (
					<Slider
						size="sm"
						label="Angle"
						value={value.section.angle}
						minValue={-180}
						maxValue={180}
						onChange={(e) => {
							if (typeof e === 'number') {
								onChange({
									type: 'turn',
									angle: e,
								});
							}
						}}
					/>
				)}
				<div className="mb-2" />
				<p className="text-sm">Turn into</p>
				<ButtonGroup size="sm" variant="bordered">
					{value.section.type !== 'straight' && (
						<Button onPress={() => onChange({ type: 'straight', length: 48 })}>
							Straight
						</Button>
					)}
					{value.section.type !== 'drive' && (
						<Button onPress={() => onChange({ type: 'drive', length: 96 })}>
							Drive
						</Button>
					)}
					{(value.section.type !== 'turn' || value.section.angle < 0) && (
						<Button onPress={() => onChange({ type: 'turn', angle: 45 })}>
							Turn (L)
						</Button>
					)}
					{(value.section.type !== 'turn' || value.section.angle > 0) && (
						<Button onPress={() => onChange({ type: 'turn', angle: -45 })}>
							Turn (R)
						</Button>
					)}
				</ButtonGroup>
			</div>
		);
	}
};

export default Popover;
