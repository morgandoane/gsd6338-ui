import { FC } from 'react';
import { SectionRenderProps } from '../..';
import { SectionCorkscrew } from '@system/section';

export interface CorkscrewProps
	extends Omit<SectionRenderProps, 'position' | 'rotation'> {
	section: SectionCorkscrew;
}

const Corkscrew: FC<CorkscrewProps> = ({
	section,
	belt,
	focused,
	padding,
	height,
	onClick,
}) => {
	return <group onClick={onClick}></group>;
};

export default Corkscrew;
