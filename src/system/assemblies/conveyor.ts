import { Belt } from '@system/parts/belt';
import { Assembly } from './assembly';
import { Section } from './section';

export interface Conveyor extends Assembly {
	sections: Section[];
	belt: Belt;
	sidewall: {
		thickness: number;
	};
}
