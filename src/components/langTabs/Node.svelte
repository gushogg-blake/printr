<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let key = getContext("key");
let postUrl = getContext("postUrl");

let code = dedent(`
	function printr(data) {
		let curl = require("child_process").spawn("curl", [
			"-H", "Content-Type: application/json",
			"--data-binary", "@-",
			"${postUrl}",
		], {
			stdio: ["pipe", "inherit", "inherit"],
		});
		
		curl.stdin.write(JSON.stringify(data));
		curl.stdin.end();
	}
	
	printr({test: 123});
`);
</script>

<style lang="scss">

</style>

<pre class="language-javascript"><code>{code}</code></pre>
