import * as THREE from 'three';
import React from 'react';

interface ArrayPolarProps {
	radius: number;
	count: number;
	startAngle?: number;
	endAngle?: number;
	children: (
		index: number,
		position: THREE.Vector3,
		rotation: THREE.Euler
	) => React.ReactNode;
}

const ArrayPolar: React.FC<ArrayPolarProps> = ({
	radius,
	count,
	children,
	startAngle = 0,
	endAngle = Math.PI * 2,
}) => {
	// Calculate the angle increment based on the range and count
	const angleIncrement = (endAngle - startAngle) / (count - 1);

	const items = Array.from({ length: count }, (_, index) => {
		const angle = startAngle + angleIncrement * index;
		const position = new THREE.Vector3(
			radius * Math.cos(angle),
			0,
			radius * Math.sin(angle)
		);
		const rotation = new THREE.Euler(0, -angle, 0);

		return children(index, position, rotation);
	});

	return <>{items}</>;
};

export default ArrayPolar;
