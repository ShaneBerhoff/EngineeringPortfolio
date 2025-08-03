<script lang="ts">
	import type { ProjectConfig } from '$lib/types';
	import ModelViewer from './model-viewer.svelte';
	let { project }: { project: ProjectConfig } = $props();
</script>

<div
	class="m-4 flex h-[85vh] w-full max-w-7xl flex-grow flex-row justify-center space-x-2 overflow-hidden rounded-2xl border-2 border-gray-200 p-4 shadow-gray-200 transition-all hover:shadow-xl"
>
	<div class="flex h-full w-1/3 flex-col space-y-2">
		<div class="rounded bg-gray-200 p-4 text-center text-3xl font-bold">
			{project.title}
		</div>
		<!-- A -->
		<div class="flex flex-1 items-center justify-center rounded bg-blue-500 p-4 text-white">
			<div class="text-center">
				<div class="text-lg font-bold">{project.small_section.content}</div>
			</div>
		</div>
		<!-- B -->
		<div class="flex h-2/3 items-center justify-center rounded bg-orange-500 p-4 text-white">
			<div class="text-center">
				<div class="text-lg font-bold">{project.large_section.content}</div>
			</div>
		</div>
	</div>
	<div class="grid h-full min-h-0 w-2/3 min-w-0 grid-cols-4 grid-rows-4 gap-2">
		{#each project.grid_item as grid_item}
			<div
				class="flex items-center justify-center rounded bg-gray-500 p-4 text-white"
				style="grid-column: span {grid_item.cols}; grid-row: span {grid_item.rows};"
			>
				<div class="text-center">
					<div class="text-lg font-bold">{grid_item.content}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
