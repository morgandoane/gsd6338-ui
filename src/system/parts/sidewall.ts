import { Sheetmetal } from './sheetmetal';

interface SidewallBase extends Sheetmetal {}

export interface SidewallStraight extends SidewallBase {}

export interface SidewallDrive extends SidewallBase {}

export interface SidewallTurn extends SidewallBase {}
