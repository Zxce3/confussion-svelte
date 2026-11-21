<script module lang="ts">
	// Remember the last question so the same challenge never appears twice in a row
	let lastQuestion = '';
</script>

<script lang="ts">
	import { pickChallenge, challengeKey } from './challenges';
	import { untrack } from 'svelte';

	let { level, challengeType, onLock, onComplete, onFailed }: {
		level: number;
		challengeType: number;
		onLock: () => void;
		onComplete: (points: number) => void;
		onFailed: () => void;
	} = $props();

	// Difficulty is fixed for a round (the component remounts each round)
	const difficulty = $derived(level >= 10 ? 'hard' : level >= 5 ? 'medium' : 'easy');

	const challenge = untrack(() => pickChallenge(difficulty, lastQuestion));
	lastQuestion = challengeKey(challenge);

	const labels: Record<string, string> = {
		'color-word': 'Stroop trap',
		'math-confusion': 'Mental math',
		pattern: 'Pattern',
		'word-trap': 'Word trap',
		paradox: 'Paradox',
		'memory-trap': 'Memory trap',
		logic: 'Brain teaser',
		'memory-flash': 'Memory flash',
		'odd-one-out': 'Odd one out',
		count: 'Count',
		riddle: 'Riddle',
		unscramble: 'Unscramble'
	};

	const badge = {
		easy: 'bg-emerald-400/15 text-emerald-300',
		medium: 'bg-amber-400/15 text-amber-300',
		hard: 'bg-rose-400/15 text-rose-300'
	}[challenge.difficulty ?? 'easy'];

	let choices = $derived(challenge.options ?? challenge.words ?? []);
	const isText = ['math-confusion', 'riddle', 'unscramble'].includes(challenge.type);
	const isNumeric = challenge.type === 'math-confusion';
	const isGrid = challenge.type === 'odd-one-out';
	const isFlash = challenge.type === 'memory-flash';
	const textHints: Record<string, string> = {
		'math-confusion': "Don't let your brain trick you — mind the order of operations.",
		riddle: 'Think sideways. One word is enough.',
		unscramble: 'Rearrange the letters.'
	};

	// Memory flash: show the pattern briefly, then hide it
	let phase = $state<'show' | 'hide'>(isFlash ? 'show' : 'hide');
	let showLeft = $state(isFlash ? Math.min(6, 2 + (challenge.pattern?.length ?? 4) * 0.5) : 0);
	$effect(() => {
		if (!isFlash) return;
		const id = setInterval(() => {
			showLeft = Math.max(0, +(showLeft - 0.5).toFixed(1));
			if (showLeft <= 0) {
				phase = 'hide';
				clearInterval(id);
			}
		}, 500);
		return () => clearInterval(id);
	});
	let userAnswer = $state('');
	let selected = $state(-1);
	let result = $state<'idle' | 'correct' | 'wrong'>('idle');
	let earned = $state(0);

	function isCorrectChoice(i: number) {
		return challenge.type === 'color-word'
			? choices[i] === challenge.correctAnswer
			: i === challenge.correctAnswer;
	}

	function finish(correct: boolean) {
		if (result !== 'idle') return;
		onLock();
		result = correct ? 'correct' : 'wrong';
		if (correct) {
			const bonus = challenge.difficulty === 'hard' ? 15 : challenge.difficulty === 'medium' ? 10 : 5;
			earned = 10 + level * 2 + bonus;
		}
		setTimeout(() => (correct ? onComplete(earned) : onFailed()), correct ? 1000 : 1700);
	}

	function choose(i: number) {
		if (result !== 'idle' || phase === 'show') return;
		selected = i;
		finish(isCorrectChoice(i));
	}

	function submitText() {
		if (!userAnswer.trim()) return;
		const given = userAnswer.trim().toLowerCase();
		const ok = [String(challenge.correctAnswer), ...(challenge.acceptable ?? [])].some((a) => a.toLowerCase() === given);
		finish(ok);
	}

	function onKey(e: KeyboardEvent) {
		if (isText || phase === 'show' || e.metaKey || e.ctrlKey || e.altKey) return;
		const n = Number(e.key);
		if (n >= 1 && n <= choices.length) choose(n - 1);
	}

	function optionClass(i: number) {
		const base =
			'glass group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left font-medium transition-all duration-200 ';
		if (result === 'idle') {
			return base + 'hover:-translate-y-0.5 hover:bg-white/12 hover:border-violet-300/50 active:scale-[0.98]';
		}
		if (isCorrectChoice(i)) return base + 'border-emerald-400! bg-emerald-400/20! text-emerald-100';
		if (i === selected) return base + 'border-rose-400! bg-rose-400/20! text-rose-100 animate-shake';
		return base + 'opacity-40';
	}
