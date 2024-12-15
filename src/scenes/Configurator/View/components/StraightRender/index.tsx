import getProperties from '@system/assemblies/getProperties';
import { SectionStraight } from '@system/assemblies/section';
import { Belt } from '@system/parts/belt';
import { FC } from 'react';
import { Euler, Vector3 } from 'three';
import Sidewall from './components/Sidewall';
import { Conveyor } from '@system/assemblies/conveyor';
import BeltStraight from './components/BeltStraight';
import { ThreeEvent } from '@react-three/fiber';
import WearStrip from '../WearStrip';
import Leg from '../Leg';

export interface StraightRenderProps {
	sidewall: Conveyor['sidewall'];
	value: SectionStraight;
	onChange: (value: SectionStraight) => void;
	belt: Belt;
	position: Vector3;
	rotation: Euler;
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
	focused?: boolean;
}

const StraightRender: FC<StraightRenderProps> = ({
	value,
	// onChange,
	belt,
	position,
	rotation,
	sidewall,
	onClick,
	focused,
}) => {
	const {
		section: { height, width },
	} = getProperties(belt);

	const wearStripSpreads = {
		top: 9,
		bottom: 15,
	};

	const topWearStripCount = Math.max(
		Math.ceil(belt.width / wearStripSpreads.top),
		2
	);
	const bottomWearStripCount = Math.max(
		Math.ceil(belt.width / wearStripSpreads.bottom),
		2
	);

	// wearstrips begin and end offset from the edge of the belt
	const wearStripOffset = 2;

	const wearStripSpacing = {
		top: (belt.width - wearStripOffset * 2) / (topWearStripCount - 1),
		bottom: (belt.width - wearStripOffset * 2) / (bottomWearStripCount - 1),
	};

	const legOffset = 18;
	const legSpacing = 36;
	const legCount = Math.floor(value.length / legSpacing);
	const legSpacingExact = (value.length - legOffset * 2) / (legCount - 1);

	return (
		<group
			position={position.clone()}
			rotation={rotation.clone()}
			onClick={onClick}
		>
			{/* <mesh position={new Vector3(0, 0, value.length / 2)}>
				<boxGeometry args={[width, height, value.length]} />
				<meshBasicMaterial color="blue" opacity={0.5} transparent />
			</mesh> */}
			<Sidewall
				thickness={sidewall.thickness}
				height={height}
				length={value.length}
				position={
					new Vector3(width / 2 - sidewall.thickness / 2, 0, value.length / 2)
				}
			/>
			<Sidewall
				thickness={sidewall.thickness}
				height={height}
				length={value.length}
				position={
					new Vector3(-width / 2 + sidewall.thickness / 2, 0, value.length / 2)
				}
			/>
			<BeltStraight
				belt={belt}
				length={value.length}
				position={
					new Vector3(0, height / 2 - belt.thickness / 2, value.length / 2)
				}
				color={focused ? 'green' : 'blue'}
			/>
			<BeltStraight
				belt={belt}
				length={value.length}
				position={
					new Vector3(0, -height / 2 + belt.thickness / 2 + 3, value.length / 2)
				}
				color={focused ? 'green' : 'blue'}
			/>
			{/* Top wear strips */}
			{Array.from({ length: topWearStripCount }).map((_, i) => (
				<WearStrip
					key={i}
					height={1.5}
					width={1}
					length={value.length}
					position={
						new Vector3(
							-belt.width / 2 + wearStripOffset + i * wearStripSpacing.top,
							height / 2 - belt.thickness / 2 - 1.5 / 2,
							value.length / 2
						)
					}
				/>
			))}
			{/* Bottom wear strips */}
			{Array.from({ length: bottomWearStripCount }).map((_, i) => (
				<WearStrip
					key={i}
					height={1.5}
					width={1}
					length={value.length}
					position={
						new Vector3(
							-belt.width / 2 + wearStripOffset + i * wearStripSpacing.bottom,
							-height / 2 + belt.thickness / 2 + 2,
							value.length / 2
						)
					}
				/>
			))}
			{/* Legs Left */}
			{Array.from({ length: legCount }).map((_, i) => (
				<Leg
					key={i}
					height={36}
					position={
						new Vector3(-width / 2, -16, i * legSpacingExact + legOffset)
					}
					rotation={new Euler(0, 0, 0)}
				/>
			))}
			{/* Legs Right */}
			{Array.from({ length: legCount }).map((_, i) => (
				<Leg
					key={i}
					height={36}
					position={
						new Vector3(width / 2, -16, i * legSpacingExact + legOffset)
					}
					rotation={new Euler(0, 0, 0)}
				/>
			))}
		</group>
	);
};

export default StraightRender;
