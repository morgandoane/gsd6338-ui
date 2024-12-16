import { FC } from 'react';
import { SectionRenderProps } from '../..';
import { SectionStraight } from '@system/section';
import { BoxGeometry, Euler, Vector3 } from 'three';
import CrossBeam from '../CrossBeam';

export interface StraightProps
	extends Omit<SectionRenderProps, 'position' | 'rotation'> {
	section: SectionStraight;
}

const Straight: FC<StraightProps> = ({
	section,
	belt,
	focused,
	padding,
	height,
	onClick,
}) => {
	const box = new BoxGeometry(belt.width + 2 * padding, height, section.length);
	box.translate(0, 0, section.length / 2);

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

	const legSpacingMin = 34;
	const legOffset = 16;

	const minLegs = 1;

	const legCount = Math.max(Math.ceil(section.length / legSpacingMin), minLegs);
	const legSpacing = section.length / (legCount - 1);

	const crossdBeamSpacingMin = 18;
	const crossBeamOffset = 4.5;
	const crossBeamCount = Math.max(
		Math.ceil((section.length - crossBeamOffset * 2) / crossdBeamSpacingMin),
		2
	);

	const crossBeamSpacing =
		(section.length - crossBeamOffset * 2) / (crossBeamCount - 1);

	return (
		<group onClick={onClick}>
			{/* Sidewall Right */}
			<mesh
				position={[
					-belt.width / 2 - padding - 0.1875 / 2,
					0,
					section.length / 2,
				]}
			>
				<boxGeometry args={[0.1875, height, section.length]} />
				<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
			</mesh>
			{/* Sidewall Left */}
			<mesh
				position={[
					belt.width / 2 + padding + 0.1875 / 2,
					0,
					section.length / 2,
				]}
			>
				<boxGeometry args={[0.1875, height, section.length]} />
				<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
			</mesh>
			{/* Top Wear Strips */}
			{Array.from({ length: wearStripCount.top }).map((_, index) => (
				<mesh
					key={index}
					position={[
						wearStripOffest + -belt.width / 2 + wearStripSpacing.top * index,
						height / 2 - belt.thickness - 0.75,
						section.length / 2,
					]}
				>
					<boxGeometry args={[1, 1.5, section.length]} />
					<meshStandardMaterial color="white" />
				</mesh>
			))}
			{/* Bottom Wear Strips */}
			{Array.from({ length: wearStripCount.bottom }).map((_, index) => (
				<mesh
					key={index}
					position={[
						wearStripOffest + -belt.width / 2 + wearStripSpacing.bottom * index,
						-height / 2 + 3.5 - belt.thickness - 0.75,
						section.length / 2,
					]}
				>
					<boxGeometry args={[1, 1.5, section.length]} />
					<meshStandardMaterial color="white" />
				</mesh>
			))}
			{/* Top Belt */}
			<mesh position={[0, height / 2 - belt.thickness / 2, section.length / 2]}>
				<boxGeometry args={[belt.width, belt.thickness, section.length]} />
				<meshStandardMaterial
					color={focused ? 'green' : 'blue'}
					opacity={0.8}
					transparent
				/>
			</mesh>
			{/* Bottom Belt */}
			<mesh
				position={[
					0,
					-height / 2 + 3.5 - belt.thickness / 2,
					section.length / 2,
				]}
			>
				<boxGeometry args={[belt.width, belt.thickness, section.length]} />
				<meshStandardMaterial
					color={focused ? 'green' : 'blue'}
					opacity={0.8}
					transparent
				/>
			</mesh>
			{/* Right Legs */}
			{Array.from({ length: legCount - 1 }).map((_, index) => (
				<mesh
					key={index}
					position={[
						belt.width / 2 + padding + 1.5 / 2,
						-17,
						legOffset + legSpacing * index,
					]}
				>
					<boxGeometry args={[1.5, 38, 3]} />
					<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
				</mesh>
			))}
			{/* Left Legs */}
			{Array.from({ length: legCount - 1 }).map((_, index) => (
				<mesh
					key={index}
					position={[
						-belt.width / 2 - padding - 1.5 / 2,
						-17,
						legOffset + legSpacing * index,
					]}
				>
					<boxGeometry args={[1.5, 38, 3]} />
					<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
				</mesh>
			))}
			{/* Top Cross Beams */}
			{Array.from({ length: crossBeamCount }).map((_, index) => (
				<CrossBeam
					key={`top-cb-t-${index}`}
					position={
						new Vector3(
							0,
							height / 2 - belt.thickness - 1.5,

							crossBeamOffset + crossBeamSpacing * index
						)
					}
					rotation={new Euler(0, 0, 0)}
					width={belt.width + 2 * padding}
				/>
			))}
			{/* Bottom Cross Beams */}
			{Array.from({ length: crossBeamCount }).map((_, index) => (
				<CrossBeam
					key={`top-cb-b-${index}`}
					position={
						new Vector3(
							0,
							-height / 2 + 3.5 - belt.thickness - 1.5,
							crossBeamOffset + crossBeamSpacing * index
						)
					}
					rotation={new Euler(0, 0, 0)}
					width={belt.width + 2 * padding}
				/>
			))}
		</group>
	);
};

export default Straight;
