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
		}
	}
	
	function addConfusion(amount: number) {
		confusionLevel += amount;
		if (confusionLevel >= maxConfusion) {
			nextLevel();
		}
	}
	
	function resetGame() {
		gameState = 'start';
	}
</script>

<div class="relative w-full min-h-screen overflow-hidden">
	{#if gameState === 'start'}
		<StartScreen onStart={startGame} />
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
			onRestart={resetGame} 
		/>
	{/if}
</div>
