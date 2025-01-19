<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let key = getContext("key");
let postUrl = getContext("postUrl");

let code = dedent(`
	function printr(data) {
		return fetch("${postUrl}", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
	}
	
	let fns = ["log", "info", "warn", "error", "debug"];
	
	for (let n of fns) {
		let fn = console[n];
	
		console[n] = function(...messages) {
			fn.apply(console, messages);
	
			for (let message of messages) {
				printr({
					type: n,
					message,
				});
			}
		};
	}
	
	console.log({test: 123}); // appears in console and log
`);
</script>

<style lang="scss">

</style>

<pre class="language-javascript"><code>{@html code}</code></pre>
