import { Belt } from '@system/belt';
import { FC, useMemo } from 'react';
import { BoxGeometry, ExtrudeGeometry, Path, Shape, Vector3 } from 'three';

export interface BeltEndProps {
	belt: Belt;
	position: Vector3;
	radius: number;
}

const BeltEnd: FC<BeltEndProps> = ({ belt, position, radius }) => {
	const shape = new Shape();

	shape.moveTo(radius, 0);
	shape.absarc(0, 0, radius, 0, Math.PI, false);
	shape.lineTo(-radius + belt.thickness, 0);
	shape.absarc(0, 0, radius - belt.thickness, Math.PI, 0, true);
	shape.lineTo(radius, 0);

	const extrusion = new ExtrudeGeometry(shape, {
		depth: belt.width,
		bevelEnabled: false,
	});

	extrusion.rotateY(Math.PI / 2);
	extrusion.rotateX(Math.PI / 2);
	extrusion.translate(-belt.width / 2, 0, 0);

	const top = new BoxGeometry(belt.width, radius * 2, belt.thickness);
	top.rotateX(Math.PI / 2);
	top.translate(0, radius - belt.thickness / 2, -radius);

	return (
		<group position={position}>
			<mesh>
				<primitive object={extrusion} />
				<meshStandardMaterial color="blue" opacity={0.8} transparent />
			</mesh>
			<mesh>
				<primitive object={top} />
				<meshStandardMaterial color="blue" opacity={0.8} transparent />
			</mesh>
		</group>
	);
};

export default BeltEnd;
