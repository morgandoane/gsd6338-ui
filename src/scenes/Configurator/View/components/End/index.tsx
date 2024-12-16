import { Belt } from '@system/belt';
import { FC } from 'react';
import { Euler, Vector3 } from 'three';
import Plate from './components/Plate';
import Shaft from './components/Shaft';
import BeltEnd from './components/BeltEnd';

export interface EndProps {
	position: Vector3;
	rotation: Euler;
	belt: Belt;
	padding: number;
	height: number;
}

const End: FC<EndProps> = ({ position, rotation, belt, padding, height }) => {
	return (
		<group position={position} rotation={rotation}>
			<Plate
				position={new Vector3(belt.width / 2 + padding + 0.1875 / 2, 0, 0)}
				height={height}
			/>
			<Plate
				position={new Vector3(-belt.width / 2 - padding - 0.1875 / 2, 0, 0)}
				height={height}
			/>
			<Shaft
				radius={2}
				width={belt.width + 2 * padding + 4}
				position={new Vector3(0, 0, height)}
				color="grey"
				metalness={0.5}
				roughness={0.5}
			/>
			<Shaft
				radius={2.5}
				width={1}
				position={new Vector3(-belt.width / 2 - padding - 0.625, 0, height)}
				color="white"
				metalness={0.5}
				roughness={0.5}
			/>
			<Shaft
				radius={2.5}
				width={1}
				position={new Vector3(belt.width / 2 + padding + 0.625, 0, height)}
				color="white"
				metalness={0.5}
				roughness={0.5}
			/>
			<BeltEnd
				belt={belt}
				position={new Vector3(0, 0, height)}
				radius={height / 2}
			/>
		</group>
	);
};

export default End;
