<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";

export let tabs;

let selectedTab = tabs[0];

function selectTab(tab) {
	selectedTab = tab;
}
</script>

<style lang="scss">
#tabBar {
	display: flex;
	padding-left: 4px;
}

.tab {
	border-radius: 5px 5px 0 0;
	padding: .8em 1.3em;
	cursor: pointer;
	
	&.selected {
		background: white;
	}
}

.content {
	display: none;
	height: 20em;
	border: var(--boldBorder);
	border-radius: var(--boldBorderRadius);
	padding: 1em;
	overflow: auto;
	background: white;
	
	&.selected {
		display: block;
	}
}
</style>

<div id="main">
	<div id="tabBar">
		{#each tabs as tab (tab)}
			<div class="tab" class:selected={selectedTab === tab} on:click={() => selectTab(tab)}>
				{tab.name}
			</div>
		{/each}
	</div>
	{#each tabs as tab (tab)}
		<div class="content" class:selected={selectedTab === tab}>
			<svelte:component this={tab.content}/>
		</div>
	{/each}
</div>
