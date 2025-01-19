<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let key = getContext("key");
let postUrl = getContext("postUrl");

let code = dedent(`
	printrurl="${postUrl}"
	
	function printr {
		curl -d "$1" "$printrurl"
	}
	
	printr test
`);
</script>

<style lang="scss">

</style>

<pre class="language-bash"><code>{code}</code></pre>
