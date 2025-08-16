<script lang="ts">
    import ProjectCard from "$lib/components/project-card.svelte";
	import type { ProjectsConfig } from "$lib/types";

    let { data }: { data: ProjectsConfig } = $props();
</script>

<div class="flex flex-grow flex-col items-center px-4 pb-4 w-full">
    <div class="text-4xl sm:text-6xl font-bold p-4">Projects</div>
    {#each data.project as project}
        {#if project.type == "large" || project.type == "small"}
            <ProjectCard {project}/>
        {:else}
            <p>Bad Project Type</p>
        {/if}
    {/each}
</div>