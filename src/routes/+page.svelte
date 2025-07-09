<script lang="ts">
	import { getIcon } from '$lib/generated/icons';
	import type { HomeConfig } from '$lib/types';
	let { data }: {data: HomeConfig} = $props();
</script>

<h1>{data.name}</h1>
<p>{data.description}</p>

{#each data.contacts as contact}
  <div>
    <a href={contact.link}>
      {#if contact.icon}
        {@const IconComponent = getIcon(contact.icon)}
        <IconComponent color={contact.color} font-size={24}/>
      {/if}
      {contact.name}
    </a>
  </div>
{/each}
