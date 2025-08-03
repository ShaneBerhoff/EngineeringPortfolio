<script lang="ts">
    import ProjectCardLarge from "$lib/components/project-card-large.svelte";
    import ProjectCardSmall from "$lib/components/project-card-small.svelte";
	import type { ProjectsConfig } from "$lib/types";

    let { data }: { data: ProjectsConfig } = $props();
</script>

<div class="flex flex-grow flex-col items-center pb-5">
    {#each data.projects as project}
        {#if project.type == "large"}
            <ProjectCardLarge {project}/>
        {:else if project.type == "small"}
            <ProjectCardSmall {project}/>
        {:else}
            <p>Bad Project Type</p>
        {/if}
    {/each}
</div>