export default function wrap(line, maxLength) {
	let indent = line.match(/^\s*/)[0];
	let firstLine = line.substr(0, maxLength);
	let subsequentLineLength = maxLength - indent.length - 4;
	let i = maxLength;
	let lines = [firstLine];
	
	while (i < line.length) {
		lines.push(indent + "    " + line.substr(i, subsequentLineLength));
		i += subsequentLineLength;
	}
	
	return lines.join("\n");
}
