import { FC } from 'react';
import { Vector3, BoxGeometry } from 'three';

export interface WearStripProps {
	height: number;
	width: number;
	length: number;
	position: Vector3;
}

const WearStrip: FC<WearStripProps> = ({ height, width, length, position }) => {
	const box = new BoxGeometry(width, height, length);

	return <mesh geometry={box} position={position} />;
};

export default WearStrip;
