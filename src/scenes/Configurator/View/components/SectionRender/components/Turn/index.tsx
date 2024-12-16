import { FC } from 'react';
import { SectionRenderProps } from '../..';
import { SectionTurn } from '@system/section';
import Arc from '../Arc';
import Pattern from '../Pattern';
import { Euler, Vector3 } from 'three';
import ArrayPolar from '../Pattern/Polar';
import { i } from 'framer-motion/client';

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

	const isLeft = section.angle > 0;
	const legOffsetDeg = 5;
	const legOffsetRad = (legOffsetDeg * Math.PI) / 180;

	const angleRad = (section.angle * Math.PI) / 180;

	const legCoverageTarget = 40;

	const outsideArcLength = (belt.radius + belt.width / 2 + padding) * angleRad;
	const insideArcLength = (belt.radius - belt.width / 2 - padding) * angleRad;

	const legCountOutside = Math.max(
		Math.ceil(Math.abs(outsideArcLength) / legCoverageTarget),
		1
	);
	const legCountInside = Math.max(
		Math.ceil(Math.abs(insideArcLength) / legCoverageTarget),
		1
	);

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
					metalness={0.8}
					roughness={1}
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
					metalness={0.8}
					roughness={1}
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
			{/* Outside legs */}
			<group
				position={new Vector3(isLeft ? belt.radius : -belt.radius, 0, 0)}
				rotation={new Euler(0, isLeft ? Math.PI + angleRad : angleRad, 0)}
			>
				<ArrayPolar
					radius={belt.radius + belt.width / 2 + padding + 0.1875 / 2 + 0.75}
					count={legCountOutside}
					startAngle={isLeft ? legOffsetRad : -legOffsetRad}
					endAngle={isLeft ? angleRad - legOffsetRad : angleRad + legOffsetRad}
				>
					{(index, position, rotation) => (
						<mesh
							key={`outside-leg-${index}`}
							position={position.clone().add(new Vector3(0, -17, 0))}
							rotation={rotation}
						>
							<boxGeometry args={[1.5, 38, 3]} />
							<meshStandardMaterial
								color="grey"
								metalness={0.5}
								roughness={0.5}
							/>
						</mesh>
					)}
				</ArrayPolar>
			</group>
			{/* Inside legs */}
			<group
				position={new Vector3(isLeft ? belt.radius : -belt.radius, 0, 0)}
				rotation={new Euler(0, isLeft ? Math.PI + angleRad : angleRad, 0)}
			>
				<ArrayPolar
					radius={belt.radius - belt.width / 2 - padding - 0.1875 / 2 - 0.75}
					count={legCountInside}
					startAngle={isLeft ? legOffsetRad : -legOffsetRad}
					endAngle={isLeft ? angleRad - legOffsetRad : angleRad + legOffsetRad}
				>
					{(index, position, rotation) => (
						<mesh
							key={`inside-leg-${index}`}
							position={position.clone().add(new Vector3(0, -17, 0))}
							rotation={rotation}
						>
							<boxGeometry args={[1.5, 38, 3]} />
							<meshStandardMaterial
								color="grey"
								metalness={0.5}
								roughness={0.5}
							/>
						</mesh>
					)}
				</ArrayPolar>
			</group>
		</group>
	);
};

export default Turn;
