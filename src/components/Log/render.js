import wrap from "$utils/wrap";

export default function(entry) {
	if (entry.type === "newline") {
		return "\n".repeat(entry.height);
	} else if (entry.type === "system") {
		return entry.message;
	}
	
	let str = entry.isJson ? JSON.stringify(entry.data, null, 4) : entry.data;
	
	if (entry.wrap) {
		let maxLength = 120;
		
		str = str.split("\n").map(function(line) {
			if (line.length > maxLength) {
				return wrap(line, maxLength);
			} else {
				return line;
			}
		}).join("\n");
	}
	
	return str;
}
