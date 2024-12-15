import getProperties from '@system/assemblies/getProperties';
import { SectionTurn } from '@system/assemblies/section';
import { Belt } from '@system/parts/belt';
import { FC } from 'react';
import { Euler, Vector3 } from 'three';
import TurnSidewall from './components/TurnSidewall';
import { Conveyor } from '@system/assemblies/conveyor';
import TurnBelt from './components/TurnBelt';
import { ThreeEvent } from '@react-three/fiber';
import WearStripTurn from './components/WearStripTurn';
import Leg from '../Leg';
import ArrayPolar from '../ArrayPolar';

export interface TurnRenderProps {
	value: SectionTurn;
	onChange: (value: SectionTurn) => void;
	belt: Belt;
	position: Vector3;
	rotation: Euler;
	sidewall: Conveyor['sidewall'];
	focused: boolean;
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

const TurnRender: FC<TurnRenderProps> = ({
	value,
	// onChange,
	belt,
	position,
	rotation,
	sidewall,
	focused,
	onClick,
}) => {
	const {
		section: { height, radius },
	} = getProperties(belt);
	const circleRadiusInside = radius.inside;

	// Clone the current position for rotation
	const circleCenter = position.clone();
	circleCenter.add(
		new Vector3(
			value.angle > 0 ? circleRadiusInside : -circleRadiusInside,
			0,
			0
		).applyEuler(rotation)
	);

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

	const legSpacing = 36;

	const outerArcLength =
		(Math.abs(value.angle) * Math.PI * radius.outside) / 180;
	const innerArcLength =
		(Math.abs(value.angle) * Math.PI * radius.inside) / 180;

	const outerLegCount = Math.floor(outerArcLength / legSpacing);
	const innerLegCount = Math.floor(innerArcLength / legSpacing);

	const legOffset = Math.PI / 25;

	return (
		<group
			onClick={onClick}
			position={circleCenter.clone().add(new Vector3(0, -height / 2, 0))}
			rotation={[0, rotation.y, 0]}
		>
			<TurnSidewall
				belt={belt}
				mode="inner"
				angle={value.angle}
				sidewall={sidewall}
			/>

			<TurnSidewall
				belt={belt}
				mode="outer"
				angle={value.angle}
				sidewall={sidewall}
			/>
			<TurnBelt
				belt={belt}
				angle={value.angle}
				position={new Vector3(0, 3, 0)}
				color={focused ? 'green' : 'blue'}
			/>
			<TurnBelt
				belt={belt}
				angle={value.angle}
				position={new Vector3(0, height - belt.thickness, 0)}
				color={focused ? 'green' : 'blue'}
			/>
			{
				// Top wearstrips
				new Array(topWearStripCount).fill(0).map((_, i) => (
					<WearStripTurn
						key={i}
						belt={belt}
						angle={value.angle}
						y={height - belt.thickness / 2 - 1.5}
						offset={wearStripOffset + i * wearStripSpacing.top + 0.5}
					/>
				))
			}
			{/* Bottom wearstrips */}
			{new Array(bottomWearStripCount).fill(0).map((_, i) => (
				<WearStripTurn
					key={i}
					belt={belt}
					angle={value.angle}
					y={1.5}
					offset={wearStripOffset + i * wearStripSpacing.bottom + 0.5}
				/>
			))}

			{/* Outer legs */}
			<ArrayPolar
				radius={circleRadiusInside + belt.width / 2 + 1.5}
				count={outerLegCount}
				endAngle={
					value.angle > 0 ? -Math.PI - Math.PI / 180 - legOffset : legOffset
				}
				startAngle={
					value.angle > 0
						? -Math.PI - (value.angle * Math.PI) / 180 + legOffset
						: -(value.angle * Math.PI) / 180 - legOffset
				}
			>
				{(index, position, rotation) => (
					<Leg
						key={index}
						position={new Vector3(position.x, position.y - 12, position.z)}
						rotation={
							new Euler(rotation.x, rotation.y + Math.PI, rotation.z, 'XYZ')
						}
						height={36}
					/>
				)}
			</ArrayPolar>
			{/* Inside Legs */}
			<ArrayPolar
				radius={circleRadiusInside - belt.width / 2 - 1.5}
				count={innerLegCount}
				endAngle={
					value.angle > 0 ? -Math.PI - Math.PI / 180 - legOffset : legOffset
				}
				startAngle={
					value.angle > 0
						? -Math.PI - (value.angle * Math.PI) / 180 + legOffset
						: -(value.angle * Math.PI) / 180 - legOffset
				}
			>
				{(index, position, rotation) => (
					<Leg
						key={index}
						position={new Vector3(position.x, position.y - 12, position.z)}
						rotation={
							new Euler(rotation.x, rotation.y + Math.PI, rotation.z, 'XYZ')
						}
						height={36}
					/>
				)}
			</ArrayPolar>
		</group>
	);
};

export default TurnRender;
