import { Conveyor } from '@system/assemblies/conveyor';
import getProperties from '@system/assemblies/getProperties';
import { Belt } from '@system/parts/belt';
import { FC } from 'react';
import { ExtrudeGeometry, Shape, Vector3 } from 'three';

export interface TurnSidewallProps {
	angle: number;
	belt: Belt;
	mode: 'inner' | 'outer';
	sidewall: Conveyor['sidewall'];
}

const TurnSidewall: FC<TurnSidewallProps> = ({
	belt,
	mode,
	angle,
	sidewall,
}) => {
	const {
		section: { width, height, radius },
	} = getProperties(belt);
	const angleRad = (angle * Math.PI) / 180; // Convert degrees to radians
	const circleRadiusInside = radius.inside;
	const circleRadiusOutside = circleRadiusInside + width;

	// Clone the current position for rotation
	const circleCenter = new Vector3(0, 0, 0);
	circleCenter.add(
		new Vector3(angle > 0 ? circleRadiusInside : -circleRadiusInside, 0, 0)
	);

	// Create the turn shape
	const turnShape = new Shape();
	turnShape.absarc(
		0, // X center of the arc
		0, // Z center of the arc
		mode === 'outer'
			? circleRadiusOutside - width / 2 - sidewall.thickness
			: circleRadiusInside - width / 2 + sidewall.thickness, // Outer radius
		0, // Start angle
		angleRad, // End angle
		angle < 0 // Clockwise if angle < 0
	);
	turnShape.absarc(
		0, // X center of the arc
		0, // Z center of the arc
		mode === 'outer'
			? circleRadiusOutside - width / 2
			: circleRadiusInside - width / 2, // Inner radius
		angleRad, // Start angle
		0, // End angle
		angle >= 0 // Clockwise if angle >= 0
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

	if (angle > 0) {
		turnGeometry.rotateX(angleRad > 0 ? Math.PI / 2 : -Math.PI / 2);
		turnGeometry.rotateZ(Math.PI);
	} else {
		turnGeometry.rotateX(angleRad > 0 ? Math.PI / 2 : -Math.PI / 2);
	}

	return (
		<mesh
			geometry={turnGeometry}
			position={circleCenter
				.clone()
				.add(new Vector3((angle < 1 ? 1 : -1) * (width - 1), 0, 0))}
		>
			<meshStandardMaterial
				color="grey"
				opacity={0.9}
				transparent
				metalness={0.9}
				roughness={0.4}
			/>
			{/* <lineSegments>
				<edgesGeometry args={[turnGeometry]} attach="geometry" />
				<lineBasicMaterial color="rgba(0, 0, 0, 0.5)" linewidth={0.25} />
			</lineSegments> */}
		</mesh>
	);
};

export default TurnSidewall;
