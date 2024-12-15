import getProperties from '@system/assemblies/getProperties';
import { Belt } from '@system/parts/belt';
import { FC } from 'react';
import { ExtrudeGeometry, Shape, Vector3 } from 'three';

export interface TurnBeltProps {
	angle: number;
	belt: Belt;
	position: Vector3;
	color: string;
}

const TurnBelt: FC<TurnBeltProps> = ({ belt, angle, position, color }) => {
	const {
		section: { width, radius },
	} = getProperties(belt);
	const angleRad = (angle * Math.PI) / 180; // Convert degrees to radians
	const circleRadiusInside = radius.inside;

	// Clone the current position for rotation
	const circleCenter = new Vector3(0, 0, 0);
	circleCenter.add(
		new Vector3(angle > 0 ? circleRadiusInside : -circleRadiusInside, 0, 0)
	);

	// Create the turn shape
	const turnShape = new Shape();
	turnShape.absarc(
		0, // X center of the arc
		0, // Z center of the arc\
		circleRadiusInside - width / 2 + 1 + belt.width,
		0, // Start angle
		angleRad, // End angle
		angle < 0 // Clockwise if angle < 0
	);
	turnShape.absarc(
		0, // X center of the arc
		0, // Z center of the arc
		circleRadiusInside - width / 2 + 1, // Inner radius
		angleRad, // Start angle
		0, // End angle
		angle >= 0 // Clockwise if angle >= 0
	);
	turnShape.closePath();

	// Extrude settings
	const extrudeSettings = {
		steps: 1,
		depth: belt.thickness,
		bevelEnabled: false,
	};

	// Create extruded geometry
	const turnGeometry = new ExtrudeGeometry(turnShape, extrudeSettings);

	if (angle > 0) {
		turnGeometry.rotateX(angleRad > 0 ? Math.PI / 2 : -Math.PI / 2);
		turnGeometry.rotateZ(Math.PI);
	} else {
		turnGeometry.rotateX(angleRad > 0 ? Math.PI / 2 : -Math.PI / 2);
	}

	return (
		<mesh geometry={turnGeometry} position={position}>
			<meshStandardMaterial color={color} opacity={0.8} transparent />
			{/* <lineSegments>
				<edgesGeometry args={[turnGeometry]} attach="geometry" />
				<lineBasicMaterial color={color} linewidth={0.25} />
			</lineSegments> */}
		</mesh>
	);
};

export default TurnBelt;
