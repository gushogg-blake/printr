<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let key = getContext("key");
let postUrl = getContext("postUrl");

let code = dedent(`
	tmwucurl="${postUrl}"
	
	function tmwuc {
		curl -d "$1" "$tmwucurl"
	}
	
	tmwuc test
`);
</script>

<style lang="scss">

</style>

<pre class="language-bash"><code>{@html code}</code></pre>
