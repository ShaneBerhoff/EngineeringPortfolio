<script lang="ts">
	import { getIcon } from '$lib/generated/icons';
	import type { HomeConfig } from '$lib/types';
	let { data }: { data: HomeConfig } = $props();
</script>

<div class="flex flex-grow items-center justify-center">
	<div class="flex max-w-5xl flex-row space-x-4 p-4">
		<div class="max-w-1/2">
			<img src="/profile.png" alt="Profile" class="rounded-md" />
		</div>
		<div class="flex max-w-1/2 flex-col space-y-4">
			<div class="text-5xl">{data.name}</div>
			<div class="text-lg text-wrap">{data.description}</div>
			<div class="flex flex-row flex-wrap gap-4">
				{#each data.contacts as contact}
					<a
						href={contact.link}
						class="flex aspect-square w-20 flex-col items-center justify-center space-y-2 rounded border border-gray-300 transition-colors hover:bg-gray-200"
					>
						{#if contact.icon}
							{@const IconComponent = getIcon(contact.icon)}
							<IconComponent color={contact.color} font-size={24} />
						{/if}
						<span class="w-full truncate text-center text-xs leading-tight">{contact.name}</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>
