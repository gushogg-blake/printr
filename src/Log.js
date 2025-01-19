import Evented from "$utils/Evented";
import {removeInPlace} from "$utils/arrayMethods";

class Log extends Evented {
	constructor() {
		super();
		
		this.entries = [];
		this.paths = new Set(["/"]);
	}
	
	addNewline() {
		let entry = this.entries.at(-1);
		
		if (entry && entry.type === "newline") {
			entry.height++;
		} else {
			this.entries.push({
				type: "newline",
				height: 1,
			});
		}
		
		this.fire("update");
		this.fire("manualEntry");
	}
	
	addManualEntry(str) {
		this.entries.push({
			type: "manual",
			data: str,
			date: new Date(),
			wrap: true,
		});
		
		this.fire("update");
		this.fire("manualEntry");
	}
	
	receiveEntry(entry) {
		this.entries.push({
			...entry,
			type: "relay",
			date: new Date(),
			wrap: true,
		});
		
		this.paths.add(entry.path);
		
		this.fire("update");
		this.fire("entryReceived");
	}
	
	system(message) {
		this.entries.push({
			date: new Date(),
			type: "system",
			message,
		});
		
		this.fire("update");
		this.fire("systemMessageReceived");
	}
	
	remove(entry) {
		removeInPlace(this.entries, entry);
		
		this.fire("update");
	}
	
	toggleWrap(entry) {
		entry.wrap = !entry.wrap;
		
		this.fire("update");
	}
}

export default Log;
