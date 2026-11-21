<script lang="ts">
	let { onStart, best = 0 }: { onStart: () => void; best?: number } = $props();

	let glitch = $state(false);
	$effect(() => {
		const id = setInterval(() => {
			glitch = true;
			setTimeout(() => (glitch = false), 300);
		}, 3500);
		return () => clearInterval(id);
	});

	const features = [
		{ icon: '🧠', title: 'Bend perception', text: 'Stroop traps, paradoxes and riddles' },
		{ icon: '⏱️', title: 'Beat the clock', text: 'Less time as the levels climb' },
		{ icon: '❤️', title: 'Three lives', text: 'Wrong answers and timeouts cost one' }
	];
</script>

<svelte:window onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onStart())} />

<section class="flex min-h-dvh flex-col items-center justify-center px-5 py-12 text-center">
	<div class="animate-rise max-w-2xl">
		<span class="glass mb-8 inline-block rounded-full px-4 py-1.5 text-xs font-medium tracking-[0.25em] text-violet-200 uppercase">
			A puzzle of perception
		</span>

		<h1 class="font-display text-6xl leading-[0.95] font-bold tracking-tight sm:text-8xl {glitch ? 'animate-glitch' : ''}">
			<span class="text-gradient animate-shimmer block">Eternal</span>
			<span class="block text-white">Confusion</span>
		</h1>

		<p class="mx-auto mt-8 max-w-lg text-base leading-relaxed text-violet-100/70 sm:text-lg">
			Nothing is quite what it seems. Solve impossible puzzles before time runs out and survive
			as long as you can.
		</p>

		<div class="mt-10 grid gap-3 text-left sm:grid-cols-3">
			{#each features as f, i}
				<div class="glass animate-rise rounded-2xl p-4" style="animation-delay:{150 + i * 90}ms">
					<div class="text-2xl">{f.icon}</div>
					<div class="mt-2 text-sm font-semibold text-white">{f.title}</div>
					<div class="mt-1 text-xs leading-snug text-violet-200/60">{f.text}</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 flex flex-col items-center gap-4">
			<button onclick={onStart} class="btn-primary text-lg">Begin the confusion →</button>
			<p class="text-xs text-violet-200/50">
				Press <kbd class="rounded border border-white/20 px-1.5 py-0.5 font-mono">Enter</kbd> to start
			</p>
			{#if best > 0}
				<p class="glass rounded-full px-4 py-1.5 text-sm text-amber-300">🏆 Best score {best.toLocaleString()}</p>
			{/if}
		</div>
	</div>
</section>
