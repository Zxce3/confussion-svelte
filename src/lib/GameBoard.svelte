<script lang="ts">
	import { untrack } from 'svelte';
	import ConfusionChallenge from './ConfusionChallenge.svelte';

	let { level, score, lives, confusionLevel, maxConfusion, onLoseLife, onAddConfusion }: {
		level: number;
		score: number;
		lives: number;
		confusionLevel: number;
		maxConfusion: number;
		onLoseLife: () => void;
		onAddConfusion: (amount: number) => void;
	} = $props();

	let roundTime = $derived(Math.max(15, 30 - level * 2));
	let timeLeft = $state(30);
	let round = $state(0);
	let paused = $state(false);
	let lastLives = 0;
	let hurt = $state(false);
	lastLives = untrack(() => lives);

	// Countdown: one tick per second, paused while an answer is being shown
	$effect(() => {
		if (paused) return;
		if (timeLeft <= 0) {
			onLoseLife();
			round++;
			timeLeft = roundTime;
			return;
		}
		const id = setTimeout(() => timeLeft--, 1000);
		return () => clearTimeout(id);
	});

	// Flash the screen edge when a life is lost
	$effect(() => {
		if (lives < lastLives) {
			hurt = true;
			setTimeout(() => (hurt = false), 500);
		}
		lastLives = lives;
	});

	// Stable background particles (regenerated only when the level changes)
	let particles = $derived(
		Array.from({ length: 10 + level * 2 }, () => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 3,
			dur: 2 + Math.random() * 3
		}))
	);

	let progress = $derived(Math.min(100, (confusionLevel / maxConfusion) * 100));
	let timePct = $derived(Math.min(100, (timeLeft / roundTime) * 100));
	let urgent = $derived(timeLeft <= 5);

	function handleComplete(points: number) {
		onAddConfusion(points);
		round++;
		timeLeft = roundTime;
		paused = false;
	}

	function handleFailed() {
		onLoseLife();
		round++;
		timeLeft = roundTime;
		paused = false;
	}
</script>

<div class="relative min-h-dvh">
	<!-- Edge flash on damage -->
	<div
		class="pointer-events-none fixed inset-0 z-20 transition-opacity duration-500 {hurt ? 'opacity-100' : 'opacity-0'}"
		style="box-shadow: inset 0 0 160px 20px rgb(244 63 94 / 0.55)"
		aria-hidden="true"
	></div>

	<!-- HUD -->
	<header class="glass fixed inset-x-3 top-3 z-10 mx-auto max-w-4xl rounded-2xl px-4 py-3 sm:px-6">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-5 sm:gap-8">
				<div>
					<div class="text-[10px] tracking-widest text-violet-200/50 uppercase">Level</div>
					<div class="font-display text-xl leading-none font-bold text-amber-300 tabular-nums">{level}</div>
				</div>
				<div>
					<div class="text-[10px] tracking-widest text-violet-200/50 uppercase">Score</div>
					<div class="font-display text-xl leading-none font-bold text-emerald-300 tabular-nums">{score.toLocaleString()}</div>
				</div>
				<div aria-label="{lives} lives remaining">
					<div class="text-[10px] tracking-widest text-violet-200/50 uppercase">Lives</div>
					<div class="flex gap-0.5 text-lg leading-none">
						{#each [0, 1, 2] as i}
							<span class="transition-all duration-300 {i < lives ? '' : 'scale-75 opacity-25 grayscale'}">❤️</span>
						{/each}
					</div>
				</div>
			</div>

			<div class="text-right">
				<div class="text-[10px] tracking-widest text-violet-200/50 uppercase">Time</div>
				<div class="font-display text-2xl leading-none font-bold tabular-nums {urgent ? 'animate-pulse text-rose-400' : 'text-white'}">
					{timeLeft}s
				</div>
			</div>
		</div>

		<!-- Timer bar -->
		<div class="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
			<div
				class="h-full rounded-full transition-[width] duration-1000 ease-linear {urgent ? 'bg-rose-500' : 'bg-sky-400'}"
				style="width: {timePct}%"
			></div>
		</div>

		<!-- Level progress -->
		<div class="mt-2 flex items-center gap-3">
			<div class="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
				<div
					class="h-full rounded-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-pink-500 transition-[width] duration-500"
					style="width: {progress}%"
				></div>
			</div>
			<span class="text-[11px] text-violet-200/60 tabular-nums">{confusionLevel}/{maxConfusion}</span>
		</div>
	</header>

	<!-- Challenge -->
	<div class="mx-auto flex min-h-dvh max-w-3xl items-center justify-center px-4 pt-36 pb-10">
		{#key round}
			<ConfusionChallenge
				{level}
				challengeType={round}
				onLock={() => (paused = true)}
				onComplete={handleComplete}
				onFailed={handleFailed}
			/>
		{/key}
	</div>

	<!-- Ambient particles -->
	<div class="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
		{#each particles as p}
			<div
				class="absolute size-1 animate-ping rounded-full bg-white opacity-20"
				style="left: {p.x}%; top: {p.y}%; animation-delay: {p.delay}s; animation-duration: {p.dur}s;"
			></div>
		{/each}
	</div>
</div>
