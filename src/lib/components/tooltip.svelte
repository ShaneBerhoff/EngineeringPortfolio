<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		delay?: number;
	}

	let { children, text, position = 'top', delay = 0 }: Props = $props();
	let showTooltip = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | undefined = $state();

	const positions = {
		top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
	};

	const arrows = {
		top: 'absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900',
		bottom:
			'absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900',
		left: 'absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900',
		right:
			'absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900'
	};

	function showTooltipWithDelay() {
		if (delay > 0) {
			timeoutId = setTimeout(() => {
				showTooltip = true;
			}, delay);
		} else {
			showTooltip = true;
		}
	}

	function hideTooltip() {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = undefined;
		}
		showTooltip = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="relative inline-block">
	<div
		onmouseenter={showTooltipWithDelay}
		onmouseleave={hideTooltip}
		onfocus={showTooltipWithDelay}
		onblur={hideTooltip}
	>
		{@render children()}
	</div>

	{#if showTooltip}
		<div
			class="absolute {positions[
				position
			]} pointer-events-none z-50 rounded bg-gray-900 px-2 py-1 text-sm whitespace-nowrap text-white"
			role="tooltip"
		>
			{text}
			<div class={arrows[position]}></div>
		</div>
	{/if}
</div>
