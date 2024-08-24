<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import render from "./render";

let log = getContext("log");

let {entries} = log;

function onUpdate() {
	entries = log.entries;
}

onMount(function() {
	let teardown = [
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
#main {
	font-family: var(--dataFontFamily, "DejaVu Sans Mono", monospace);
	font-size: var(--dataFontSize, 14px);
	white-space: var(--dataWhiteSpace, pre);
	tab-size: var(--dataTabSize, 4);
}

.data {
}
</style>

<div id="main">
	{#each entries as entry (entry)}
		{render(entry)}
		{"\n"}
	{/each}
</div>
