<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";

export let tabs;

let selectedTab = tabs[0];

function selectTab(tab) {
	selectedTab = tab;
}
</script>

<style lang="scss">

</style>

<div id="main">
	<div id="tabBar">
		{#each tabs as tab (tab)}
			<div class="tab" on:click={() => selectTab(tab)}>
				{tab.name}
			</div>
		{/each}
	</div>
	<div id="content">
		<svelte:component this={selectedTab.content}/>
	</div>
</div>
