import { Belt } from '@system/parts/belt';

const offset = 1;

const getProperties = (belt: Belt) => {
	const inside = belt.turnRadiusInside - offset;
	const outside = inside + belt.width + offset * 2;
	const width = outside - inside;
	const res = {
		section: {
			width,
			height: 10,
			radius: { inside, outside },
		},
	};
	return res;
};

export default getProperties;
