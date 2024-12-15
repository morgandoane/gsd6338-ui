import { Belt } from '@system/parts/belt';
import { FC } from 'react';
import { Vector3 } from 'three';

// import pattern from '@assets/pattern.png';

// const texture = new TextureLoader().load(pattern);

export interface BeltStraightProps {
	belt: Belt;
	length: number;
	position: Vector3;
	color: string;
}

const BeltStraight: FC<BeltStraightProps> = ({
	belt,
	length,
	position,
	color,
}) => {
	return (
		<mesh position={position}>
			<boxGeometry args={[belt.width, belt.thickness, length]} />
			<meshStandardMaterial
				color={color}
				opacity={0.8}
				transparent
				// alphaMap={texture}
			/>
			{/* <lineSegments>
				<edgesGeometry args={[boxGeometry]} />
				<lineBasicMaterial color={color} linewidth={0.25} />
			</lineSegments> */}
		</mesh>
	);
};

export default BeltStraight;
