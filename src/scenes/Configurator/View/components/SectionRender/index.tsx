import { ThreeEvent } from '@react-three/fiber';
import { Belt } from '@system/belt';
import {
	Section,
	SectionTurn,
	SectionCorkscrew,
	SectionDrive,
	SectionIncline,
	SectionStraight,
	SectionType,
} from '@system/section';
import { FC, ReactElement } from 'react';
import { Euler, Vector3 } from 'three';
import Turn from './components/Turn';
import Corkscrew from './components/Corkscrew';
import Drive from './components/Drive';
import Incline from './components/Incline';
import Straight from './components/Straight';

export interface SectionRenderProps {
	position: Vector3;
	rotation: Euler;
	section: Section;
	belt: Belt;
	padding: number;
	focused: boolean;
	height: number;
	onClick: (e: ThreeEvent<MouseEvent>) => void;
}

const SectionRender: FC<SectionRenderProps> = ({
	position,
	rotation,
	section,
	belt,
	padding,
	focused,
	height,
	onClick,
}) => {
	const elements: Record<SectionType, ReactElement> = {
		turn: (
			<Turn
				section={section as SectionTurn}
				belt={belt}
				focused={focused}
				padding={padding}
				height={height}
				onClick={onClick}
			/>
		),
		corkscrew: (
			<Corkscrew
				section={section as SectionCorkscrew}
				belt={belt}
				focused={focused}
				padding={padding}
				height={height}
				onClick={onClick}
			/>
		),
		drive: (
			<Drive
				section={section as SectionDrive}
				belt={belt}
				focused={focused}
				padding={padding}
				height={height}
				onClick={onClick}
			/>
		),
		incline: (
			<Incline
				section={section as SectionIncline}
				belt={belt}
				focused={focused}
				padding={padding}
				height={height}
				onClick={onClick}
			/>
		),
		straight: (
			<Straight
				section={section as SectionStraight}
				belt={belt}
				focused={focused}
				padding={padding}
				height={height}
				onClick={onClick}
			/>
		),
	};
	return (
		<group position={position} rotation={rotation} onClick={onClick}>
			{/* <axesHelper args={[belt.radius]} /> */}
			{elements[section.type]}
		</group>
	);
};

export default SectionRender;
