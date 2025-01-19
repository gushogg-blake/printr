<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";

export let title;
export let defaultExpand = false;

let key = "expand." + title;
let expanded = localStorage.getItem(key) === "1";

function toggle() {
	expanded = !expanded;
	
	expanded ? localStorage.setItem(key, "1") : localStorage.removeItem(key);
}
</script>

<style lang="scss">
#main {
	border: 1px solid gray;
	border-radius: 8px;
	background: white;
}

#header {
	display: flex;
	gap: 1em;
	padding: 1em;
	cursor: pointer;
}

#content {
	padding: 1em;
}

.hide {
	display: none;
}
</style>

<div id="main">
	<div id="header" on:click={toggle}>
		<div id="symbol">
			{expanded ? "▼" : "▶"}
		</div>
		<div id="title">
			{title}
		</div>
	</div>
	<div id="content" class:hide={!expanded}>
		<slot/>
	</div>
</div>
