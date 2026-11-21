<script lang="ts">
	let { onStart }: {
		onStart: () => void;
	} = $props();
	
	let glitchActive = $state(false);
	
	// Create a glitch effect every few seconds
	$effect(() => {
		const interval = setInterval(() => {
			glitchActive = true;
			setTimeout(() => {
				glitchActive = false;
			}, 200);
		}, 3000);
		
		return () => clearInterval(interval);
	});
</script>

<div class="flex flex-col items-center justify-center min-h-screen text-white p-8">
	<div class="text-center max-w-2xl">
		<h1 class="text-6xl md:text-8xl font-bold mb-8 {glitchActive ? 'animate-pulse text-red-500' : 'text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600'}">
			ETERNAL
		</h1>
		<h2 class="text-4xl md:text-6xl font-bold mb-12 {glitchActive ? 'animate-bounce text-green-400' : 'text-yellow-400'}">
			CONFUSION
		</h2>
		
		<p class="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed">
			Welcome to a world where nothing is as it seems. Navigate through mind-bending puzzles,
			solve impossible riddles, and survive the eternal confusion that awaits you.
		</p>
		
		<div class="space-y-4 mb-12">
			<p class="text-sm text-gray-400">🧠 Challenge your perception</p>
			<p class="text-sm text-gray-400">🌀 Reality will shift around you</p>
			<p class="text-sm text-gray-400">⚡ Quick thinking required</p>
			<p class="text-sm text-gray-400">💀 Three lives to survive</p>
		</div>
		
		<button 
			onclick={onStart}
			class="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
			       text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-300 
			       transform hover:scale-105 hover:shadow-2xl shadow-lg"
		>
			BEGIN THE CONFUSION
		</button>
		
		<div class="mt-8 text-xs text-gray-500">
			Warning: This game may cause temporary disorientation and existential questioning
		</div>
	</div>
	
	<!-- Floating particles effect -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		{#each Array(20) as _, i}
			<div 
				class="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 2}s;"
			></div>
		{/each}
	</div>
</div>
