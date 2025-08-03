<script lang="ts">
	import { getIcon } from '$lib/generated/icons';
	import type { SiteConfig } from '$lib/types';
	let { data }: { data: SiteConfig } = $props();
</script>

<div
	class="absolute left-0 right-0 top-0 z-10 flex flex-row border-b-1 p-2 border-gray-300 bg-white h-15
	[&_a]:flex [&_a]:flex-row [&_a]:items-center [&_a]:gap-2 [&_a]:rounded
	[&_a]:p-2 [&_a]:transition-all [&_a]:hover:bg-gray-200"
>
	<a href="/">
		{#if data.icon}
			{@const IconComponent = getIcon(data.icon)}
			<IconComponent />
		{/if}
		{data.name}
	</a>
	<nav class="flex flex-grow justify-evenly">
		{#each Object.entries(data.navigation) as [key, navItem]}
			{#if navItem.enabled}
				<a href={`/${key}`}>
					{#if navItem.icon}
						{@const IconComponent = getIcon(navItem.icon)}
						<IconComponent />
					{/if}
					{navItem.name}
				</a>
			{/if}
		{/each}
	</nav>
	<button>Toggle</button>
</div>
