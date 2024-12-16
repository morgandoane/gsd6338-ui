import { Belt } from './belt';
import { Section } from './section';

export interface Conveyor {
	belt: Belt;
	sections: Section[];
	padding: number;
	height: number;
}
