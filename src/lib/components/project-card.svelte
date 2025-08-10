<script lang="ts">
	import type { ProjectConfig } from '$lib/types';
	import ProjectCell from './project-cell.svelte';

	let { project }: { project: ProjectConfig } = $props();
	let card_height = project.type == 'large' ? 48 : 24;

	function hexToRgba(hex: string, alpha = 0.1) {
		// Remove # if present
		hex = hex.replace('#', '');

		let r, g, b;

		if (hex.length === 3) {
			// 3-digit hex: expand each digit
			r = parseInt(hex[0] + hex[0], 16);
			g = parseInt(hex[1] + hex[1], 16);
			b = parseInt(hex[2] + hex[2], 16);
		} else if (hex.length === 6) {
			// 6-digit hex: normal parsing
			r = parseInt(hex.slice(0, 2), 16);
			g = parseInt(hex.slice(2, 4), 16);
			b = parseInt(hex.slice(4, 6), 16);
		} else {
			// Invalid hex, return transparent black
			return `rgba(0, 0, 0, ${alpha})`;
		}

		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	const boxShadow = `0 4px 6px -1px ${hexToRgba(project.shadow_color || '#e5e7eb', 0.1)}, 0 2px 4px -2px ${hexToRgba(project.shadow_color || '#e5e7eb', 0.1)}`;
	const hoverShadow = `0 0 25px 8px ${hexToRgba(project.shadow_color || '#e5e7eb', 0.2)}`;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="m-4 flex h-[{card_height}rem] w-full max-w-7xl flex-row justify-center space-x-2 overflow-hidden rounded-2xl border-2 p-4 transition-all"
	onmouseenter={(e) => (e.currentTarget.style.boxShadow = hoverShadow)}
	onmouseleave={(e) => (e.currentTarget.style.boxShadow = boxShadow)}
	style="height: {card_height}rem; background-color: {project.bg_color ||
		'#FFF'}; border-color: {project.border_color || '#e5e7eb'}; box-shadow: {boxShadow};"
>
	<div
		class="grid h-full min-h-0 w-full min-w-0 gap-2"
		style="grid-template-rows: repeat({project.total_rows}, minmax(0, 1fr)); grid-template-columns: repeat({project.total_cols}, minmax(0, 1fr));"
	>
		{#each project.grid_item as grid_item}
			<div
				class="flex rounded p-4"
				style="grid-column: span {grid_item.cols}; grid-row: span {grid_item.rows}; color: {grid_item.text_color}; background-color: {grid_item.bg_color ||
					'#6b7280'};"
			>
				<ProjectCell type={grid_item.type} content={grid_item.content} />
			</div>
		{/each}
	</div>
</div>
