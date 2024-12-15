import { Belt } from '@system/parts/belt';
import { FC } from 'react';
import { TextureLoader, Vector3 } from 'three';
import beltAlphaTexture from '@assets/pattern.png';

const texture = new TextureLoader().load(beltAlphaTexture);

export interface BeltDriveStraightProps {
	belt: Belt;
	length: number;
	position: Vector3;
	color: string;
}

const BeltDriveStraight: FC<BeltDriveStraightProps> = ({
	belt,
	length,
	position,
	color,
}) => {
	// const boxGeometry = new BoxGeometry(belt.width, belt.thickness, length);
	return (
		<mesh position={position}>
			<boxGeometry args={[belt.width, belt.thickness, length]} />
			<meshStandardMaterial
				color={color}
				opacity={0.8}
				transparent
				alphaMap={texture}
			/>
			{/* <lineSegments>
				<edgesGeometry args={[boxGeometry]} />
				<lineBasicMaterial color={color} linewidth={0.25} />
			</lineSegments> */}
		</mesh>
	);
};

export default BeltDriveStraight;
