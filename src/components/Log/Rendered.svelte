<script>
import {onMount, setContext, getContext, createEventDispatcher, tick} from "svelte";
import inlineStyle from "$utils/dom/inlineStyle";
import render from "./render";

export let entries;

let log = getContext("log");

function newlineStyle(entry) {
	return {
		height: entry.height + "em",
	};
}

function toggleWrap(entry) {
	log.toggleWrap(entry);
}

function removeEntry(entry) {
	log.remove(entry);
}
</script>

<style lang="scss">
.entry {
	--containerPadding: .4em;
	--spacing: .5em;
	--separatorBorder: 1px solid #afafaf;
	
	color: #202020;
	margin: 0 var(--containerPadding);
	padding: .5em 0 1em;
	background: white;
	
	&:first-child {
		margin-top: var(--containerPadding);
	}
	
	&.newline, &:not(:last-child) {
		margin-bottom: var(--spacing);
		border-bottom: var(--separatorBorder);
	}
	
	&:last-child {
		margin-bottom: var(--containerPadding);
	}
}

.controlsAnchor {
	position: relative;
}

.controls {
	font-size: var(--controlsFontSize, .9em);
	position: absolute;
	top: 0;
	right: 0;
	display: none;
	
	.entry:hover & {
		display: var(--controlsDisplay, block);
	}
	
	a {
		color: var(--linkColor, #0E4D87);
	}
}

.date {
	font-size: var(--dateFontSize, .8em);
	color: var(--dateColor, #505050);
	display: var(--dateDisplay, block);
	margin-bottom: var(--dateMarginBottom, 1em);
}

.data {
	font-family: var(--dataFontFamily, "DejaVu Sans Mono", monospace);
	font-size: var(--dataFontSize, 14px);
	white-space: var(--dataWhiteSpace, pre);
	tab-size: var(--dataTabSize, 4);
}
</style>

<div id="main">
	{#each entries as entry (entry)}
		{#if entry.type === "newline"}
			<div
				class="log newline"
				style={inlineStyle(newlineStyle(entry))}
			></div>
		{:else}
			<div
				class="entry"
				title={entry.headers ? JSON.stringify(entry.headers, null, 4) : ""}
			>
				<div class="controlsAnchor">
					<div class="controls">
						<a
							href="javascript:void(0)"
							on:click={() => toggleWrap(entry)}
						>Toggle wrap</a>
						<a
							href="javascript:void(0)"
							on:click={() => removeEntry(entry)}
						>Remove</a>
					</div>
				</div>
				<div class="date">
					{entry.date.toLocaleString()}
					{#if entry.type === "manual"}
						(manual insertion)
					{/if}
					{#if entry.type === "system"}
						(system message)
					{/if}
				</div>
				<div class="data">
					{render(entry)}
				</div>
			</div>
		{/if}
	{/each}
</div>
