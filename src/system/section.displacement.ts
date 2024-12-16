import { Euler, Vector3 } from 'three';
import { Conveyor } from './conveyor';
import { Section } from './section';

const sectionDisplacement = (
	section: Section,
	conveyor: Conveyor,
	lastPosition: Vector3,
	lastRotation: Euler
): {
	endPosition: Vector3;
	endRotation: Euler;
} => {
	const endPosition = lastPosition.clone();
	const endRotation = lastRotation.clone();

	switch (section.type) {
		case 'corkscrew': {
			const invert = section.angle < 0 ? -1 : 1;
			const angleRad = (Math.PI / 180) * section.angle;
			const twistRad = (Math.PI / 180) * section.twist;

			// move it to center of the turn
			endPosition.add(
				new Vector3(conveyor.belt.radius * invert, 0, 0).applyEuler(
					lastRotation
				)
			);
			// now move it by x (cos) and z (sin), according to the angle and radius
			endPosition.add(
				new Vector3(
					-invert * conveyor.belt.radius * Math.cos(angleRad),
					0,
					conveyor.belt.radius * Math.sin(angleRad) * invert
				).applyEuler(lastRotation)
			);

			endRotation.y += angleRad;
			endRotation.z += twistRad;
			return { endPosition, endRotation };
		}
		case 'drive': {
			const driveLength = conveyor.belt.width * 3;
			endPosition.add(new Vector3(0, 0, driveLength).applyEuler(lastRotation));
			return { endPosition, endRotation };
		}
		case 'incline': {
			const segmentLength = conveyor.belt.width * 2;
			endPosition.add(
				new Vector3(0, 0, segmentLength).applyEuler(lastRotation)
			);
			endRotation.x -= (Math.PI / 180) * section.angle;
			endPosition.add(new Vector3(0, 0, segmentLength).applyEuler(endRotation));
			return { endPosition, endRotation };
		}
		case 'straight': {
			endPosition.add(
				new Vector3(0, 0, section.length).applyEuler(lastRotation)
			);
			return { endPosition, endRotation };
		}
		case 'turn': {
			const invert = section.angle < 0 ? -1 : 1;
			const angleRad = (Math.PI / 180) * section.angle;

			// move it to center of the turn
			endPosition.add(
				new Vector3(conveyor.belt.radius * invert, 0, 0).applyEuler(
					lastRotation
				)
			);
			// now move it by x (cos) and z (sin), according to the angle and radius
			endPosition.add(
				new Vector3(
					-invert * conveyor.belt.radius * Math.cos(angleRad),
					0,
					conveyor.belt.radius * Math.sin(angleRad) * invert
				).applyEuler(lastRotation)
			);

			endRotation.y += angleRad;
			return { endPosition, endRotation };
		}
	}
};

export default sectionDisplacement;
