<script lang="ts">
	import EternalConfusion from '../lib/EternalConfusion.svelte';
</script>

<svelte:head>
	<title>Eternal Confusion</title>
	<meta name="description" content="A mind-bending puzzle game that will challenge your perception" />
	<meta name="theme-color" content="#07061a" />
</svelte:head>

<main class="relative min-h-dvh overflow-hidden bg-ink">
	<!-- Aurora backdrop -->
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div class="animate-float absolute -top-40 -left-32 size-[34rem] rounded-full bg-violet-600/40 blur-[120px]"></div>
		<div class="animate-float absolute top-1/3 -right-40 size-[30rem] rounded-full bg-fuchsia-600/30 blur-[120px]" style="animation-delay:-3s"></div>
		<div class="animate-float absolute -bottom-40 left-1/4 size-[32rem] rounded-full bg-sky-600/25 blur-[130px]" style="animation-delay:-6s"></div>
		<div class="absolute inset-0 opacity-[0.07]" style="background-image:radial-gradient(#fff 1px,transparent 1px);background-size:28px 28px"></div>
	</div>
	<div class="relative">
		<EternalConfusion />
	</div>
</main>
