<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import langTabs from "$components/langTabs";
import Tabs from "$components/Tabs.svelte";

let main;

onMount(function() {
	Prism.highlightAllUnder(main);
});
</script>

<style lang="scss">

</style>

<div id="main" bind:this={main}>
	<Tabs tabs={langTabs}/>
</div>
