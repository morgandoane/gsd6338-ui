import { FC } from 'react';
import { Vector3, Euler, BoxGeometry } from 'three';

export interface CrossBeamProps {
	position: Vector3;
	rotation: Euler;
	width: number;
}

const CrossBeam: FC<CrossBeamProps> = ({ position, rotation, width }) => {
	const topSegment = new BoxGeometry(width, 1.5, 0.1875);
	const bottomSegment = new BoxGeometry(width, 1, 0.1875);
	bottomSegment.rotateX((3 * Math.PI) / 4);
	bottomSegment.translate(0, -1.03, 0.325);
	return (
		<group position={position} rotation={rotation}>
			<mesh geometry={topSegment}>
				<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
			</mesh>
			<mesh geometry={bottomSegment}>
				<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
			</mesh>
		</group>
	);
};

export default CrossBeam;
