type Point = { x: number; y: number };

const generateDrivePoints = (scale: number, r: number): Record<string, Point> => {
	const points: Record<string, Point> = {};

	// Triangle properties
	const angleStep = (2 * Math.PI) / 3; // 120 degrees in radians

	// Compute b1, b2, b3 (base triangle points)
	points.b1 = { x: 0, y: -r };
	points.b2 = {
		x: scale * Math.cos(angleStep),
		y: -r + scale * Math.sin(angleStep),
	};
	points.b3 = {
		x: -scale * Math.cos(angleStep),
		y: -r + scale * Math.sin(angleStep),
	};

	// Compute l1, l2, l3 (midpoints on triangle edges)
	points.l1 = {
		x: (points.b1.x + points.b2.x) / 2,
		y: (points.b1.y + points.b2.y) / 2,
	};
	points.l2 = {
		x: (points.b2.x + points.b3.x) / 2,
		y: (points.b2.y + points.b3.y) / 2,
	};
	points.l3 = {
		x: (points.b3.x + points.b1.x) / 2,
		y: (points.b3.y + points.b1.y) / 2,
	};

	// Compute r1, r2, r3 (rounded top arc points)
	const offset = r / 2; // Vertical offset for arcs
	points.r1 = { x: 0, y: scale + offset };
	points.r2 = {
		x: scale * Math.cos(angleStep),
		y: scale + offset + scale * Math.sin(angleStep),
	};
	points.r3 = {
		x: -scale * Math.cos(angleStep),
		y: scale + offset + scale * Math.sin(angleStep),
	};

	return points;
};

export default generateDrivePoints;
