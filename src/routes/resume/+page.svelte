<script lang="ts">
	import type { ResumeConfig } from '$lib/types';
	let { data }: { data: ResumeConfig } = $props();
</script>

<div class="flex h-full w-full flex-col justify-center items-center">
    <!-- <div class="text-6xl font-bold p-4">Resume</div> -->
    <iframe src={data.url} class="h-full max-w-5xl w-full" title={data.title}></iframe>
</div>