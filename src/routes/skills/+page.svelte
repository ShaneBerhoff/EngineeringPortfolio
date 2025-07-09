<script lang="ts">
	import { getIcon } from '$lib/generated/icons';
	import type { SkillsConfig } from '$lib/types';
	let { data }: { data: SkillsConfig } = $props();
</script>

<div class="flex flex-col">
	{#each data.sections as section}
		<div class="text-center text-3xl p-10">{section.name}</div>
		<div class="flex flex-row justify-evenly">
			{#each section.skills as skill}
				{#if skill.icon}
					{@const IconComponent = getIcon(skill.icon)}
					<div class="flex flex-col items-center">{skill.name}<IconComponent color={skill.color} font-size={24} /></div>
				{/if}
			{/each}
		</div>
	{/each}
</div>
