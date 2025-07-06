<script lang="ts">
    import { FileUser } from '@lucide/svelte';
	import { SiLinux } from '@icons-pack/svelte-simple-icons';
</script>

<div class="flex flex-row m-4">
    <a href="/"><SiLinux color=#FCC624/>Home</a>
	<nav class="justify-evenly flex flex-grow">
		<a href="/projects"><FileUser strokeWidth={1}/>Projects</a>
		<a href="/work">Work</a>
		<a href="/skills">Skills</a>
		<a href="/resume">Resume</a>
	</nav>
    <button>Toggle</button>
</div>
