<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import render from "./render";

export let entries;

let log = getContext("log");
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
	{#each entries.filter(entry => entry.type !== "system") as entry (entry)}
		{render(entry)}
		{"\n"}
	{/each}
</div>
