<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/nav-bar.svelte';
	let { children } = $props();
</script>

<div class="flex flex-col">
	<NavBar/>
	<div>{@render children()}</div>
</div>

