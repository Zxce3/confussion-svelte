<script lang="ts">
	import GameBoard from './GameBoard.svelte';
	import StartScreen from './StartScreen.svelte';
	import GameOverScreen from './GameOverScreen.svelte';
	
	// Game state using Svelte 5 runes
	let gameState = $state<'start' | 'playing' | 'gameOver'>('start');
	let level = $state(1);
	let score = $state(0);
	let lives = $state(3);
	let confusionLevel = $state(0);
	
	// Personal best, persisted when storage is available
	let best = $state(0);
	let isNewBest = $state(false);
	$effect(() => {
		try {
			best = Number(localStorage.getItem('eternal-confusion-best')) || 0;
		} catch {}
	});

	// Derived values
	let maxConfusion = $derived(level * 10);
	let isGameActive = $derived(gameState === 'playing');
	
	function startGame() {
		gameState = 'playing';
		level = 1;
		score = 0;
		lives = 3;
		confusionLevel = 0;
	}
	
	function nextLevel() {
		level++;
		confusionLevel = 0;
		score += 100 * level;
	}
	
	function loseLife() {
		lives--;
		if (lives <= 0) {
			gameState = 'gameOver';
			isNewBest = score > best;
			if (isNewBest) {
				best = score;
				try {
					localStorage.setItem('eternal-confusion-best', String(score));
				} catch {}
			}
		}
	}
	
	function addConfusion(amount: number) {
		score += amount;
		confusionLevel += amount;
		if (confusionLevel >= maxConfusion) {
			nextLevel();
		}
	}
	
</script>

<div class="relative w-full min-h-dvh overflow-hidden">
	{#if gameState === 'start'}
		<StartScreen onStart={startGame} {best} />
	{:else if gameState === 'playing'}
		<GameBoard 
			{level} 
			{score} 
			{lives} 
			{confusionLevel} 
			{maxConfusion}
			onLoseLife={loseLife}
			onAddConfusion={addConfusion}
		/>
	{:else}
		<GameOverScreen 
			{score} 
			{level} 
			{best}
			{isNewBest}
			onRestart={startGame} 
		/>
	{/if}
</div>
