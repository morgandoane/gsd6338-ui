import { FC, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Conveyor } from '@system/assemblies/conveyor';
import ConveyorRender from './components/ConveyorRender';
import { JSONTree } from 'react-json-tree';

export interface ViewProps {
	value: Conveyor;
	onChange: (value: Conveyor) => void;
}

const View: FC<ViewProps> = ({ value, onChange }) => {
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			const handlers: Record<string, () => void> = {
				ArrowUp: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'straight', length: 96 }],
					});
				},
				ArrowDown: () => {
					onChange({
						...value,
						sections: value.sections.slice(0, -1),
					});
				},
				ArrowLeft: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'turn', angle: 45 }],
					});
				},
				ArrowRight: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'turn', angle: -45 }],
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
		<>
			<Canvas
				orthographic
				camera={{
					zoom: 4, // Adjust zoom level for desired scale
					position: [100, 100, 100], // Camera position
					near: -500, // Near clipping plane
					far: 500, // Far clipping plane
				}}
			>
				<ambientLight />
				<pointLight position={[100, 100, 100]} />
				<OrbitControls />
				<ConveyorRender value={value} onChange={onChange} />
				{/* Add AxesHelper for origin visualization */}
			</Canvas>
			<JSONTree data={value} hideRoot />
		</>
	);
};

export default View;
