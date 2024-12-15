import { FC, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Conveyor } from '@system/assemblies/conveyor';
import ConveyorRender from './components/ConveyorRender';
import { Focus } from '..';

export interface ViewProps {
	value: Conveyor;
	focus: Focus | null;
	onChange: (value: Conveyor) => void;
	setFocus: (value: Focus | null) => void;
}

const View: FC<ViewProps> = ({ value, focus, onChange, setFocus }) => {
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
				d: () => {
					onChange({
						...value,
						sections: [...value.sections, { type: 'drive', length: 120 }],
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
		<>
			<Canvas
				orthographic
				shadows
				camera={{
					zoom: 4, // Adjust zoom level for desired scale
					position: [100, 100, 100], // Camera position
					near: -1000, // Near clipping plane
					far: 1000, // Far clipping plane
				}}
				onPointerMissed={() => setFocus(null)}
			>
				<ambientLight intensity={0.5} />
				<directionalLight
					position={[500, 1000, 500]}
					intensity={5}
					castShadow
					shadow-mapSize-width={1024}
					shadow-mapSize-height={1024}
				/>
				<mesh
					rotation={[-Math.PI / 2, 0, 0]} // Rotate to make the plane flat
					position={[0, 0, 0]} // Position it below the objects
					receiveShadow // Enable shadow reception
				>
					<planeGeometry args={[1000, 1000]} /> {/* Adjust size as needed */}
					<meshStandardMaterial color="#888" roughness={1} />
				</mesh>
				<OrbitControls />
				<ConveyorRender
					value={value}
					onChange={onChange}
					setFocus={setFocus}
					focus={focus}
				/>
			</Canvas>
		</>
	);
};

export default View;
