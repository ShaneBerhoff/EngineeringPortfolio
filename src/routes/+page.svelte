<script lang="ts">
	import { getIcon } from '$lib/generated/icons';
	import Tooltip from '$lib/components/tooltip.svelte';
	import type { HomeConfig } from '$lib/types';
	let { data }: { data: HomeConfig } = $props();
</script>

<div class="flex flex-grow items-center justify-center">
	<div class="flex max-w-5xl sm:flex-row flex-col space-y-4 space-x-4 p-4 mx-4 items-start">
		<div class="sm:max-w-1/2">
			<img src="profile.png" alt="Profile" class="rounded-md" />
		</div>
		<div class="flex sm:max-w-1/2 flex-col space-y-4">
			<div class="text-5xl">{data.name}</div>
			<div class="text-lg text-wrap">{data.description}</div>
			<div class="flex flex-row flex-wrap gap-2">
				{#each data.contact as contact}
					<Tooltip text={contact.name} position="bottom">
						<a
							href={contact.link}
							class="flex flex-col items-center justify-center rounded border border-gray-300 p-2 transition-colors hover:bg-gray-200"
						>
							{#if contact.icon}
								{@const IconComponent = getIcon(contact.icon)}
								<IconComponent color={contact.color} font-size={24} />
							{/if}
						</a>
					</Tooltip>
				{/each}
			</div>
		</div>
	</div>
</div>
