<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";

let log = getContext("log");

let {entries} = log;
</script>

<style lang="scss">
#main {
	
}
</style>

<div id="main">
	{#each logs as log (log)}
		{render(log)}
		{"\n"}
	{/each}
</div>
