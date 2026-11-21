<script lang="ts">
	import type { Challenge } from './challenges';
	import { getChallengesByDifficulty, shuffleChallenges, allChallenges } from './challenges';

	let { 
		level, 
		challengeType, 
		onComplete, 
		onFailed 
	}: {
		level: number;
		challengeType: number;
		onComplete: (points: number) => void;
		onFailed: () => void;
	} = $props();
	
	let userAnswer = $state('');
	let selectedOption = $state(-1);
	let draggedItems = $state<string[]>([]);
	let isAnswering = $state(false);

	// Pool of challenges for the current difficulty, shuffled once per level
	let difficulty = $derived<'easy' | 'medium' | 'hard'>(
		level >= 10 ? 'hard' : level >= 5 ? 'medium' : 'easy'
	);
	let pool = $derived.by(() => {
		const matching = shuffleChallenges(getChallengesByDifficulty(difficulty));
		return matching.length > 0 ? matching : shuffleChallenges(allChallenges);
	});

	// Cycle through the pool so every challenge differs from the last
	let currentChallenge = $derived(pool[challengeType % pool.length]);

	function submitAnswer() {
		if (isAnswering) return;
		isAnswering = true;
		
		let isCorrect = false;
		const challenge = currentChallenge;
		
		switch (challenge.type) {
			case 'color-word':
				isCorrect = userAnswer.toLowerCase() === challenge.correctAnswer;
				break;
			case 'math-confusion':
				isCorrect = userAnswer === challenge.correctAnswer;
				break;
			case 'pattern':
			case 'word-trap':
			case 'paradox':
			case 'memory-trap':
				isCorrect = selectedOption === challenge.correctAnswer;
				break;
		}
		
		setTimeout(() => {
			if (isCorrect) {
				// Award more points based on difficulty and level
				const basePoints = 10;
				const levelMultiplier = level * 2;
				const difficultyBonus = challenge.difficulty === 'hard' ? 15 : 
				                       challenge.difficulty === 'medium' ? 10 : 5;
				const totalPoints = basePoints + levelMultiplier + difficultyBonus;
				onComplete(totalPoints);
			} else {
				onFailed();
			}
			resetChallenge();
		}, 1500);
	}
	
	function resetChallenge() {
		userAnswer = '';
		selectedOption = -1;
		isAnswering = false;
	}
	
	// Auto-reset when challenge type changes
	$effect(() => {
		challengeType;
		resetChallenge();
	});
</script>

<div class="bg-black/70 rounded-lg p-8 text-white min-h-96">
	<div class="text-center mb-8">
		<h2 class="text-2xl font-bold mb-4 text-yellow-400">
			Challenge #{challengeType + 1} - Level {level}
		</h2>
		<p class="text-lg mb-6">{currentChallenge.question}</p>
		
		{#if currentChallenge.type === 'color-word'}
			<div class="mb-6">
				<span class="text-6xl font-bold {currentChallenge.color}">
					{currentChallenge.word}
				</span>
			</div>
			<div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
				{#each currentChallenge.options || [] as option, i}
					<button
						onclick={() => {selectedOption = i; userAnswer = option; submitAnswer();}}
						class="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-all duration-200 
						       {selectedOption === i ? 'bg-blue-600 ring-2 ring-blue-400' : ''}"
						disabled={isAnswering}
					>
						{option}
					</button>
				{/each}
			</div>
			
		{:else if currentChallenge.type === 'math-confusion'}
			<div class="mb-6">
				<p class="text-sm text-gray-400 mb-4">
					Don't let your brain trick you! Remember order of operations.
				</p>
				<input
					bind:value={userAnswer}
					type="text"
					placeholder="Enter your answer"
					class="bg-gray-700 text-white p-3 rounded-lg text-center text-xl w-32"
					disabled={isAnswering}
				/>
			</div>
			<button
				onclick={submitAnswer}
				disabled={!userAnswer || isAnswering}
				class="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 
				       px-6 py-3 rounded-lg font-bold transition-all duration-200"
			>
				{isAnswering ? 'Checking...' : 'Submit'}
			</button>
			
		{:else if currentChallenge.type === 'pattern'}
			<div class="mb-6">
				<div class="flex justify-center space-x-4 text-4xl mb-6">
					{#each currentChallenge.pattern || [] as item}
						<span class="w-12 h-12 flex items-center justify-center">
							{item}
						</span>
					{/each}
				</div>
				<div class="grid grid-cols-4 gap-4 max-w-sm mx-auto">
					{#each currentChallenge.options || [] as option, i}
						<button
							onclick={() => {selectedOption = i; submitAnswer();}}
							class="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-3xl transition-all duration-200
							       {selectedOption === i ? 'bg-green-600 ring-2 ring-green-400' : ''}"
							disabled={isAnswering}
						>
							{option}
						</button>
					{/each}
				</div>
			</div>
			
		{:else if currentChallenge.type === 'word-trap'}
			<div class="mb-6">
				<p class="text-sm text-orange-400 mb-4">{currentChallenge.trap}</p>
				<div class="grid grid-cols-1 gap-3 max-w-md mx-auto">
					{#each currentChallenge.words || [] as word, i}
						<button
							onclick={() => {selectedOption = i; submitAnswer();}}
							class="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-all duration-200
							       {selectedOption === i ? 'bg-red-600 ring-2 ring-red-400' : ''}"
							disabled={isAnswering}
						>
							{word}
						</button>
					{/each}
				</div>
			</div>
			
		{:else if currentChallenge.type === 'paradox'}
			<div class="mb-6">
				<div class="bg-gray-800 p-4 rounded-lg mb-6 border-l-4 border-yellow-500">
					<p class="text-yellow-300 italic text-xl">"{currentChallenge.question}"</p>
				</div>
				<div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
					{#each currentChallenge.options || [] as option, i}
						<button
							onclick={() => {selectedOption = i; submitAnswer();}}
							class="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-all duration-200
							       {selectedOption === i ? 'bg-purple-600 ring-2 ring-purple-400' : ''}"
							disabled={isAnswering}
						>
							{option}
						</button>
					{/each}
				</div>
			</div>
			
		{:else if currentChallenge.type === 'memory-trap'}
			<div class="mb-6">
				<p class="text-sm text-cyan-400 mb-4">{currentChallenge.trap}</p>
				<div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
					{#each currentChallenge.options || [] as option, i}
						<button
							onclick={() => {selectedOption = i; submitAnswer();}}
							class="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-all duration-200
							       {selectedOption === i ? 'bg-cyan-600 ring-2 ring-cyan-400' : ''}"
							disabled={isAnswering}
						>
							{option}
						</button>
					{/each}
				</div>
			</div>
		{/if}
		
		{#if isAnswering}
			<div class="mt-6 text-yellow-400 animate-pulse">
				Processing your confusion level...
			</div>
		{/if}
	</div>
</div>
