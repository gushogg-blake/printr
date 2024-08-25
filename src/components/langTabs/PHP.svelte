<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import dedent from "$utils/dedent";

let key = getContext("key");
let postUrl = getContext("postUrl");

let code = dedent(`
	$tmwucUrl = "${postUrl}";
	
	function tmwuc($data) {
		global $tmwucUrl;
		$isScalar = is_scalar($data);
		$contentType = $isScalar ? "text/plain" : "application/json";
		echo "curl -H \"Content-Type: $contentType\" --data-binary @- $tmwucUrl", "w";
		$curl = popen("curl -H \"Content-Type: $contentType\" --data-binary @- $tmwucUrl", "w");
		fwrite($curl, $isScalar ? $data : json_encode($data));
		fclose($curl);
	}
	
	tmwuc(["test" => 123]);
	
	// debug_backtrace() output isn't always serialisable, so use this for traces:
	
	function tmwuc_trace($e=null) {
		global $tmwucUrl;
		if (!$e) {
			$e = new Exception;
		}
		$curl = popen("curl --data-binary @- $tmwucUrl", "w");
		fwrite($curl, $e->getTraceAsString());
		fclose($curl);
	}
	
	// set the global error and exception handlers:
	
	function tmwuc_error_handler($errNo, $message, $file, $line, $context) {
		// Respects error_reporting and @ operator
		if (!(error_reporting() & $errNo)) {
			return;
		}
		tmwuc([
			"message" => $message,
			"errNo" => $errNo,
			"file" => $file,
			"line" => $line,
			"context" => $context,
			"trace" => (new Exception)->getTraceAsString(),
		]);
	}
	
	function tmwuc_exception_handler($e) {
		tmwuc($e->getMessage() . "\n\n" . $e->getTraceAsString());
	}
	
	set_error_handler("tmwuc_error_handler");
	set_exception_handler("tmwuc_exception_handler");
`);
</script>

<style lang="scss">

</style>

<pre class="language-php"><code>{code}</code></pre>
