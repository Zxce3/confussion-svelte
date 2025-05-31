<script lang="ts">
	import ConfusionChallenge from './ConfusionChallenge.svelte';
	
	let { 
		level, 
		score, 
		lives, 
		confusionLevel, 
		maxConfusion,
		onLoseLife,
		onAddConfusion 
	} = $props<{
		level: number;
		score: number;
		lives: number;
		confusionLevel: number;
		maxConfusion: number;
		onLoseLife: () => void;
		onAddConfusion: (amount: number) => void;
	}>();
	
	let timeLeft = $state(30);
	let currentChallenge = $state(0);
	let isFlashing = $state(false);
	
	// Timer effect
	$effect(() => {
		if (timeLeft <= 0) {
			onLoseLife();
			timeLeft = 30;
			return;
		}
		
		const timer = setTimeout(() => {
			timeLeft--;
			if (timeLeft <= 5) {
				isFlashing = true;
				setTimeout(() => isFlashing = false, 500);
			}
		}, 1000);
		
		return () => clearTimeout(timer);
	});
	
	// Progress percentage
	let progressPercent = $derived((confusionLevel / maxConfusion) * 100);
	
	function handleChallengeComplete(points: number) {
		onAddConfusion(points);
		currentChallenge = (currentChallenge + 1) % 5;
		timeLeft = Math.max(15, 30 - level * 2); // Decrease time as level increases
	}
	
	function handleChallengeFailed() {
		onLoseLife();
		timeLeft = 30;
	}
</script>

<div class="relative w-full min-h-screen p-4 text-white">
	<!-- HUD -->
	<div class="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-50 p-4">
		<div class="flex justify-between items-center max-w-6xl mx-auto">
			<div class="flex space-x-6">
				<div class="text-lg font-bold">Level: <span class="text-yellow-400">{level}</span></div>
				<div class="text-lg font-bold">Score: <span class="text-green-400">{score}</span></div>
				<div class="text-lg font-bold">Lives: 
					<span class="text-red-400">
						{'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}
					</span>
				</div>
			</div>
			
			<div class="text-lg font-bold {isFlashing ? 'text-red-500 animate-pulse' : 'text-white'}">
				Time: {timeLeft}s
			</div>
		</div>
		
		<!-- Confusion progress bar -->
		<div class="mt-2 max-w-6xl mx-auto">
			<div class="text-sm mb-1">Confusion Level: {confusionLevel}/{maxConfusion}</div>
			<div class="w-full bg-gray-700 rounded-full h-3">
				<div 
					class="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
					style="width: {progressPercent}%"
				></div>
			</div>
		</div>
	</div>
	
	<!-- Main game area -->
	<div class="pt-24 flex items-center justify-center min-h-screen">
		<div class="w-full max-w-4xl">
			<ConfusionChallenge 
				{level}
				challengeType={currentChallenge}
				onComplete={handleChallengeComplete}
				onFailed={handleChallengeFailed}
			/>
		</div>
	</div>
	
	<!-- Background effects -->
	<div class="fixed inset-0 pointer-events-none overflow-hidden">
		{#each Array(level * 2) as _, i}
			<div 
				class="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 3}s; animation-duration: {2 + Math.random() * 2}s;"
			></div>
		{/each}
	</div>
</div>
