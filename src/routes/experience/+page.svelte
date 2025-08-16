<script lang="ts">
	import ProjectCard from '$lib/components/project-card.svelte';
	import type { ExperienceConfig } from '$lib/types';

	let { data }: { data: ExperienceConfig } = $props();
</script>

<div class="flex w-full flex-grow flex-col items-center px-4 pb-4">
	<div class="mb-2 p-4 text-4xl font-bold sm:text-6xl">Experience</div>
	{#each data.experience as experience}
		<div class="mb-10 flex h-full w-full flex-col items-center">
			<!-- sm screen -->
			<div class="flex w-full flex-col items-center text-gray-500 sm:hidden">
				<div class="flex w-full flex-row justify-between items-center gap-4">
					<div class="flex-shrink-0">{experience.company}</div>
					<hr class="flex-1 border-gray-300" />
					<div class="flex-shrink-0">{experience.position}</div>
				</div>
			</div>
			<!-- md/lg screen -->
			<div
				class="hidden w-full max-w-7xl grid-cols-3 items-center text-gray-500 sm:grid md:text-lg"
			>
				<div class="flex items-center justify-start gap-4">
					<hr class="border-gray-300 md:w-12" />
					<div class="flex-shrink-0">{experience.company}</div>
					<hr class="flex-1 border-gray-300" />
				</div>
				<div class="flex items-center justify-center gap-4">
					<hr class="flex-1 border-gray-300" />
					<div class="flex-shrink-0">{experience.position}</div>
					<hr class="flex-1 border-gray-300" />
				</div>
				<div class="flex items-center justify-end gap-4">
					<hr class="flex-1 border-gray-300" />
					<div class="flex-shrink-0">{experience.timeline}</div>
					<hr class="border-gray-300 md:w-12" />
				</div>
			</div>
			{#each experience.project as project}
				{#if project.type == 'large' || project.type == 'small'}
					<ProjectCard {project} />
				{:else}
					<p>Bad Experience Type</p>
				{/if}
			{/each}
		</div>
	{/each}
</div>
