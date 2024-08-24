import Evented from "$utils/Evented";
import {removeInPlace} from "$utils/arrayMethods";

class Log extends Evented {
	constructor() {
		super();
		
		this.entries = [];
	}
	
	addNewline() {
		let entry = this.entries.at(-1);
		
		if (entry && entry.isNewline) {
			entry.height++;
		} else {
			this.entries.push({
				isNewline: true,
				height: 1,
			});
		}
		
		this.fire("update");
		this.fire("manualEntry");
	}
	
	addManualEntry(str) {
		this.entries.push({
			isManual: true,
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
			date: new Date(),
			wrap: true,
		});
		
		this.fire("update");
		this.fire("entryReceived");
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
