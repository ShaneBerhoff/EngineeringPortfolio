<script lang="ts">
	import { getIcon } from '$lib/generated/icons';

	let { data } = $props();
</script>

<h1>{data.name}</h1>
<p>{data.description}</p>

{#each data.contacts as contact}
  {@const IconComponent = getIcon(contact.logo)}
  <div>
    <a href={contact.link}>
      {#if IconComponent}
        <IconComponent color={contact.color} size={24}/>
      {/if}
      {contact.name}
    </a>
  </div>
{/each}
