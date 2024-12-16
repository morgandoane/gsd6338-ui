import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Focus } from '..';
import { Conveyor } from '@system/conveyor';
import Hotkeys from './components/Hotkeys';
import { Euler, Vector3 } from 'three';
import sectionDisplacement from '@system/section.displacement';
import SectionRender from './components/SectionRender';
import End from './components/End';

export interface ViewProps {
	value: Conveyor;
	focus: Focus | null;
	onChange: (value: Conveyor) => void;
	setFocus: (value: Focus | null) => void;
}

const View: FC<ViewProps> = ({ value, focus, onChange, setFocus }) => {
	const originPosition = new Vector3(0, 36, 0);
	const originRotation = new Euler(0, 0, 0);

	const startPosition = originPosition.clone();
	const startRotation = originRotation.clone();

	const boundsMin = new Vector3(-100, 0, -100);
	const boundsMax = new Vector3(100, 0, 100);

	const elements: JSX.Element[] = [
		<axesHelper key="axes" args={[100]} position={[0, 0, 0]} />,
	];

	value.sections.forEach((section, index) => {
		const position = startPosition.clone();
		const rotation = startRotation.clone();

		const { endPosition, endRotation } = sectionDisplacement(
			section,
			value,
			position,
			rotation
		);

		startPosition.copy(endPosition);
		startRotation.copy(endRotation);

		// adjust bounds, if needed
		if (endPosition.x < boundsMin.x + 100) boundsMin.x = endPosition.x - 100;
		if (endPosition.z < boundsMin.z + 100) boundsMin.z = endPosition.z - 100;
		if (endPosition.x > boundsMax.x - 100) boundsMax.x = endPosition.x + 100;
		if (endPosition.z > boundsMax.z - 100) boundsMax.z = endPosition.z + 100;

		elements.push(
			<SectionRender
				key={`section-${index}`}
				position={position}
				rotation={rotation}
				section={section}
				belt={value.belt}
				focused={focus !== null && index === focus.index}
				onClick={(e) =>
					setFocus({ index, section, x: e.clientX, y: e.clientY })
				}
				padding={value.padding}
				height={value.height}
			/>
		);
	});

	return (
		<>
			<Canvas
				orthographic
				shadows
				camera={{
					zoom: 0.8, // Adjust zoom level for desired scale
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
				{/* ground plane based on bounds */}
				<mesh
					receiveShadow
					rotation-x={-Math.PI / 2}
					position={[
						(boundsMin.x + boundsMax.x) / 2,
						0,
						(boundsMin.z + boundsMax.z) / 2,
					]}
				>
					<planeGeometry
						args={[boundsMax.x - boundsMin.x, boundsMax.z - boundsMin.z]}
					/>
					<meshStandardMaterial color="grey" />
				</mesh>
				<group>
					<End
						position={originPosition}
						rotation={originRotation.clone().set(0, Math.PI, 0)}
						belt={value.belt}
						padding={value.padding}
						height={value.height}
					/>
					{elements}
					<End
						position={startPosition}
						rotation={startRotation}
						belt={value.belt}
						padding={value.padding}
						height={value.height}
					/>
				</group>
				<OrbitControls />
			</Canvas>
			<Hotkeys value={value} onChange={onChange} />
		</>
	);
};

export default View;
