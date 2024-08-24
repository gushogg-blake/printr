import _typeof from "$utils/typeof";

export default function groupBy(array, field, _default) {
	let obj = {};
		
	for (let item of array) {
		let key = item[field] || _default;
		
		if (!obj[key]) {
			obj[key] = [];
		}
		
		obj[key].push(item);
	}
	
	return obj;
}
