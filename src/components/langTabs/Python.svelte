<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let postUrl = getContext("postUrl");

let code = dedent(`
	def tmwuc(obj):
		import requests
		url = '${postUrl}'
		requests.post(url, json = obj)
	
	tmwuc({"test": 123})
`);
</script>

<style lang="scss">

</style>

<pre class="language-python"><code>{code}</code></pre>
