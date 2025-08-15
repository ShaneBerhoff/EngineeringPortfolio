<script lang="ts">
	import { getIcon } from '$lib/generated/icons';

	interface Props {
		color?: string;
		icon?: string;
		icon_size?: number;
		text: string;
		tilt?: number;
	}

	const { color = '#6b7280', icon, icon_size = 64, text, tilt = 5 }: Props = $props();

	let IconComponent = $derived(icon ? getIcon(icon) : null);

	let el: HTMLElement;

	// Helper function to convert hex to rgba
	function hexToRgba(hex: string, alpha: number): string {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	// Computed color variations
	let borderColor = $derived(hexToRgba(color, 0.3));
	let dropColor = $derived(hexToRgba(color, 0.15));
	let bgColor = $derived(hexToRgba(color, 0.01));

	const onHover = (ev: MouseEvent) => {
		if (!tilt) return;

		const target = ev.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = ev.clientX - rect.left;
		const y = ev.clientY - rect.top;

		el.style.setProperty('--drop-x', `${x}px`);
		el.style.setProperty('--drop-y', `${y}px`);

		const width = el.offsetWidth;
		const height = el.offsetHeight;
		const cX = rect.x + width / 2;
		const cY = rect.y + height / 2;
		const mX = ev.clientX - cX;
		const mY = ev.clientY - cY;

		const rY = ((tilt * mX) / (width / 2)).toFixed(2);
		const rX = ((-1 * (tilt * mY)) / (height / 2)).toFixed(2);

		el.style.setProperty('--rot-x', `${rX}deg`);
		el.style.setProperty('--rot-y', `${rY}deg`);
	};

	$effect(() => {
		if (!el) return;

		el.style.setProperty('--border-color', borderColor);
		el.style.setProperty('--drop-color', dropColor);
		el.style.setProperty('--bg-color', bgColor);

		if (tilt) {
			el.style.setProperty('--drop-x', '0');
			el.style.setProperty('--drop-y', '0');
			el.style.setProperty('--rot-x', '0');
			el.style.setProperty('--rot-y', '0');
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={el}
	class="fancy-card relative w-61 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm
		transition-all duration-200"
	onmousemove={onHover}
>
	<div class="card-inner flex flex-col p-6">
		<h3 class="text-lg leading-none font-semibold tracking-tight text-gray-900 relative z-10">
			{text}
		</h3>
		{#if IconComponent}
			<div class="absolute top-1/2 right-0 -translate-y-1/2 opacity-40 z-0">
				<IconComponent font-size={icon_size} fill={color} {color} />
			</div>
		{/if}
	</div>
</div>

<style>
	.fancy-card:hover {
		transform: perspective(1000px) rotateX(var(--rot-x)) rotateY(var(--rot-y)) scale(1.01);
		border-color: var(--border-color);
	}

	.card-inner:hover {
		background-color: var(--bg-color);
		background-image: radial-gradient(
			circle at var(--drop-x) var(--drop-y),
			var(--drop-color),
			transparent
		);
	}
</style>
