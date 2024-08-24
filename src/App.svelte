<script>
import {onMount, tick, setContext} from "svelte";
import sleep from "$utils/sleep";
import {push, remove} from "$utils/arrayMethods";
import wrap from "$utils/wrap";
import webSocket from "$utils/webSocket";
import inlineStyle from "$utils/dom/inlineStyle";
import logs from "$stores/logs";
import langTabs from "$components/langTabs";
import Log from "./Log";

let log = new Log();

setContext("log", log);

//logs = push(logs, {
//	date: new Date(),
//	isJson: true,
//	data: {
//		test: "lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet",
//	},
//	headers: {
//		"x-test": 123,
//	},
//});

let connected = false;

onMount(async function() {
	let key = localStorage.getItem("key");
	
	if (!key) {
		key = crypto.randomUUID();
		
		localStorage.setItem("key", key);
	}
	
	webSocket("wss://tmwuc.gushogg-blake.com:3789?key=" + key, {
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

#main {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

#logAnchor {
	position: relative;
	flex-grow: 1;
}

#log {
	@include abs-sticky;
	
	overflow: auto;
}

pre {
	/*max-height: 9em;*/
	border: 1px solid lightgray;
	border-radius: 1px;
	padding: 1em;
	overflow-x: auto;
}

h1, h2, h3 {
	color: #3F3F3F;
}

p, li {
	color: #2D2D2D;
}

/*code {
	padding: 2px;
	background: #eaeaea;
}*/

#info {
	border-top: 1px solid #c1c1c1;
	padding: .5em;
	-webkit-transition: background-color 1200ms ease-out;
	
	> div:not(:last-child) {
		margin-bottom: .5em;
	}
	
	&.new {
		background-color: #E5FFAD;
	}
}

#connection {
	display: inline-flex;
	align-items: center;
}

#indicator {
	$size: 9px;
	
	width: $size;
	height: $size;
	margin-right: .4em;
	border-radius: 100px;
	background: #B7B7B7;
	
	&.connected {
		/*margin-right: 0;*/
		background: #2e9404;
	}
}
</style>

<div id="main">
	<div id="intro">
		<h1>Tell Me What You See</h1>
		<h2>The quickest and dirtiest logging function there is</h2>
		<p> tmwuc is for when you'find yourself staring at some unfamiliar code and thinking "just tell me what you see".
		<p> As has become a bit of a theme in my software development practice: there are better ways, but this one is easier.
		<p> Surprisingly often I have found myself without an easy and fast way to make some code tell me what it sees. For example:
		<ul>
			<li>
				It's a Python server wrapped in a Windows executable and for some reason stdout isn't directed to the `cmd` window you started it from. Maybe there's a logging mixin available, but the broken code is in a utility function. You could figure out how to pass the logger into the util, or make the util return the interesting data before it throws the error, but that would take time and energy and you're already sidetracked.
			</li>
			<li>
				It's in the cloud and the guy who does the cloud is off today; you only know how to push the deploy button.
			</li>
			<li>
				It's in a PHP API and you can't be bothered to figure out 1) how you get PHP to pretty-print stuff again; 2) where the webserver logs are; and then 3) to make sense of logs that are either all on one line, or multi-line logs where every line has a massive prefix of irrelevant fields.
			</li>
		</ul>
	</div>
	<div id="langs">
		<div class="step">
			1. Place self-contained logging snippet in code.
		</div>
		<Tabs tabs={langTabs}/>
	</div>
	<div id="logs">
		<div class="step">
			2. Run code. Logs appear below.
		</div>
	</div>
	<div id="logAnchor">
		<div id="log" bind:this={logsDiv}>
			{#if $settings.raw}
				<div class="data">
					{#each logs as log (log)}
						{render(log)}
						{"\n"}
					{/each}
				</div>
			{:else}
				
			{/if}
		</div>
	</div>
	<div id="info" class:new={!visited}>
		<div class="bar">
			<div>
				{#if !connected}
				<div id="connection">
					<div id="indicator" class:connected></div>
					Connecting...
					</div>
				{/if}
				POST something to
				<code>{postUrl}</code> to see it here.
				{#if isPublic}
					|
					Connected clients: {connectedClients}
				{/if}
				<!--(<a
					href="javascript:void(0)"
					on:click={showReadme}
				>How?</a>)-->
			</div>
			<div>
				<a
					href="javascript:void(0)"
					on:click={showReadme}
				>Readme</a>
				|
				<a
					href="javascript:void(0)"
					on:click={showSettings}
				>Settings</a>
				|
				<a
					href="javascript:void(0)"
					on:click={showAbout}
				>About</a>
			</div>
		</div>
		<!--<div class="bar">
			<div>
				{#if isPublic}
					Viewing logs at <code>{key}</code>.  Connected clients: {connectedClients}
				{:else}
					Viewing logs at <code>{key}</code> from <code>{ip}</code>.
				{/if}
			</div>
			<div>
				<a
					href="javascript:void(0)"
					on:click={showSettings}
				>Settings</a>
			</div>
		</div>-->
	</div>
</div>
