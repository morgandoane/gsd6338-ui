import { FC } from 'react';
import { ExtrudeGeometry, Shape, Vector3 } from 'three';

export interface ArcProps {
	direction: 'left' | 'right';
	centerRadius: number;
	width: number;
	height: number;
	color: string;
	opacity: number;
	angle: number;
	metalness?: number;
	roughness?: number;
}

const Arc: FC<ArcProps> = ({
	direction,
	centerRadius,
	width,
	height,
	color,
	opacity,
	angle,
	metalness,
	roughness,
}) => {
	// a 3d extruded arc
	// center point is directly left or right of the current position, making the arc tangent to the current position
	// the radius is the distance from the center point to the current position
	// the arc is extruded upwards by height
	// it moves on x by cos(angle) * radius and on z by sin(angle) * radius

	const angleRad = (angle * Math.PI) / 180;

	const center = new Vector3(
		direction === 'left' ? centerRadius : -centerRadius,
		0,
		0
	);

	// concentric arc between p1 and p2 (around center)
	// straight line between p2 and p3
	// concentric arc between p3 and p4 (around center)
	// straight line between p4 and p1
	// Create the turn shape

	const turnShape = new Shape();
	turnShape.absarc(
		0, // X center of the arc
		0, // Z center of the arc\
		centerRadius - width / 2 + width,
		0, // Start angle
		angleRad, // End angle
		angle < 0 // Clockwise if angle < 0
	);
	turnShape.absarc(
		0, // X center of the arc
		0, // Z center of the arc
		centerRadius - width / 2, // Inner radius
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

	const geometry = new ExtrudeGeometry(turnShape, extrudeSettings);

	geometry.rotateX(direction === 'left' ? Math.PI / 2 : -Math.PI / 2);
	geometry.rotateZ(direction === 'left' ? Math.PI : 0);
	geometry.translate(
		direction === 'left' ? centerRadius : -centerRadius,
		-height / 2,
		0
	);
	return (
		<group>
			<mesh geometry={geometry}>
				<meshStandardMaterial
					color={color}
					opacity={opacity}
					transparent={true}
					metalness={metalness}
					roughness={roughness}
				/>
			</mesh>
		</group>
	);
};

export default Arc;
