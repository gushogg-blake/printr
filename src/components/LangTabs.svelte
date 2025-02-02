<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import langTabs from "$components/langTabs";
import Tabs from "$components/Tabs.svelte";
</script>

<style lang="scss">

</style>

<div id="main">
	<Tabs tabs={langTabs}/>
</div>
