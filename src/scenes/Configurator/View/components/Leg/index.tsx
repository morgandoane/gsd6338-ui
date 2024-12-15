import { FC } from 'react';
import { Euler, Vector3 } from 'three';

export interface LegProps {
	position: Vector3;
	rotation: Euler;
	height: number;
}

const Leg: FC<LegProps> = ({ position, rotation, height }) => {
	// rounded rectangle
	return (
		<mesh position={position} rotation={rotation}>
			<boxGeometry args={[1.5, height, 3]} />
			<meshStandardMaterial color="grey" />
		</mesh>
	);
};

export default Leg;
