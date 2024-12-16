import { FC } from 'react';
import { Focus } from '..';
import { capFirst } from '@utils/capFirst';
import { Kbd, KbdKey, Slider } from '@nextui-org/react';

export interface PopoverProps {
	value: Focus | null;
	onChange: (value: Focus | null) => void;
}

const KeyRender: FC<{
	kbdKey?: KbdKey;
	character?: string;
	children: string;
	onClick: () => void;
}> = ({ kbdKey, children, character, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded-lg active:bg-gray-200"
		>
			<div className="min-w-8">
				<Kbd keys={kbdKey ? [kbdKey] : undefined}>{character}</Kbd>
			</div>
			<p>{children}</p>
		</div>
	);
};

const Popover: FC<PopoverProps> = ({ value, onChange }) => {
	if (!value) {
		return null;
	} else {
		return (
			<div
				className="absolute z-100 shadow-2xl p-4 border bg-white"
				style={{
					top: value.y,
					left: value.x,
				}}
			>
				<p className="text-cl font-semibold mb-3">
					{capFirst(value.section.type)} Section
				</p>
				{value.section.type === 'turn' && (
					<div className="mb-3">
						<p>Angle: {value.section.angle}°</p>
						<Slider
							size="sm"
							minValue={-180}
							maxValue={180}
							value={value.section.angle}
							onChange={(e) => {
								if (typeof e === 'number' && value.section.type === 'turn') {
									onChange({
										...value,
										section: { ...value.section, angle: e },
									});
								}
							}}
						/>
					</div>
				)}
				{value.section.type === 'straight' && (
					<div className="mb-3">
						<p>Length: {value.section.length}"</p>
						<Slider
							size="sm"
							minValue={18}
							maxValue={120}
							value={value.section.length}
							onChange={(e) => {
								if (
									typeof e === 'number' &&
									value.section.type === 'straight'
								) {
									onChange({
										...value,
										section: { ...value.section, length: e },
									});
								}
							}}
						/>
					</div>
				)}
				<div className="mb-2">
					<p className="mb-1">Turn Into</p>
					<div className="flex flex-col gap-2">
						<KeyRender
							kbdKey="up"
							onClick={() => {
								onChange({
									...value,
									section: { type: 'straight', length: 120 },
								});
							}}
						>
							straight section
						</KeyRender>
						<KeyRender
							onClick={() => {
								onChange({
									...value,
									section: { type: 'turn', angle: 45 },
								});
							}}
							kbdKey="left"
						>
							turn
						</KeyRender>
						<KeyRender
							onClick={() => {
								onChange({
									...value,
									section: { type: 'drive' },
								});
							}}
							character="d"
						>
							drive section
						</KeyRender>
						<KeyRender
							onClick={() => {
								onChange({
									...value,
									section: { type: 'corkscrew', angle: 90, twist: 45 },
								});
							}}
							character="c"
						>
							corkscrew section
						</KeyRender>
						<KeyRender
							onClick={() => {
								onChange({
									...value,
									section: { type: 'straight', length: 120 },
								});
							}}
							character="i"
						>
							Incline section
						</KeyRender>
					</div>
				</div>
			</div>
		);
	}
};

export default Popover;
