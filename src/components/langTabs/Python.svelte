<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let postUrl = getContext("postUrl");

let code = dedent(`
	def tmwuc(obj):
		import requests
		url = 'https://tmwuc.gushogg-blake.com/print/25d7c902-c526-42ef-9e77-3bf837effd14'
		requests.post(url, json = obj)
	
	tmwuc({"test": 123})
`);
</script>

<style lang="scss">

</style>

<pre class="language-python"><code>{@html code}</code></pre>
