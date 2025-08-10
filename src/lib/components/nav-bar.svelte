<script lang="ts">
	import { getIcon } from '$lib/generated/icons';
	import type { SiteConfig } from '$lib/types';
	let { data }: { data: SiteConfig } = $props();
</script>

<div
	class="absolute top-0 right-0 left-0 z-10 flex h-15 flex-row border-b-1 border-gray-300 bg-white p-2"
>
	<nav class="grid w-full gap-4" style="grid-auto-flow: column; grid-auto-columns: 1fr;">
		{#each Object.entries(data.navigation) as [key, navItem]}
			{#if navItem.enabled}
				<div class="flex justify-center">
					<a
						class="flex flex-row items-center gap-2 rounded p-2 transition-all hover:bg-gray-200"
						href={key == 'profile' ? '/' : `/${key}`}
					>
						{#if navItem.icon}
							{@const IconComponent = getIcon(navItem.icon)}
							<div>
								<IconComponent />
							</div>
						{/if}
						<p class="hidden sm:flex">{navItem.name}</p>
					</a>
				</div>
			{/if}
		{/each}
	</nav>
</div>
