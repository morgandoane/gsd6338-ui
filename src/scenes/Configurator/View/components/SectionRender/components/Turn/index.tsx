import { FC } from 'react';
import { SectionRenderProps } from '../..';
import { SectionTurn } from '@system/section';
import Arc from '../Arc';
import Pattern from '../Pattern';
import { Vector3 } from 'three';

export interface TurnProps
	extends Omit<SectionRenderProps, 'position' | 'rotation'> {
	section: SectionTurn;
}

const Turn: FC<TurnProps> = ({
	section,
	belt,
	focused,
	padding,
	height,
	onClick,
}) => {
	const wearStripOffest = 1;
	const minWearstrips = 3;

	const wearStripSpacingMin = {
		top: 7,
		bottom: 9,
	};

	const wearStripCount = {
		top: Math.max(
			Math.ceil(belt.width / wearStripSpacingMin.top),
			minWearstrips
		),
		bottom: Math.max(
			Math.ceil(belt.width / wearStripSpacingMin.bottom),
			minWearstrips
		),
	};

	const wearStripSpacing = {
		top: (belt.width - wearStripOffest * 2) / (wearStripCount.top - 1),
		bottom: (belt.width - wearStripOffest * 2) / (wearStripCount.bottom - 1),
	};

	const legOffset = (10 / 180) * Math.PI;
	const legSpacingMin = 40;

	const outerArcRadius =
		belt.radius +
		belt.width / 2 +
		padding +
		(0.1875 / 2) * (section.angle / 180);

	const outerArcLength = Math.PI * outerArcRadius * (section.angle / 180);

	const legCountOuter = Math.max(Math.ceil(outerArcLength / legSpacingMin), 1);

	return (
		<group onClick={onClick}>
			{/* Top Belt */}
			<group position={[0, height / 2 - belt.thickness, 0]}>
				<Arc
					direction={section.angle > 0 ? 'left' : 'right'}
					color={focused ? 'green' : 'blue'}
					opacity={0.9}
					centerRadius={belt.radius}
					width={belt.width}
					height={belt.thickness}
					angle={section.angle}
				/>
			</group>
			{/* Bottom Belt */}
			<group position={[0, -height / 2 + 3.5 - belt.thickness / 2, 0]}>
				<Arc
					direction={section.angle > 0 ? 'left' : 'right'}
					color={focused ? 'green' : 'blue'}
					opacity={0.9}
					centerRadius={belt.radius}
					width={belt.width}
					height={belt.thickness}
					angle={section.angle}
				/>
			</group>
			{/* Right Sidewall */}
			<group position={[-belt.width / 2 - padding - 0.1875 / 2, 0, 0]}>
				<Arc
					direction={section.angle > 0 ? 'left' : 'right'}
					color="grey"
					opacity={1}
					centerRadius={
						section.angle > 0
							? belt.radius + belt.width / 2 + padding + 0.1875 / 2
							: belt.radius - belt.width / 2 - padding - 0.1875 / 2
					}
					width={0.1875}
					height={height}
					angle={section.angle}
					metalness={0.5}
					roughness={0.5}
				/>
			</group>
			{/* Left Sidewall */}
			<group position={[belt.width / 2 + padding + 0.1875 / 2, 0, 0]}>
				<Arc
					direction={section.angle > 0 ? 'left' : 'right'}
					color="grey"
					opacity={1}
					centerRadius={
						section.angle < 0
							? belt.radius + belt.width / 2 + padding + 0.1875 / 2
							: belt.radius - belt.width / 2 - padding - 0.1875 / 2
					}
					width={0.1875}
					height={height}
					angle={section.angle}
					metalness={0.5}
					roughness={0.5}
				/>
			</group>
			{/* Top Wear Strips */}
			{Array.from({ length: wearStripCount.top }).map((_, index) => (
				<group
					key={`top-wear-strip-${index}`}
					position={[
						wearStripOffest + -belt.width / 2 + wearStripSpacing.top * index,
						height / 2 - belt.thickness - 0.75,
						0,
					]}
				>
					<Arc
						direction={section.angle > 0 ? 'left' : 'right'}
						color="white"
						opacity={1}
						centerRadius={
							section.angle < 0
								? belt.radius -
								  belt.width / 2 +
								  wearStripSpacing.top * index +
								  wearStripOffest
								: belt.radius +
								  belt.width / 2 -
								  wearStripSpacing.top * index -
								  wearStripOffest
						}
						width={1}
						height={1.5}
						angle={section.angle}
						roughness={1}
						metalness={0}
					/>
				</group>
			))}
			{/* Bottom Wear Strips */}
			{Array.from({ length: wearStripCount.bottom }).map((_, index) => (
				<group
					key={`top-wear-strip-${index}`}
					position={[
						wearStripOffest + -belt.width / 2 + wearStripSpacing.bottom * index,
						-height / 2 + 3.5 - belt.thickness - 0.75,
						0,
					]}
				>
					<Arc
						direction={section.angle > 0 ? 'left' : 'right'}
						color="white"
						opacity={1}
						centerRadius={
							section.angle < 0
								? belt.radius -
								  belt.width / 2 +
								  wearStripSpacing.bottom * index +
								  wearStripOffest
								: belt.radius +
								  belt.width / 2 -
								  wearStripSpacing.bottom * index -
								  wearStripOffest
						}
						width={1}
						height={1.5}
						angle={section.angle}
						roughness={1}
						metalness={0}
					/>
				</group>
			))}

			<group
				position={
					new Vector3(section.angle < 0 ? -belt.radius : belt.radius, -16, 0)
				}
			>
				<Pattern.Polar
					radius={belt.radius + belt.width / 2 + padding + 0.1875 / 2}
					count={legCountOuter}
					endAngle={
						section.angle > 0 ? -Math.PI - Math.PI / 180 - legOffset : legOffset
					}
					startAngle={
						section.angle > 0
							? -Math.PI - (section.angle * Math.PI) / 180 + legOffset
							: -(section.angle * Math.PI) / 180 - legOffset
					}
				>
					{(index, position, rotation) => (
						<mesh position={position} rotation={rotation} key={`leg-${index}`}>
							<boxGeometry args={[1.5, 40, 3]} />
							<meshStandardMaterial
								color="rgb(80,80,80)"
								metalness={0.5}
								roughness={0.5}
							/>
						</mesh>
					)}
				</Pattern.Polar>
			</group>
		</group>
	);
};

export default Turn;
