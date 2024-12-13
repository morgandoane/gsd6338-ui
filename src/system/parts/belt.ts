import { Part } from './part';

export interface Belt extends Part {
	thickness: number;
	width: number;
	turnRadiusInside: number;
}
