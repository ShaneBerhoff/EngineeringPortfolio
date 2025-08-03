<script lang="ts">
	import type { ContentType } from '$lib/types';
	import ModelViewer from './model-viewer.svelte';
	let { type, content }: { type: ContentType; content: string } = $props();
</script>

{#if type == 'text'}
	<div class="overflow-y-auto">{content}</div>
{:else if type == 'image'}
	<div class="flex justify-center max-h-full">
		<img src={content} alt={content} class="object-contain" />
	</div>
{:else if type == 'model'}
	<ModelViewer modelUrl={content} />
{:else}
	<div>Invalid Content Type</div>
{/if}
