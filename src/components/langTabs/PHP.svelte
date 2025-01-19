<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let key = getContext("key");
let postUrl = getContext("postUrl");

let code = dedent(`
	$printrUrl = "${postUrl}";
	
	function printr($data) {
		global $printrUrl;
		$isScalar = is_scalar($data);
		$contentType = $isScalar ? "text/plain" : "application/json";
		echo "curl -H \\"Content-Type: $contentType\\" --data-binary @- $printrUrl", "w";
		$curl = popen("curl -H \\"Content-Type: $contentType\\" --data-binary @- $printrUrl", "w");
		fwrite($curl, $isScalar ? $data : json_encode($data));
		fclose($curl);
	}
	
	printr(["test" => 123]);
	
	// debug_backtrace() output isn't always serialisable, so use this for traces:
	
	function printr_trace($e=null) {
		global $printrUrl;
		if (!$e) {
			$e = new Exception;
		}
		$curl = popen("curl --data-binary @- $printrUrl", "w");
		fwrite($curl, $e->getTraceAsString());
		fclose($curl);
	}
	
	// set the global error and exception handlers:
	
	function printr_error_handler($errNo, $message, $file, $line, $context) {
		// Respects error_reporting and @ operator
		if (!(error_reporting() & $errNo)) {
			return;
		}
		printr([
			"message" => $message,
			"errNo" => $errNo,
			"file" => $file,
			"line" => $line,
			"context" => $context,
			"trace" => (new Exception)->getTraceAsString(),
		]);
	}
	
	function printr_exception_handler($e) {
		printr($e->getMessage() . "\\n\\n" . $e->getTraceAsString());
	}
	
	set_error_handler("printr_error_handler");
	set_exception_handler("printr_exception_handler");
`);
</script>

<style lang="scss">

</style>

<pre class="language-php"><code>{code}</code></pre>
