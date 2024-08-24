<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import Rendered from "./Rendered.svelte";
import Raw from "./Raw.svelte";

let log = getContext("log");

let type = "rendered";

let renderers = {
	rendered: Rendered,
	raw: Raw,
};

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

onMount(function() {
	let teardown = [
		log.on("entryReceived", onEntryReceived),
		log.on("onManualEntry", onManualEntry),
		log.on("update", onUpdate),
	];
	
	
	
	return function() {
		for (let fn of teardown) {
			fn();
		}
	}
});
</script>

<style lang="scss">

</style>

<div id="main">
	<div id="log" bind:this={scroller}>
		<svelte:component this={renderers[type]}/>
	</div>
	<div id="input">
		<input autofocus on:keydown={onKeydown}/>
	</div>
</div>
