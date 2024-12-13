import { Line } from '@react-three/drei';
import { Conveyor } from '@system/assemblies/conveyor';
import getProperties from '@system/assemblies/getProperties';
import { FC } from 'react';
import { Euler, Shape, Vector3, ExtrudeGeometry, LineSegments } from 'three';

export interface ConveyorRenderProps {
	value: Conveyor;
	onChange: (value: Conveyor) => void;
}

const ConveyorRender: FC<ConveyorRenderProps> = ({ value, onChange }) => {
	const elements: JSX.Element[] = [];
	const {
		section: { width, radius, height },
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
					<group
						key={key}
						position={position.clone()}
						rotation={rotation.clone()}
					>
						<axesHelper args={[10]} />
						<mesh position={new Vector3(0, 0, section.length / 2)}>
							<boxGeometry args={[width, height, section.length]} />
							<meshBasicMaterial color="blue" opacity={0.5} transparent />
						</mesh>
					</group>
				);

				position.add(new Vector3(0, 0, section.length).applyEuler(rotation));
				break;
			}
			case 'turn': {
				const angleRad = (section.angle * Math.PI) / 180; // Convert degrees to radians
				const circleRadiusInside = radius.inside;
				const circleRadiusOutside = circleRadiusInside + width;

				// Clone the current position for rotation
				const circleCenter = position.clone();
				circleCenter.add(
					new Vector3(
						section.angle > 0 ? circleRadiusInside : -circleRadiusInside,
						0,
						0
					).applyEuler(rotation)
				);

				// Push a helper at the circle center for debugging
				elements.push(
					<group key={`${key}-circle-center`}>
						<axesHelper args={[10]} position={circleCenter.clone()} />
					</group>
				);

				// Create the turn shape
				const turnShape = new Shape();
				turnShape.absarc(
					0, // X center of the arc
					0, // Z center of the arc
					circleRadiusOutside - width / 2, // Outer radius
					0, // Start angle
					angleRad, // End angle
					section.angle < 0 // Clockwise if angle < 0
				);
				turnShape.absarc(
					0, // X center of the arc
					0, // Z center of the arc
					circleRadiusInside - width / 2, // Inner radius
					angleRad, // Start angle
					0, // End angle
					section.angle >= 0 // Clockwise if angle >= 0
				);
				turnShape.closePath();

				// Extrude settings
				const extrudeSettings = {
					steps: 1,
					depth: height,
					bevelEnabled: false,
				};

				// Create extruded geometry
				const turnGeometry = new ExtrudeGeometry(turnShape, extrudeSettings);

				if (section.angle > 0) {
					turnGeometry.rotateX(angleRad > 0 ? Math.PI / 2 : -Math.PI / 2);
					turnGeometry.rotateZ(Math.PI);
				} else {
					turnGeometry.rotateX(angleRad > 0 ? Math.PI / 2 : -Math.PI / 2);
				}

				// Add the extruded geometry as a mesh
				elements.push(
					<mesh
						key={key}
						geometry={turnGeometry}
						position={circleCenter.clone().add(new Vector3(0, -height / 2, 0))}
						rotation={[0, rotation.y, 0]}
					>
						<meshBasicMaterial color="green" opacity={0.5} transparent />
					</mesh>
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

	return <group>{elements}</group>;
};

export default ConveyorRender;
