// Challenge data types
export interface Challenge {
	type: string;
	question: string;
	correctAnswer: string | number;
	options?: string[];
	word?: string;
	color?: string;
	wrongAnswer?: string;
	explanation?: string;
	pattern?: string[];
	words?: string[];
	trap?: string;
	difficulty?: 'easy' | 'medium' | 'hard';
	points?: number;
}

// Color-Word Confusion challenges (Stroop Test style)
const colorWordChallenges: Challenge[] = [
	{
		type: 'color-word',
		question: 'What COLOR is this word written in?',
		word: 'BLUE',
		color: 'text-red-500',
		correctAnswer: 'red',
		options: ['red', 'blue', 'green', 'yellow'],
		difficulty: 'easy'
	},
	{
		type: 'color-word',
		question: 'What COLOR is this word written in?',
		word: 'GREEN',
		color: 'text-purple-500',
		correctAnswer: 'purple',
		options: ['green', 'purple', 'orange', 'blue'],
		difficulty: 'easy'
	},
	{
		type: 'color-word',
		question: 'What COLOR is this word written in?',
		word: 'YELLOW',
		color: 'text-blue-500',
		correctAnswer: 'blue',
		options: ['yellow', 'red', 'blue', 'green'],
		difficulty: 'medium'
	},
	{
		type: 'color-word',
		question: 'What COLOR is this word written in?',
		word: 'RED',
		color: 'text-orange-500',
		correctAnswer: 'orange',
		options: ['red', 'orange', 'pink', 'yellow'],
		difficulty: 'medium'
	}
];

// Math confusion challenges
const mathChallenges: Challenge[] = [
	{
		type: 'math-confusion',
		question: 'What is 5 + 3 × 2? (Order matters!)',
		correctAnswer: '11',
		wrongAnswer: '16',
		explanation: '5 + (3 × 2) = 5 + 6 = 11',
		difficulty: 'easy'
	},
	{
		type: 'math-confusion',
		question: 'What is 12 ÷ 3 + 2 × 4?',
		correctAnswer: '12',
		wrongAnswer: '8',
		explanation: '(12 ÷ 3) + (2 × 4) = 4 + 8 = 12',
		difficulty: 'medium'
	},
	{
		type: 'math-confusion',
		question: 'What is 10 - 4 × 2 + 1?',
		correctAnswer: '3',
		wrongAnswer: '13',
		explanation: '10 - (4 × 2) + 1 = 10 - 8 + 1 = 3',
		difficulty: 'medium'
	},
	{
		type: 'math-confusion',
		question: 'What is 2 + 3 × 4 - 1?',
		correctAnswer: '13',
		wrongAnswer: '19',
		explanation: '2 + (3 × 4) - 1 = 2 + 12 - 1 = 13',
		difficulty: 'hard'
	}
];

// Pattern recognition challenges
const patternChallenges: Challenge[] = [
	{
		type: 'pattern',
		question: 'Which shape completes the pattern?',
		pattern: ['🔴', '🟦', '🔴', '🟦', '🔴', '?'],
		options: ['🟦', '🔴', '🟨', '🟩'],
		correctAnswer: 0,
		difficulty: 'easy'
	},
	{
		type: 'pattern',
		question: 'Which shape completes the pattern?',
		pattern: ['⭐', '⭐', '🔺', '⭐', '⭐', '🔺', '⭐', '⭐', '?'],
		options: ['⭐', '🔺', '🟦', '🔴'],
		correctAnswer: 1,
		difficulty: 'medium'
	},
	{
		type: 'pattern',
		question: 'Which number completes the pattern?',
		pattern: ['2', '4', '8', '16', '?'],
		options: ['24', '32', '20', '18'],
		correctAnswer: 1,
		difficulty: 'medium'
	},
	{
		type: 'pattern',
		question: 'Which shape completes the pattern?',
		pattern: ['🟩', '🟨', '🟩', '🟨', '🟨', '🟩', '🟨', '🟨', '🟨', '?'],
		options: ['🟩', '🟨', '🔴', '🟦'],
		correctAnswer: 0,
		difficulty: 'hard'
	}
];

