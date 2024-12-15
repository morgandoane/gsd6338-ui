interface SectionBase {}

export interface SectionStraight extends SectionBase {
	type: 'straight';
	length: number;
}

export interface SectionDrive extends SectionBase {
	type: 'drive';
	length: number;
}

export interface SectionTurn extends SectionBase {
	type: 'turn';
	angle: number;
}

export type Section = SectionStraight | SectionDrive | SectionTurn;

export type SectionType = Section['type'];
