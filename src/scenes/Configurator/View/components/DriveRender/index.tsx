import { ThreeEvent } from '@react-three/fiber';
import { Conveyor } from '@system/assemblies/conveyor';
import getProperties from '@system/assemblies/getProperties';
import { SectionDrive } from '@system/assemblies/section';
import { Belt } from '@system/parts/belt';
import { FC } from 'react';
import { Euler, Vector3 } from 'three';
import DriveSidewall from './components/DriveSidewall';
import BeltDriveStraight from './components/BeltDrive';

export interface DriveRenderProps {
	value: SectionDrive;
	onChange: (value: SectionDrive) => void;
	belt: Belt;
	position: Vector3;
	rotation: Euler;
	sidewall: Conveyor['sidewall'];
	onClick?: (e: ThreeEvent<MouseEvent>) => void;
	focused?: boolean;
}

const DriveRender: FC<DriveRenderProps> = ({
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
	return (
		<group
			position={position.clone()}
			rotation={rotation.clone()}
			onClick={onClick}
		>
			<axesHelper args={[10]} />
			{/* <mesh position={new Vector3(0, 0, value.length / 2)}>
      <boxGeometry args={[width, height, value.length]} />
      <meshBasicMaterial color="blue" opacity={0.5} transparent />
    </mesh> */}
			<DriveSidewall
				thickness={sidewall.thickness}
				height={height}
				length={value.length}
				position={
					new Vector3(width / 2 - sidewall.thickness / 2, 0, value.length / 2)
				}
			/>
			<DriveSidewall
				thickness={sidewall.thickness}
				height={height}
				length={value.length}
				position={
					new Vector3(-width / 2 + sidewall.thickness / 2, 0, value.length / 2)
				}
			/>
			<BeltDriveStraight
				belt={belt}
				length={value.length}
				position={
					new Vector3(0, height / 2 - belt.thickness / 2, value.length / 2)
				}
				color={focused ? 'green' : 'blue'}
			/>
			<BeltDriveStraight
				belt={belt}
				length={value.length}
				position={
					new Vector3(0, -height / 2 + belt.thickness / 2 + 3, value.length / 2)
				}
				color={focused ? 'green' : 'blue'}
			/>
		</group>
	);
};

export default DriveRender;
