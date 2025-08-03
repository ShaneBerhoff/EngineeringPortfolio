<script lang="ts">
	import MaterialSymbolsLightMode from '~icons/material-symbols/light-mode';
	import { getIcon } from '$lib/generated/icons';
	import type { SiteConfig } from '$lib/types';
	let { data }: { data: SiteConfig } = $props();
</script>

<div
	class="absolute top-0 right-0 left-0 z-10 flex h-15 flex-row border-b-1 border-gray-300 bg-white p-2
	[&_a]:flex [&_a]:flex-row [&_a]:items-center [&_a]:gap-2 [&_a]:rounded
	[&_a]:p-2 [&_a]:transition-all [&_a]:hover:bg-gray-200 [&_p]:hidden sm:[&_p]:flex"
>
	<nav class="flex flex-grow justify-evenly">
		<a href="/">
			{#if data.icon}
				{@const IconComponent = getIcon(data.icon)}
				<IconComponent />
			{/if}
			<p>{data.name}</p>
		</a>
		{#each Object.entries(data.navigation) as [key, navItem]}
			{#if navItem.enabled}
				<a href={`/${key}`}>
					{#if navItem.icon}
						{@const IconComponent = getIcon(navItem.icon)}
						<div>
							<IconComponent />
						</div>
					{/if}
					<p>{navItem.name}</p>
				</a>
			{/if}
		{/each}
	</nav>
	<!-- <MaterialSymbolsLightMode/> -->
</div>
