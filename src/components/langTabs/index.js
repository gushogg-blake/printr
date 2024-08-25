import Node from "./Node.svelte";
import PHP from "./PHP.svelte";
import Bash from "./Bash.svelte";
import Browser from "./Browser.svelte";

export default [
	{
		name: "Bash",
		content: Bash,
	},
	{
		name: "PHP",
		content: PHP,
	},
	{
		name: "Node",
		content: Node,
	},
	{
		name: "Browser",
		content: Browser,
	},
];
