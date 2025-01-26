<script>
import {onMount, tick, setContext} from "svelte";
import sleep from "$utils/sleep";
import {push, remove} from "$utils/arrayMethods";
import inlineStyle from "$utils/dom/inlineStyle";
import LangTabs from "$components/LangTabs.svelte";
import Section from "$components/Section.svelte";
import {default as LogComponent} from "$components/Log/Log.svelte";
import Log from "./Log";

let log = new Log();

setContext("log", log);

function getKeyFromUrl() {
	return location.href.match(/key=(.+)/)?.[1];
}

let key = getKeyFromUrl();

if (!key) {
	setKey();
}

function setKey() {
	location.href = "?key=" + crypto.randomUUID();
}

let postUrl = `${import.meta.env.VITE_POST_URL}/print/${key}`;

setContext("key", key);
setContext("postUrl", postUrl);
</script>

<svelte:head>
	<title>printr</title>
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
	background: #f7f7f7;
}

#main {
	display: flex;
	flex-direction: column;
	gap: 1em;
	margin: 0 auto;
	padding: 1em;
}

h1, h2, h3 {
	color: #3F3F3F;
}

h1, h2, h3 {
	text-align: center;
}

#title {
	font-weight: bold;
	padding: .5em;
	background: white;
}

.col {
	//margin: 0 auto;
	max-width: 900px;
}
</style>

<div id="wrapper">
	<div id="title">
		printr
	</div>
	<div id="main">
		<Section title="About">
			<div class="col">
				<h2>About</h2>
				<p> Quick and dirty logging for when <code>print()</code> is unavailable or unergonomic. Just send text or JSON to this server and see it below.
				<h2>Usage</h2>
				<p> Update code to send a POST request to <code>{postUrl}</code>.
				<p> You can use your own code or one of the snippets below.
				<h3>Features</h3>
				<ul>
					<li>
						<p> You can add <code>/your-custom-identifier</code> to the end of the URL to enable splitting logs. These will appear as filters (All, /, /your-custom-identifier, etc) above the log.
					</li>
					<li>
						<p> You can set the key in the URL to whatever you want (see below for explanation), but be aware that there is nothing stopping multiple people using the same key.
					</li>
					<li>
						<p> To separate out logs within a session for clarity, press Enter or optionally write a message in the input box below the log.
					</li>
					<li>
						<p> Hover over relayed logs to see the headers.
					</li>
				</ul>
				<h2>How it works</h2>
				<p> When you load this page, the frontend generates a random key (if not already present), performs a redirect to add it the URL, and uses it to connect to a relay server.
				<p> The relay server listens for POST requests at <code>/print/[key]</code> and relays log entries to all clients connected with that key.
				<p> Logs are not stored anywhere; reloading the page clears the log.
				<h2>Security</h2>
				<ul>
					<li>
						<b>Anyone with the key can listen to the logs!</b> (<a href="javascript:void(0)" on:click={setKey}>Generate new key</a>).
						<br><br>
					</li>
					<li>
						The relay uses TLS in both directions, but messages are not E2E encrypted, so use your judgment on what to send. (I don't intentionally store logs anywhere or do anything with them, but maybe my stack is compromised in some way.)
					</li>
				</ul>
				<h2>Source</h2>
				<ul>
					<li>
						<a href="//github.com/gushogg-blake/tmwuc">Frontend</a>
					</li>
					<li>
						<a href="//github.com/gushogg-blake/tmwuc-relay">Relay</a>
					</li>
				</ul>
			</div>
		</Section>
		<Section title="Snippets" defaultExpand>
			<LangTabs/>
		</Section>
		<div id="log">
			<LogComponent/>
		</div>
	</div>
</div>
