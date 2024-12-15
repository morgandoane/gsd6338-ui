import { FC } from 'react';
import { BoxGeometry, Vector3 } from 'three';

export interface SidewallProps {
	thickness: number;
	height: number;
	length: number;
	position: Vector3;
}

const Sidewall: FC<SidewallProps> = ({
	thickness,
	height,
	length,
	position,
}) => {
	return (
		<mesh position={position}>
			<boxGeometry args={[thickness, height, length]} />
			<meshStandardMaterial
				color="grey"
				opacity={0.9}
				transparent
				metalness={0.8}
				roughness={0.4}
			/>
		</mesh>
	);
};

export default Sidewall;
