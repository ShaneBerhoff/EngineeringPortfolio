<script lang="ts">
	import type { ProjectConfig } from '$lib/types';
	import ProjectCell from './project-cell.svelte';
	let { project }: { project: ProjectConfig } = $props();
</script>

<div
	class="m-4 flex h-[48rem] w-full max-w-7xl flex-grow flex-row justify-center space-x-2 overflow-hidden rounded-2xl border-2 border-gray-200 p-4 shadow-gray-200 transition-all hover:shadow-xl"
>
	<div class="flex h-full w-1/3 flex-col space-y-2">
		<div class="rounded bg-gray-200 p-4 text-center text-3xl font-bold">
			{project.title}
		</div>
		<div class="grid h-full min-h-0 grid-cols-1 grid-rows-4 gap-2">
			{#each project.side_item as side_item}
				<div
					class="flex rounded bg-gray-500 p-4 text-white"
					style="grid-column: span {side_item.cols}; grid-row: span {side_item.rows};"
				>
					<ProjectCell type={side_item.type} content={side_item.content} />
				</div>
			{/each}
		</div>
	</div>
	<div class="grid h-full min-h-0 w-2/3 min-w-0 grid-cols-4 grid-rows-4 gap-2">
		{#each project.grid_item as grid_item}
			<div
				class="flex rounded bg-gray-500 p-4 text-white"
				style="grid-column: span {grid_item.cols}; grid-row: span {grid_item.rows};"
			>
				<ProjectCell type={grid_item.type} content={grid_item.content} />
			</div>
		{/each}
	</div>
</div>
