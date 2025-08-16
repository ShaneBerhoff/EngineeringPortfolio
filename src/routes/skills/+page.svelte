<script lang="ts">
	import SkillCard from '$lib/components/skill-card.svelte';
	import type { SkillsConfig } from '$lib/types';
	let { data }: { data: SkillsConfig } = $props();
</script>

<div class="flex h-full w-full justify-center">
	<div class="flex h-full max-w-5xl flex-grow flex-col">
		<div class="p-4 text-center text-6xl font-bold">Skills</div>
		{#each data.section as section}
			<div class="flex flex-row items-center gap-2 py-4">
				<hr class="w-24 border-gray-300" />
				<div class="text-sm text-gray-500">{section.name}</div>
				<hr class="flex-1 border-gray-300" />
			</div>
			<div class="flex flex-row flex-wrap gap-4 mb-10">
				{#each section.skill as skill}
					<SkillCard color={skill.color} icon={skill.icon} icon_size={skill.icon_size} text={skill.name} />
				{/each}
			</div>
		{/each}
	</div>
</div>
