<script lang="ts">
    import ProjectCard from "$lib/components/project-card.svelte";
	import type { ExperienceConfig } from "$lib/types";

    let { data }: { data: ExperienceConfig } = $props();
</script>

<div class="flex flex-grow flex-col items-center px-4 pb-4">
    <div class="text-6xl font-bold p-4">Experience</div>
    {#each data.experience as experience}
        {#if experience.type == "large" || experience.type == "small"}
            <ProjectCard project={experience}/>
        {:else}
            <p>Bad Experience Type</p>
        {/if}
    {/each}
</div>