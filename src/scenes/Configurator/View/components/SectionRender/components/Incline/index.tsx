import { FC } from 'react';
import { SectionRenderProps } from '../..';
import { SectionIncline } from '@system/section';

export interface InclineProps
	extends Omit<SectionRenderProps, 'position' | 'rotation'> {
	section: SectionIncline;
}

const Incline: FC<InclineProps> = ({
	section,
	belt,
	focused,
	padding,
	height,
	onClick,
}) => {
	return <group onClick={onClick}></group>;
};

export default Incline;
