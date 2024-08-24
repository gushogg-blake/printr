import Evented from "$utils/Evented";

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
		});
		
		this.fire("update");
		this.fire("manualEntry");
	}
	
	receiveEntry(entry) {
		this.entries.push(entry);
		
		this.fire("update");
		this.fire("entryReceived");
	}
	
	remove(entry) {
	}
	
	toggleWrap(entry) {
	}
}

export default Log;
