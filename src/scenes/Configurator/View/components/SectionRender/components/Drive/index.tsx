import { FC } from 'react';
import { SectionRenderProps } from '../..';
import { SectionDrive } from '@system/section';

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
	return <group onClick={onClick}></group>;
};

export default Drive;
