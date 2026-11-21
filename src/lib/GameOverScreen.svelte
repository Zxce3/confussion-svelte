<script lang="ts">
	let { score, level, onRestart }: {
		score: number;
		level: number;
		onRestart: () => void;
	} = $props();
	
	let confusionRating = $derived(
		score < 500 ? "Mildly Bewildered" :
		score < 1000 ? "Thoroughly Perplexed" : 
		score < 2000 ? "Completely Baffled" :
		score < 3000 ? "Utterly Discombobulated" :
		"Eternally Confused Master"
	);
	
	let encouragement = $derived.by(() => {
		const messages = [
			"Your brain fought valiantly against the confusion!",
			"Reality bent around you, but you persevered!",
			"The confusion consumed you, but wisdom was gained!",
			"In confusion, we find clarity... or do we?",
			"You've graduated from the University of Bewilderment!",
			"The maze of minds has claimed another soul!",
			"Confusion is just another word for learning!",
			"You've earned a PhD in Perplexity!"
		];
		return messages[Math.floor(Math.random() * messages.length)];
	});
	
	let glitchText = $state(false);
	
	$effect(() => {
		const interval = setInterval(() => {
			glitchText = true;
			setTimeout(() => glitchText = false, 300);
		}, 2000);
		
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-white p-8">
	<div class="text-center max-w-2xl">
		<h1 class="text-6xl md:text-8xl font-bold mb-8 {glitchText ? 'text-red-500 animate-pulse' : 'text-transparent bg-clip-text bg-linear-to-r from-red-400 to-pink-600'}">
			GAME OVER
		</h1>
		
		<div class="bg-black/50 rounded-lg p-8 mb-8">
			<h2 class="text-3xl font-bold mb-6 text-yellow-400">Confusion Report</h2>
			
			<div class="space-y-4 text-lg">
				<div class="flex justify-between items-center">
					<span>Final Score:</span>
					<span class="text-green-400 font-bold text-2xl">{score.toLocaleString()}</span>
				</div>
				
				<div class="flex justify-between items-center">
					<span>Levels Survived:</span>
					<span class="text-blue-400 font-bold text-2xl">{level}</span>
				</div>
				
				<div class="flex justify-between items-center">
					<span>Confusion Rating:</span>
					<span class="text-purple-400 font-bold">{confusionRating}</span>
				</div>
				
				<div class="border-t border-gray-600 pt-4 mt-6">
					<p class="text-gray-300 italic">{encouragement}</p>
				</div>
			</div>
		</div>
		
		<div class="space-y-4 mb-8">
			<div class="grid grid-cols-2 gap-4 text-sm text-gray-400">
				<div>🧠 Mind = Blown</div>
				<div>🌀 Reality = Questioned</div>
				<div>⚡ Neurons = Fired</div>
				<div>🎯 Logic = Defied</div>
			</div>
		</div>
		
		<button 
			onclick={onRestart}
			class="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
			       text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 
			       transform hover:scale-105 hover:shadow-2xl shadow-lg mb-4"
		>
			EMBRACE THE CONFUSION AGAIN
		</button>
		
		<p class="text-xs text-gray-500">
			"The only true wisdom is in knowing you know nothing... especially here."
		</p>
	</div>
	
	<!-- Falling confusion particles -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		{#each Array(30) as _, i}
			<div 
				class="absolute text-2xl opacity-30 animate-bounce"
				style="left: {Math.random() * 100}%; top: -10%; animation-delay: {Math.random() * 5}s; animation-duration: {3 + Math.random() * 3}s;"
			>
				{['🤔', '😵', '🤯', '😵‍💫', '🧠', '❓', '❗', '💭', '🌀'][Math.floor(Math.random() * 9)]}
			</div>
		{/each}
	</div>
</div>