</script>

<svelte:window onkeydown={onKey} />

<div class="glass animate-pop w-full rounded-3xl p-6 sm:p-9 {result === 'wrong' ? 'animate-shake' : ''}">
	<div class="mb-6 flex items-center justify-between text-xs">
		<span class="tracking-widest text-violet-200/50 uppercase">Round {challengeType + 1}</span>
		<div class="flex gap-2">
			<span class="rounded-full bg-white/10 px-2.5 py-1 text-violet-100">{labels[challenge.type] ?? challenge.type}</span>
			<span class="rounded-full px-2.5 py-1 capitalize {badge}">{challenge.difficulty ?? 'easy'}</span>
		</div>
	</div>

	<h2 class="font-display text-center text-xl leading-snug font-semibold text-white sm:text-2xl">
		{challenge.type === 'paradox' ? `“${challenge.question}”` : challenge.question}
	</h2>

	{#if challenge.type === 'color-word'}
		<div class="my-8 text-center">
			<span class="font-display text-6xl font-bold tracking-wider drop-shadow-[0_0_24px_currentColor] sm:text-7xl {challenge.color}">
				{challenge.word}
			</span>
		</div>
	{:else if challenge.pattern}
		<div class="my-8 flex flex-wrap justify-center gap-3 text-3xl sm:text-4xl">
			{#each challenge.pattern as item}
				<span class="glass flex size-14 items-center justify-center rounded-2xl sm:size-16 {phase === 'hide' && isFlash ? 'text-white/20' : ''}">
					{phase === 'hide' && isFlash ? '❔' : item}
				</span>
			{/each}
		</div>
		{#if isFlash && phase === 'show'}
			<p class="-mt-4 mb-4 text-center text-sm text-amber-300">Memorize! {showLeft.toFixed(1)}s</p>
		{/if}
	{:else if challenge.trap}
		<p class="mx-auto my-6 max-w-md rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-center text-sm text-amber-200">
			{challenge.trap}
		</p>
	{:else}
		<div class="h-6"></div>
	{/if}

	{#if isText}
		<form class="flex flex-col items-center gap-4" onsubmit={(e) => (e.preventDefault(), submitText())}>
			<p class="text-sm text-violet-200/50">{textHints[challenge.type]}</p>
			<!-- svelte-ignore a11y_autofocus -->
			<input
				bind:value={userAnswer}
				autofocus
				inputmode={isNumeric ? "numeric" : "text"}
				autocomplete="off"
				placeholder={isNumeric ? "?" : "answer"}
				disabled={result !== 'idle'}
				class="glass w-60 rounded-2xl border-white/15 bg-white/5 py-3 text-center font-display text-3xl text-white placeholder:text-white/20 focus:border-violet-400 focus:ring-violet-400 {result === 'correct' ? 'border-emerald-400!' : result === 'wrong' ? 'border-rose-400!' : ''}"
			/>
			<button type="submit" class="btn-primary disabled:opacity-40" disabled={!userAnswer.trim() || result !== 'idle'}>
				Submit
			</button>
		</form>
	{:else}
		<div class="grid gap-3 {isGrid ? (choices.length > 9 ? 'grid-cols-4 sm:grid-cols-4' : 'grid-cols-3') + ' mx-auto max-w-sm' : choices.length > 3 ? 'sm:grid-cols-2' : ''}">
			{#each choices as option, i}
				<button class={optionClass(i) + (isGrid ? ' justify-center text-3xl' : '')} disabled={result !== 'idle' || phase === 'show'} onclick={() => choose(i)}>
					{#if !isGrid}<kbd class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/10 font-mono text-xs text-violet-200/70">{i + 1}</kbd>{/if}
					<span class={challenge.type === 'pattern' || isFlash || challenge.type === 'count' ? 'text-xl' : ''}>{option}</span>
				</button>
			{/each}
		</div>
	{/if}

	<!-- Feedback -->
	<div class="mt-6 min-h-12 text-center" aria-live="polite">
		{#if result === 'correct'}
			<p class="animate-pop font-display text-lg font-semibold text-emerald-300">✨ Correct! +{earned}</p>
		{:else if result === 'wrong'}
			<p class="animate-pop font-display text-lg font-semibold text-rose-300">✗ Not quite — you lost a life</p>
			{#if isText}
				<p class="mt-1 text-sm text-violet-200/70">Answer: {challenge.correctAnswer}</p>
			{/if}
			{#if challenge.explanation}
				<p class="mt-1 text-sm text-violet-200/70">{challenge.explanation}</p>
			{/if}
		{/if}
	</div>
</div>
