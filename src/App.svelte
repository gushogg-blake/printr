<script>
import {onMount, tick, setContext} from "svelte";
import sleep from "$utils/sleep";
import {push, remove} from "$utils/arrayMethods";
import wrap from "$utils/wrap";
import webSocket from "$utils/webSocket";
import inlineStyle from "$utils/dom/inlineStyle";
import LangTabs from "$components/LangTabs.svelte";
import {default as LogComponent} from "$components/Log/Log.svelte";
import Log from "./Log";

let log = new Log();

setContext("log", log);

let key = localStorage.getItem("key");

if (!key) {
	key = crypto.randomUUID();
	
	localStorage.setItem("key", key);
}

let postUrl = `https://tmwuc.gushogg-blake.com/print/${key}`;

setContext("key", key);
setContext("postUrl", postUrl);

let connected = false;

let handlers = {
	log(data) {
		log.receiveEntry(data);
	},
};

onMount(async function() {
	webSocket(import.meta.env.VITE_WS_URL + "/ws/" + key, {
		message({type, data}) {
			handlers[type](data);
		},
		
		async connected() {
			connected = true;
		},
		
		disconnected() {
			connected = false;
		},
	});
});
</script>

<svelte:head>
	<title>Tell Me What You See</title>
</svelte:head>

<style lang="scss">
@import "$css/mixins/abs-sticky";

a {
	color: #0E4D87;
}

#wrapper {
	--boldBorder: 1px solid #a0a3a5;
	--boldBorderRadius: 4px;
	
	min-height: 100vh;
	padding: 1em;
	background: #d9d9d9;
	background: #d2d5d7;
	background: #596268;
	background: #3b86b3;
}

#main {
	margin: 0 auto;
	max-width: 1000px;
	border-radius: 16px;
	padding: 1em;
	
	background: #e8e8e8;
	background: #dde1e3;
	background: #e3ebef;
}

h1, h2, h3 {
	color: #3F3F3F;
}

h1, h2, h3 {
	text-align: center;
}
</style>

<div id="wrapper">
	<div id="main">
		<div id="intro">
			<h1>Tell Me What You See</h1>
			<p align=center>
				A side project by <a href="//gushogg-blake.com">Gus Hogg-Blake</a>.
			</p>
			<br>
			<!--<h2>Quick and dirty logging for any language and environment</h2>-->
			<p> Quick and dirty logging for when <code>print()</code> isn't available in the current context and you just want to make some code "tell you what it sees", without getting further distracted looking into a codebase or environment you may not be familiar with.
			<p> For example:
			<ul>
				<li>
					It's in a Python server wrapped in a Windows executable, and for some reason stdout isn't directed to the command window you started it from.
					<br><br>
				</li>
				<li>
					It's in the cloud and the person who does the cloud is off today; you only know how to push the deploy button.
					<br><br>
				</li>
				<li>
					It's in a PHP API and you can't be bothered to figure out 1) how you get PHP to pretty-print stuff again; 2) where the webserver logs are; and then 3) to make sense of logs that are either all on one line, or multi-line logs where every line has a massive prefix of irrelevant fields.
					<!--<br><br>-->
				</li>
			</ul>
		</div>
		<h2>Usage</h2>
		<p> 1. Update code to send a POST request to <code>{postUrl}</code>.
		<p> You can use your own code or one of the snippets below.
		<div id="langs">
			<LangTabs/>
		</div>
		<div id="logs">
			<div class="step">
				<p> 2. Run code. Logs appear below.
			</div>
		</div>
		<div id="log">
			<LogComponent/>
		</div>
		<h2>How it works</h2>
		<p> When you load this page, the frontend generates a local UUID, stores it in <code>localStorage</code>, and uses it to connect to a WebSocket relay server.
		<p> The WebSocket relay server listens for POST requests at <code>/print/[uuid]</code> and relays log entries to all clients connected with that UUID.
		<p> Logs are not stored anywhere; reloading the page clears the log.
		<p> To separate out logs within a session for clarity, you can press Enter or optionally write a message in the input box below the log.
		<h2>Security</h2>
		<ul>
			<li>
				Anyone with the UUID can listen to the logs.
				<br><br>
			</li>
			<li>
				The WebSocket relay uses TLS in both directions, but messages are not E2E encrypted, so use your judgment on what to send. (I don't intentionally store logs anywhere or do anything with them, but maybe my stack is compromised in some way.)
			</li>
		</ul>
		<h2>Source</h2>
		<ul>
			<li>
				<a href="//gitlab.com/gushogg-blake/tmwuc">Frontend</a>
			</li>
			<li>
				<a href="//gitlab.com/gushogg-blake/tmwuc-relay">WebSocket relay</a>
			</li>
		</ul>
	</div>
</div>
