interface SectionBase {}

export interface SectionTurn extends SectionBase {
	type: 'turn';
	/**
	 * Angle in degrees
	 * Positive is clockwise, negative is counterclockwise
	 */
	angle: number;
}

export interface SectionCorkscrew extends SectionBase {
	type: 'corkscrew';
	/**
	 * Angle in degrees
	 * Positive is clockwise, negative is counterclockwise
	 */
	angle: number;
	/**
	 * The radius of the twist
	 * Positive is right, negative is left
	 */
	twist: number;
}

export interface SectionStraight extends SectionBase {
	type: 'straight';
	length: number;
}

export interface SectionDrive extends SectionBase {
	type: 'drive';
}

export interface SectionIncline extends SectionBase {
	type: 'incline';
	/**
	 * Angle in degrees
	 * Positive is up, negative is down
	 */
	angle: number;
}

export type Section =
	| SectionTurn
	| SectionStraight
	| SectionDrive
	| SectionIncline
	| SectionCorkscrew;

export type SectionType = Section['type'];
