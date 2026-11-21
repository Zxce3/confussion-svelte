<script lang="ts">
	let { score, level, best, isNewBest, onRestart }: {
		score: number;
		level: number;
		best: number;
		isNewBest: boolean;
		onRestart: () => void;
	} = $props();

	let rating = $derived(
		score < 500 ? 'Mildly Bewildered' :
		score < 1000 ? 'Thoroughly Perplexed' :
		score < 2000 ? 'Completely Baffled' :
		score < 3000 ? 'Utterly Discombobulated' :
		'Eternally Confused Master'
	);

	const quotes = [
		'Your brain fought valiantly against the confusion!',
		'Reality bent around you, but you persevered!',
		'In confusion, we find clarity... or do we?',
		'Confusion is just another word for learning!',
		'You\'ve earned a PhD in Perplexity!'
	];
	const quote = quotes[Math.floor(Math.random() * quotes.length)];
</script>

<svelte:window onkeydown={(e) => e.key === 'Enter' && onRestart()} />

<section class="flex min-h-dvh flex-col items-center justify-center px-5 py-12 text-center">
	<div class="animate-rise w-full max-w-md">
		<h1 class="font-display text-5xl font-bold tracking-tight sm:text-7xl">
			<span class="animate-glitch inline-block bg-linear-to-r from-rose-400 to-fuchsia-500 bg-clip-text text-transparent">Game over</span>
		</h1>
		<p class="mt-3 text-violet-200/60">{rating}</p>

		<div class="glass mt-8 rounded-3xl p-6 text-left">
			{#if isNewBest}
				<div class="animate-pop mb-4 rounded-xl bg-amber-400/15 px-4 py-2 text-center text-sm font-semibold text-amber-300">
					🏆 New personal best!
				</div>
			{/if}
			<div class="grid grid-cols-2 gap-4">
				<div>
					<div class="text-xs tracking-wider text-violet-200/50 uppercase">Score</div>
					<div class="font-display text-4xl font-bold text-emerald-300 tabular-nums">{score.toLocaleString()}</div>
				</div>
				<div>
					<div class="text-xs tracking-wider text-violet-200/50 uppercase">Level reached</div>
					<div class="font-display text-4xl font-bold text-sky-300 tabular-nums">{level}</div>
				</div>
			</div>
			<div class="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
				<span class="text-violet-200/60">Best score</span>
				<span class="font-semibold text-amber-300 tabular-nums">{best.toLocaleString()}</span>
			</div>
			<p class="mt-4 text-sm text-violet-100/60 italic">"{quote}"</p>
		</div>

		<button onclick={onRestart} class="btn-primary mt-8 text-lg">Embrace the confusion again</button>
		<p class="mt-3 text-xs text-violet-200/50">
			Press <kbd class="rounded border border-white/20 px-1.5 py-0.5 font-mono">Enter</kbd> to retry
		</p>
	</div>
</section>
