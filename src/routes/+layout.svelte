<script lang="ts">
	import '../app.css';
	import type { SiteConfig } from '$lib/types';
	import NavBar from '$lib/components/nav-bar.svelte';
	let { children, data }: { children: import('svelte').Snippet; data: SiteConfig } = $props();
</script>

<div class="flex flex-col">
	<NavBar {data} />
	<div>{@render children()}</div>
</div>
