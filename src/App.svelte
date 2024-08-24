<script>
import {onMount, tick, setContext} from "svelte";
import sleep from "$utils/sleep";
import {push, remove} from "$utils/arrayMethods";
import wrap from "$utils/wrap";
import webSocket from "$utils/webSocket";
import inlineStyle from "$utils/dom/inlineStyle";
import langTabs from "$components/langTabs";
import Tabs from "$components/Tabs.svelte";
import {default as LogComponent} from "$components/Log/Log.svelte";
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
		<!--<h2>Quick and dirty logging for any language and environment</h2>-->
		<p> Quick and dirty logging for when <code>print()</code> isn't available; for example:
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
		<div id="log">
			<LogComponent/>
		</div>
	</div>
</div>
