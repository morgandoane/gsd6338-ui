import { FC } from 'react';
import { BoxGeometry, CylinderGeometry, Vector3 } from 'three';

export interface PlateProps {
	position: Vector3;
	height: number;
}

const Plate: FC<PlateProps> = ({ position, height }) => {
	const cylinder = new CylinderGeometry(height / 2, height / 2, 0.1875, 32);
	const box = new BoxGeometry(height, height, 0.1875);
	cylinder.rotateZ(Math.PI / 2);
	cylinder.translate(0, 0, height);
	box.rotateY(Math.PI / 2);
	box.translate(0, 0, height / 2);
	return (
		<group position={position}>
			<mesh>
				<primitive object={cylinder} />
				<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
			</mesh>
			<mesh>
				<primitive object={box} />
				<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
			</mesh>
		</group>
	);
};

export default Plate;
