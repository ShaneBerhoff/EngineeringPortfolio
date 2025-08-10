<script lang="ts">
	import type { ContentType } from '$lib/types';
	import ModelViewer from './model-viewer.svelte';
	let { type, content }: { type: ContentType; content: string } = $props();
</script>

{#if type == 'title'}
	<div class="m-4 flex flex-1 items-center justify-center text-3xl font-bold">{content}</div>
{:else if type == 'text'}
	<div class="m-4 overflow-y-auto">{content}</div>
{:else if type == 'image'}
	<div class="m-4 flex max-h-full justify-center">
		<img src={content} alt={content} class="object-contain" />
	</div>
{:else if type == 'model'}
	<ModelViewer modelUrl={content} />
{:else}
	<div>Invalid Content Type</div>
{/if}
