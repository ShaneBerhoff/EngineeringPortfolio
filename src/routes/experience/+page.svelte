<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import type { ExperienceConfig } from '$lib/types';

	let { data }: { data: ExperienceConfig } = $props();
</script>

<div class="flex flex-grow flex-col items-center px-4 pb-4">
	<div class="p-4 text-6xl font-bold mb-2">Experience</div>
	{#each data.experience as experience}
		<div class="w-full h-full items-center flex flex-col mb-10">
			<div class="text-lg grid w-full max-w-7xl grid-cols-3 items-center text-gray-500">
				<div class="flex items-center gap-4">
					<hr class="w-12 border-gray-300" />
					<div class="flex-shrink-0">{experience.company}</div>
					<hr class="flex-1 border-gray-300" />
				</div>
				<div class="flex items-center gap-4">
					<hr class="flex-1 border-gray-300" />
					<div class="flex-shrink-0">{experience.position}</div>
					<hr class="flex-1 border-gray-300" />
				</div>
				<div class="flex items-center gap-4">
					<hr class="flex-1 border-gray-300" />
					<div class="flex-shrink-0">{experience.timeline}</div>
					<hr class="w-12 border-gray-300" />
				</div>
			</div>
			{#each experience.projects as project}
				{#if project.type == 'large' || project.type == 'small'}
					<ProjectCard {project} />
				{:else}
					<p>Bad Experience Type</p>
				{/if}
			{/each}
		</div>
	{/each}
</div>