// Word association trap challenges
const wordTrapChallenges: Challenge[] = [
	{
		type: 'word-trap',
		question: 'Which word does NOT belong?',
		words: ['Apple', 'Banana', 'Orange', 'Carrot', 'Grape'],
		correctAnswer: 3, // Carrot (vegetable among fruits)
		trap: 'Many will think Orange because it\'s also a color!',
		difficulty: 'easy'
	},
	{
		type: 'word-trap',
		question: 'Which word does NOT belong?',
		words: ['Dog', 'Cat', 'Bird', 'Fish', 'Chair'],
		correctAnswer: 4, // Chair (furniture among animals)
		trap: 'All others are living creatures!',
		difficulty: 'easy'
	},
	{
		type: 'word-trap',
		question: 'Which word does NOT belong?',
		words: ['Tuesday', 'March', 'Friday', 'Monday', 'Sunday'],
		correctAnswer: 1, // March (month among days)
		trap: 'Look for the odd one out!',
		difficulty: 'medium'
	},
	{
		type: 'word-trap',
		question: 'Which word does NOT belong?',
		words: ['Happy', 'Sad', 'Angry', 'Blue', 'Excited'],
		correctAnswer: 3, // Blue (color among emotions)
		trap: 'Blue can be an emotion AND a color!',
		difficulty: 'hard'
	}
];

// Logic paradox challenges
const paradoxChallenges: Challenge[] = [
	{
		type: 'paradox',
		question: 'This statement is false. Is this statement true or false?',
		options: ['True', 'False', 'Both', 'Neither'],
		correctAnswer: 3, // Neither - it's a paradox
		explanation: 'This is a classic liar paradox!',
		difficulty: 'hard'
	},
	{
		type: 'paradox',
		question: 'Can an unstoppable force move an immovable object?',
		options: ['Yes', 'No', 'Both exist', 'Neither can exist'],
		correctAnswer: 3, // Neither can exist in the same universe
		explanation: 'If one exists, the other cannot!',
		difficulty: 'hard'
	},
	{
		type: 'paradox',
		question: 'If you always lie, and you say "I am lying", are you telling the truth?',
		options: ['Yes', 'No', 'Paradox', 'Sometimes'],
		correctAnswer: 2, // Paradox
		explanation: 'Classic self-reference paradox!',
		difficulty: 'hard'
	}
];

// Memory confusion challenges
const memoryChallenges: Challenge[] = [
	{
		type: 'memory-trap',
		question: 'How many letters are in the word "CONFUSION"?',
		options: ['8', '9', '10', '7'],
		correctAnswer: 1, // 9 letters: C-O-N-F-U-S-I-O-N
		trap: 'Count carefully!',
		difficulty: 'easy'
	},
	{
		type: 'memory-trap',
		question: 'What color was the previous challenge button?',
		options: ['Red', 'Blue', 'Green', 'I don\'t remember'],
		correctAnswer: 3, // This requires memory from previous challenge
		trap: 'Were you paying attention?',
		difficulty: 'medium'
	}
];

// Combine all challenges
export const allChallenges: Challenge[] = [
	...colorWordChallenges,
	...mathChallenges,
	...patternChallenges,
	...wordTrapChallenges,
	...paradoxChallenges,
	...memoryChallenges
];

// Helper functions
export function getRandomChallenge(): Challenge {
	const randomIndex = Math.floor(Math.random() * allChallenges.length);
	return allChallenges[randomIndex];
}

export function getChallengesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Challenge[] {
	return allChallenges.filter(challenge => challenge.difficulty === difficulty);
}

export function getChallengesByType(type: string): Challenge[] {
	return allChallenges.filter(challenge => challenge.type === type);
}

export function getRandomChallengeByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Challenge {
	const filteredChallenges = getChallengesByDifficulty(difficulty);
	const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
	return filteredChallenges[randomIndex];
}

export function getRandomChallengeByType(type: string): Challenge {
	const filteredChallenges = getChallengesByType(type);
	const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
	return filteredChallenges[randomIndex];
}

// Shuffle function for randomizing challenge order
export function shuffleChallenges(challenges: Challenge[]): Challenge[] {
	const shuffled = [...challenges];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
