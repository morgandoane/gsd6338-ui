import { FC } from 'react';
import { SectionRenderProps } from '../..';
import { SectionDrive } from '@system/section';
import Straight from '../Straight';
import DrivePlate from './components/DrivePlate';
import { Vector3 } from 'three';

export interface DriveProps
	extends Omit<SectionRenderProps, 'position' | 'rotation'> {
	section: SectionDrive;
}

const Drive: FC<DriveProps> = ({
	section,
	belt,
	focused,
	padding,
	height,
	onClick,
}) => {
	const dims = {
		height: 20,
		bottomHeight: 10,
		width: 16,
	};

	return (
		<group onClick={onClick}>
			<Straight
				section={{
					type: 'straight',
					length: belt.width * 3,
				}}
				belt={belt}
				padding={padding}
				focused={focused}
				height={height}
				onClick={onClick}
			/>
			<group>
				<mesh
					position={[
						belt.width / 2 + padding + 0.25 + 0.25,
						-(height / 2),
						belt.width * 1.5,
					]}
				>
					<boxGeometry args={[0.25, dims.width, dims.height]} />
					<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
				</mesh>
			</group>
			<group>
				<mesh
					position={[
						-belt.width / 2 - padding - 0.25 - 0.25,
						-(height / 2),
						belt.width * 1.5,
					]}
				>
					<boxGeometry args={[0.25, dims.width, dims.height]} />
					<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
				</mesh>
			</group>
			<group>
				<mesh
					position={[
						0,
						-(height / 2) - dims.bottomHeight / 2 + 2,
						belt.width * 1.5,
					]}
				>
					<boxGeometry
						args={[
							belt.width + padding * 2 + 0.5,
							dims.bottomHeight,
							dims.width,
						]}
					/>
					<meshStandardMaterial color="grey" metalness={0.5} roughness={0.5} />
				</mesh>
			</group>
		</group>
	);
};

export default Drive;
