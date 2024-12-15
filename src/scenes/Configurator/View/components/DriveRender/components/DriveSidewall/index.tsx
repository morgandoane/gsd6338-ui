import { FC } from 'react';
import { Vector3 } from 'three';

export interface DriveSidewallProps {
	thickness: number;
	height: number;
	length: number;
	position: Vector3;
}

const DriveSidewall: FC<DriveSidewallProps> = ({
	thickness,
	height,
	length,
	position,
}) => {
	// const boxGeometry = new BoxGeometry(thickness, height, length);
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
			{/* <lineSegments>
				<edgesGeometry args={[boxGeometry]} />
				<lineBasicMaterial color="rgba(0, 0, 0, 0.5)" linewidth={0.25} />
			</lineSegments> */}
		</mesh>
	);
};

export default DriveSidewall;
