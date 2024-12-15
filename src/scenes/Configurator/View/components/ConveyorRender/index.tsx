import { Conveyor } from '@system/assemblies/conveyor';
import getProperties from '@system/assemblies/getProperties';
import { FC } from 'react';
import { Euler, Vector3 } from 'three';
import StraightRender from '../StraightRender';
import TurnRender from '../TurnRender';
import { Focus } from '@scenes/Configurator';
import DriveRender from '../DriveRender';

export interface ConveyorRenderProps {
	value: Conveyor;
	onChange: (value: Conveyor) => void;
	setFocus: (value: Focus | null) => void;
	focus: Focus | null;
}

const ConveyorRender: FC<ConveyorRenderProps> = ({
	value,
	onChange,
	setFocus,
	focus,
}) => {
	const elements: JSX.Element[] = [];
	const {
		section: { radius },
	} = getProperties(value.belt);

	const startPosition = new Vector3(0, 0, 0);
	const startRotation = new Euler(0, 0, 0);

	const position = startPosition.clone();
	const rotation = startRotation.clone();

	value.sections.forEach((section, index) => {
		const key = `section-${index}`;
		switch (section.type) {
			case 'straight': {
				// Add a straight section
				elements.push(
					<StraightRender
						key={key}
						value={section}
						onChange={(newValue) => {
							onChange({
								...value,
								sections: value.sections.map((s, i) =>
									i === index ? newValue : s
								),
							});
						}}
						focused={focus !== null && index === focus.index}
						belt={value.belt}
						position={position.clone()}
						rotation={rotation.clone()}
						sidewall={value.sidewall}
						onClick={(e) => {
							setFocus({
								section,
								index,
								x: e.clientX,
								y: e.clientY,
							});
						}}
					/>
				);

				position.add(new Vector3(0, 0, section.length).applyEuler(rotation));
				break;
			}
			case 'drive': {
				// Add a straight section
				elements.push(
					<DriveRender
						key={key}
						value={section}
						onChange={(newValue) => {
							onChange({
								...value,
								sections: value.sections.map((s, i) =>
									i === index ? newValue : s
								),
							});
						}}
						focused={focus !== null && index === focus.index}
						belt={value.belt}
						position={position.clone()}
						rotation={rotation.clone()}
						sidewall={value.sidewall}
						onClick={(e) => {
							setFocus({
								section,
								index,
								x: e.clientX,
								y: e.clientY,
							});
						}}
					/>
				);

				position.add(new Vector3(0, 0, section.length).applyEuler(rotation));
				break;
			}
			case 'turn': {
				const angleRad = (section.angle * Math.PI) / 180; // Convert degrees to radians
				const circleRadiusInside = radius.inside;

				// Clone the current position for rotation
				const circleCenter = position.clone();
				circleCenter.add(
					new Vector3(
						section.angle > 0 ? circleRadiusInside : -circleRadiusInside,
						0,
						0
					).applyEuler(rotation)
				);

				// Add the extruded geometry as a mesh
				elements.push(
					<TurnRender
						key={key}
						value={section}
						onChange={(newValue) => {
							onChange({
								...value,
								sections: value.sections.map((s, i) =>
									i === index ? newValue : s
								),
							});
						}}
						belt={value.belt}
						position={position.clone()}
						rotation={rotation.clone()}
						sidewall={value.sidewall}
						focused={focus !== null && index === focus.index}
						onClick={(e) => {
							setFocus({
								section,
								index,
								x: e.clientX,
								y: e.clientY,
							});
						}}
					/>
				);

				// Rotate the current position around the circle center
				position.sub(circleCenter); // Translate position to origin of the circle
				position.applyAxisAngle(new Vector3(0, 1, 0), angleRad); // Rotate around Y-axis
				position.add(circleCenter); // Translate position back to the circle's center

				// Update the rotation to account for the turn
				rotation.y += angleRad;

				break;
			}
		}
	});

	return (
		<>
			<group position={startPosition.clone().add(new Vector3(0, 32, 0))}>
				{elements}
			</group>
		</>
	);
};

export default ConveyorRender;
