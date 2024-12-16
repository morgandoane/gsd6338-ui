import { Kbd, KbdKey } from '@nextui-org/react';
import { Conveyor } from '@system/conveyor';
import { SectionTurn } from '@system/section';
import { FC, useEffect } from 'react';

export interface HotkeysProps {
	value: Conveyor;
	onChange: (value: Conveyor) => void;
}

const KeyRender: FC<{
	kbdKey?: KbdKey;
	character?: string;
	children: string;
}> = ({ kbdKey, children, character }) => {
	return (
		<div className="flex items-center gap-4 text-white">
			<div className="min-w-6">
				<Kbd
					className="min-w-4 flex items-center justify-center"
					keys={kbdKey ? [kbdKey] : undefined}
				>
					{character}
				</Kbd>
			</div>
			<p>{children}</p>
		</div>
	);
};

const Hotkeys: FC<HotkeysProps> = ({ value, onChange }) => {
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			const handlers: Record<string, () => void> = {
				ArrowUp: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'straight', length: 120 }],
					});
				},
				ArrowDown: () => {
					onChange({
						...value,
						sections: value.sections.slice(0, -1),
					});
				},
				ArrowLeft: () => {
					if (value.sections[value.sections.length - 1].type === 'turn') {
						const currentTurn = value.sections[
							value.sections.length - 1
						] as SectionTurn;
						onChange({
							...value,
							sections: [
								...value.sections.slice(0, -1),
								{ type: 'turn', angle: currentTurn.angle + 45 },
							],
						});
					} else {
						onChange({
							...value,
							sections: [...value.sections, { type: 'turn', angle: 45 }],
						});
					}
				},
				ArrowRight: () => {
					if (value.sections[value.sections.length - 1].type === 'turn') {
						const currentTurn = value.sections[
							value.sections.length - 1
						] as SectionTurn;
						onChange({
							...value,
							sections: [
								...value.sections.slice(0, -1),
								{ type: 'turn', angle: currentTurn.angle - 45 },
							],
						});
					} else {
						onChange({
							...value,
							sections: [...value.sections, { type: 'turn', angle: -45 }],
						});
					}
				},
				d: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'drive' }],
					});
				},
				D: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'drive' }],
					});
				},
				c: () => {
					onChange({
						...value,
						sections: [
							...value.sections,
							{ type: 'corkscrew', angle: -45, twist: 45 },
						],
					});
				},
				C: () => {
					onChange({
						...value,
						sections: [
							...value.sections,
							{ type: 'corkscrew', angle: -45, twist: 45 },
						],
					});
				},
				i: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'incline', angle: 45 }],
					});
				},
				I: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'incline', angle: 45 }],
					});
				},
				Delete: () => {
					onChange({
						...value,
						sections: [],
					});
				},
			};

			if (handlers[event.key]) {
				handlers[event.key]();
			}
		};

		window.addEventListener('keydown', listener);

		return () => {
			window.removeEventListener('keydown', listener);
		};
	}, [onChange, value]);

	return (
		<div className="absolute bottom-0 left-0 p-4 flex flex-col gap-2">
			<KeyRender kbdKey="up">Add straight section</KeyRender>
			<KeyRender kbdKey="down">Remove last section</KeyRender>
			<KeyRender kbdKey="left">Add left turn</KeyRender>
			<KeyRender kbdKey="right">Add right turn</KeyRender>
			<KeyRender character="d">Add drive section</KeyRender>
			{/* <KeyRender character="c">Add corkscrew section</KeyRender> */}
			{/* <KeyRender character="i">Add incline section</KeyRender> */}
			<KeyRender kbdKey="delete">Clear conveyor</KeyRender>
		</div>
	);
};

export default Hotkeys;
