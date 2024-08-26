<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import webSocket from "$utils/webSocket";
import Rendered from "./Rendered.svelte";
import Raw from "./Raw.svelte";

let log = getContext("log");
let key = getContext("key");

let type = "rendered";

let renderers = {
	rendered: Rendered,
	raw: Raw,
};

let connected = false;

let scroller;

function isScrolledToBottom() {
	let {scrollHeight, scrollTop, offsetHeight} = scroller;
	
	return Math.abs(scrollTop + offsetHeight - scrollHeight) < 20;
}

function scroll() {
	scroller.scrollTop = scroller.scrollHeight;
}

function onKeydown(e) {
	if (e.key === "Enter") {
		let value = e.target.value;
		
		if (value) {
			log.addManualEntry(value);
		} else {
			log.addNewline();
		}
		
		e.target.value = "";
	}
}

function onEntryReceived(entry) {
	// ...
}

async function onManualEntry() {
	await tick();
	
	scroll();
}

let handlers = {
	log(data) {
		log.receiveEntry(data);
	},
};

onMount(function() {
	let teardown = [
		log.on("entryReceived", onEntryReceived),
		log.on("manualEntry", onManualEntry),
		//log.on("update", onUpdate),
	];
	
	webSocket(import.meta.env.VITE_WS_URL + "/ws/" + key, {
		message({type, data}) {
			handlers[type](data);
		},
		
		async connected() {
			connected = true;
		},
		
		disconnected() {
			connected = false;
		},
	});
	
	return function() {
		for (let fn of teardown) {
			fn();
		}
	}
});
</script>

<style lang="scss">
@import "$css/mixins/abs-sticky";

#main {
}

#log {
	position: relative;
	height: 40em;
	
	border: var(--boldBorder);
	border-radius: var(--boldBorderRadius);
	background: white;
}

#scroller {
	@include abs-sticky;
	
	overflow: auto;
}

#input {
	display: flex;
	align-items: center;
	//justify-content: space-between;
	margin-top: 3px;
}

input[type="text"] {
	width: 20em;
	margin-right: .3em;
	border: 1px solid #606060;
	border-radius: 4px;
	padding: .5em;
	
}

.spacer {
	flex-grow: 1;
}

#connection {
	font-size: .9em;
	color: #444444;
	display: inline-flex;
	align-items: center;
	margin-left: .7em;
}

#indicator {
	$size: 9px;
	
	width: $size;
	height: $size;
	margin-right: .4em;
	border-radius: 100px;
	background: #B7B7B7;
	
	&.connected {
		/*margin-right: 0;*/
		background: #2e9404;
	}
}
</style>

<div id="main">
	<div id="log">
		<div id="scroller" bind:this={scroller}>
			<svelte:component this={renderers[type]}/>
		</div>
	</div>
	<div id="input">
		<input type="text" placeholder="Add notes or separators" on:keydown={onKeydown}/>
		<div id="connection">
			<div id="indicator" class:connected></div>
			{connected ? "Connected" : "Connecting..."}
		</div>
		<div class="spacer"></div>
		<div id="prefs">
			<label>
				<input type="checkbox" checked={type === "raw"} on:input={() => type = type === "raw" ? "rendered" : "raw"}>
				Raw
			</label>
		</div>
	</div>
</div>
