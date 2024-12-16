import { FC } from 'react';
import { ExtrudeGeometry, Shape, Vector3 } from 'three';
import generateDrivePoints from './points';

export interface DrivePlateProps {
	position: Vector3;
}

const DrivePlate: FC<DrivePlateProps> = ({ position }) => {
	const scale = 8; // Triangle scale
	const radius = scale / 2; // Radius for arcs

	const pts = generateDrivePoints(scale, radius);

	// Arc radius for rounded corners
	const arcRadius = radius;

	// Arc centers for rounded corners
	const arcCenters = {
		c1: { x: pts.r3.x, y: pts.l3.y }, // Top-left arc center
		c2: { x: pts.r2.x, y: pts.l2.y }, // Top-right arc center
		c3: { x: pts.b1.x, y: pts.b2.y }, // Bottom arc center
	};

	// Create the shape
	const shape = new Shape();

	// Start at bottom point (b1)
	shape.moveTo(pts.b1.x, pts.b1.y);

	// Line to bottom-left (b3)
	shape.lineTo(pts.b3.x, pts.b3.y);

	// Arc from b3 to l3 (Top-left curve)
	shape.absarc(
		arcCenters.c1.x,
		arcCenters.c1.y,
		arcRadius,
		Math.PI,
		Math.PI / 2,
		true
	);

	// Line to top-left corner (l2)
	shape.lineTo(pts.l2.x, pts.l2.y);

	// Arc from l2 to r3 (Top-right curve)
	shape.absarc(
		arcCenters.c2.x,
		arcCenters.c2.y,
		arcRadius,
		Math.PI / 2,
		0,
		true
	);

	// Line to bottom-right corner (b2)
	shape.lineTo(pts.b2.x, pts.b2.y);

	// Arc from b2 back to b1 (Bottom curve)
	shape.absarc(
		arcCenters.c3.x,
		arcCenters.c3.y,
		arcRadius,
		0,
		-Math.PI / 2,
		true
	);

	// Close the shape
	shape.lineTo(pts.b1.x, pts.b1.y);

	// Extrude the geometry
	const extrusion = new ExtrudeGeometry(shape, {
		depth: 0.25, // Extrusion thickness
		bevelEnabled: false,
	});

	return (
		<group position={position}>
			<mesh geometry={extrusion}>
				<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
			</mesh>
		</group>
	);
};

export default DrivePlate;
