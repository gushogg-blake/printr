<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let key = getContext("key");
let postUrl = getContext("postUrl");

let code = dedent(`
	import {spawn} from "node:child_process";
	
	function printr(data) {
		let curl = spawn("curl", [
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
	
	// redirect stdout:
	
	let oldOut = process.stdout.write;
	let oldErr = process.stderr.write;
	
	process.stdout.write = function(str, enc, fd) {
		let e = {};
		
		Error.captureStackTrace(e, process.stdout.write);
		
		printr(str, e.stack);
		
		oldOut.call(process.stdout, str, enc, fd);
	}
	
	process.stderr.write = function(str, enc, fd) {
		let e = {};
		
		Error.captureStackTrace(e, process.stderr.write);
		
		printr(str, e.stack);
		
		oldErr.call(process.stderr, str, enc, fd);
	}
`);
</script>

<style lang="scss">

</style>

<pre class="language-javascript"><code>{code}</code></pre>
