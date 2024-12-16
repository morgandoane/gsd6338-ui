import { FC } from 'react';
import { CylinderGeometry, Vector3 } from 'three';

export interface ShaftProps {
	radius: number;
	width: number;
	position: Vector3;
	color: string;
	metalness?: number;
	roughness?: number;
}

const Shaft: FC<ShaftProps> = ({
	radius,
	width,
	position,
	color,
	metalness = 0.5,
	roughness = 0.5,
}) => {
	const cylinder = new CylinderGeometry(radius, radius, width, 32);
	cylinder.rotateZ(Math.PI / 2);
	return (
		<mesh position={position}>
			<primitive object={cylinder} />
			<meshStandardMaterial
				color={color}
				metalness={metalness}
				roughness={roughness}
			/>
		</mesh>
	);
};

export default Shaft;
