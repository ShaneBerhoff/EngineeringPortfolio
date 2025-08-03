<script lang="ts">
	import ModelViewer from './model-viewer.svelte';
</script>

<div
	class="m-4 flex max-h-[85vh] max-w-7xl flex-grow flex-row justify-center overflow-hidden rounded-2xl border-2 border-gray-200 p-4 shadow-gray-200 transition-all hover:shadow-xl"
>
	<div class="flex h-full w-1/3 flex-col">
		<div class="p-4 text-center text-3xl font-bold">This Is A Project Title</div>
		<div class="flex-1 overflow-y-auto">
			Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
			pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
			sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
			massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
			sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet
			consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
			cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar
			vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
			integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
			per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit.
			Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus
			duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus
			nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
			hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra
			inceptos himenaeos.
		</div>
		<div class="h-2/3 w-full">
			<ModelViewer modelUrl="BoxAnimated.glb" />
		</div>
	</div>
	<div class="flex h-full w-2/3 flex-col">
		<div class="flex h-1/2 flex-row">
			<div class="flex max-h-full w-1/2 justify-center rounded-lg bg-gray-200 m-2">
				<img src="profile.png" alt="Test" class="object-contain" />
			</div>
			<div class="flex w-1/2 overflow-y-auto rounded-lg bg-gray-200 p-4 m-2">
				Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
				pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
				aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
				Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
				aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
			</div>
		</div>
		<div class="flex h-1/2 flex-row">
			<div class="flex w-1/2 overflow-y-auto rounded-lg bg-gray-200 p-4 m-2">
				Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
				pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
				aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
			</div>
			<div class="flex max-h-full w-1/2 justify-center rounded-lg bg-gray-200 m-2">
				<img src="profile.png" alt="Test" class="object-contain" />
			</div>
		</div>
	</div>
</div>
