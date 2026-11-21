import type { Challenge } from './challenges';

const wt = (words: string[], correctAnswer: number, trap: string, difficulty: Challenge['difficulty']): Challenge => ({
	type: 'word-trap',
	question: 'Which word does NOT belong?',
	words,
	correctAnswer,
	trap,
	difficulty
});

const wordTraps: Challenge[] = [
	wt(['Piano', 'Guitar', 'Violin', 'Drum', 'Hammer'], 4, 'One of these makes noise, but not music.', 'easy'),
	wt(['Paris', 'London', 'Tokyo', 'Nile', 'Rome'], 3, 'Four are cities...', 'easy'),
	wt(['Square', 'Circle', 'Triangle', 'Cube', 'Rectangle'], 3, 'Think dimensions.', 'medium'),
	wt(['Mercury', 'Venus', 'Pluto', 'Mars', 'Earth'], 2, 'The solar system changed its mind in 2006.', 'medium'),
	wt(['Whale', 'Dolphin', 'Shark', 'Seal', 'Otter'], 2, 'Not everything in the water is the same kind of animal.', 'hard'),
	wt(['Spider', 'Ant', 'Beetle', 'Bee', 'Fly'], 0, 'Count the legs.', 'hard'),
	wt(['Tomato', 'Cucumber', 'Pepper', 'Pumpkin', 'Potato'], 4, 'Botanically, which one is not a fruit?', 'hard'),
	wt(['Sword', 'Spear', 'Bow', 'Shield', 'Axe'], 3, 'Offence versus defence.', 'hard')
];

const logic = (question: string, options: string[], correctAnswer: number, explanation: string, difficulty: Challenge['difficulty']): Challenge => ({
	type: 'logic',
	question,
	options,
	correctAnswer,
	explanation,
	difficulty
});

const logicPuzzles: Challenge[] = [
	logic('You overtake the runner in 2nd place. What place are you in now?', ['1st', '2nd', '3rd', 'Last'], 1, 'You took their spot: 2nd.', 'easy'),
	logic('Which weighs more: a kilo of feathers or a kilo of steel?', ['Feathers', 'Steel', 'They weigh the same', 'Depends on the wind'], 2, 'A kilo is a kilo.', 'easy'),
	logic('A farmer has 17 sheep. All but 9 run away. How many are left?', ['8', '9', '17', '0'], 1, '"All but 9" means 9 remain.', 'medium'),
	logic('How many months have 28 days?', ['1', '2', '12', '6'], 2, 'Every month has at least 28 days.', 'medium'),
	logic('How many animals of each kind did Moses take on the ark?', ['2', '1', '0', '7'], 2, 'It was Noah, not Moses.', 'medium'),
	logic("A rooster lays an egg on a barn's peak. Which way does it roll?", ['Left', 'Right', 'Down', "Roosters don't lay eggs"], 3, 'Roosters never lay eggs.', 'medium'),
	logic("Mary's mother has five daughters: Nana, Nene, Nini, Nono and...?", ['Nunu', 'Mary', 'Nina', 'Nene'], 1, 'The sentence already named her: Mary.', 'medium'),
	logic('5 machines make 5 widgets in 5 minutes. How long do 100 machines need for 100 widgets?', ['100 minutes', '5 minutes', '20 minutes', '1 minute'], 1, 'Each machine makes one widget per 5 minutes.', 'hard'),
	logic('A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. The ball costs?', ['10¢', '5¢', '15¢', '1¢'], 1, 'Ball 5¢ + bat $1.05 = $1.10.', 'hard'),
	logic('Lily pads double every day and cover a lake on day 48. When was it half covered?', ['Day 24', 'Day 47', 'Day 46', 'Day 12'], 1, 'One doubling before full.', 'hard'),
	logic('What can you hold in your right hand but never in your left?', ['Your left elbow', 'Your right elbow', 'A glove', 'A coin'], 0, 'Your left hand cannot reach your left elbow.', 'hard'),
	logic('Which is correct: "the yolk of an egg ___ white"?', ['are', 'is', 'Both are correct', 'Neither: yolks are yellow'], 3, 'Yolks are yellow!', 'hard')
];

const flash = (pattern: string[], question: string, options: string[], correctAnswer: number, difficulty: Challenge['difficulty']): Challenge => ({
	type: 'memory-flash',
	question,
	pattern,
	options,
	correctAnswer,
	difficulty
});

const memoryFlash: Challenge[] = [
	flash(['🍎', '🚗', '🌙', '🎸'], 'What was the 3rd item?', ['🍎', '🚗', '🎸', '🌙'], 3, 'easy'),
	flash(['🌞', '🌧️', '❄️', '🌪️'], 'Which one came 2nd?', ['🌞', '❄️', '🌧️', '🌪️'], 2, 'easy'),
	flash(['🐶', '🐱', '🐭', '🐹', '🐰'], 'What came right after 🐭?', ['🐱', '🐹', '🐰', '🐶'], 1, 'medium'),
	flash(['🔴', '🟢', '🔵', '🟡', '🟣', '🟠'], 'What was 2nd from the end?', ['🟡', '🟣', '🟠', '🔵'], 1, 'hard'),
	flash(['7', '3', '9', '1', '5'], 'What is the sum of the first and last number?', ['10', '12', '14', '8'], 1, 'hard')
];

const oddOne = (grid: string[], correctAnswer: number, difficulty: Challenge['difficulty']): Challenge => ({
	type: 'odd-one-out',
	question: 'Spot the one that is different',
	options: grid,
	correctAnswer,
	difficulty
});

const oddOnes: Challenge[] = [
	oddOne(['🙂', '🙂', '🙂', '🙂', '🙃', '🙂', '🙂', '🙂', '🙂'], 4, 'easy'),
	oddOne(['🐵', '🐵', '🐵', '🐵', '🐵', '🙈', '🐵', '🐵', '🐵'], 5, 'easy'),
	oddOne(['🔵', '🔵', '🔵', '🔵', '🔵', '🔵', '🔵', '🟦', '🔵'], 7, 'medium'),
	oddOne(['🕐', '🕐', '🕑', '🕐', '🕐', '🕐', '🕐', '🕐', '🕐'], 2, 'medium'),
	oddOne(['🌑', '🌑', '🌑', '🌒', '🌑', '🌑', '🌑', '🌑', '🌑'], 3, 'hard'),
	oddOne(['🔹', '🔹', '🔹', '🔷', '🔹', '🔹', '🔹', '🔹', '🔹'], 3, 'hard')
];

const count = (pattern: string[], question: string, options: string[], correctAnswer: number, difficulty: Challenge['difficulty']): Challenge => ({
	type: 'count',
	question,
	pattern,
	options,
	correctAnswer,
	difficulty
});

const counts: Challenge[] = [
	count(['🍎', '🍌', '🍎', '🍇', '🍎', '🍌', '🍎'], 'How many 🍎 are there?', ['3', '4', '5', '6'], 1, 'easy'),
	count(['⭐', '🌙', '⭐', '⭐', '🌙', '☀️', '⭐', '🌙', '⭐', '⭐'], 'How many ⭐ are there?', ['5', '6', '7', '8'], 1, 'medium'),
	count(['🔺', '🔻', '🔺', '🔺', '🔻', '🔺', '🔻', '🔻'], 'How many more 🔺 than 🔻?', ['0', '1', '2', '4'], 0, 'medium'),
	count(['🐟', '🐠', '🐟', '🐡', '🐟', '🐠', '🐟', '🐡', '🐟', '🐠', '🐟'], 'How many are NOT 🐟?', ['4', '5', '6', '3'], 1, 'hard')
];

const txt = (type: string, question: string, correctAnswer: string, difficulty: Challenge['difficulty'], acceptable?: string[], explanation?: string): Challenge => ({
	type,
	question,
	correctAnswer,
	acceptable,
	explanation,
	difficulty
});

const riddles: Challenge[] = [
	txt('riddle', "What has keys but can't open locks?", 'piano', 'easy', ['keyboard']),
	txt('riddle', 'What gets wetter the more it dries?', 'towel', 'easy'),
	txt('riddle', 'I speak without a mouth and hear without ears. What am I?', 'echo', 'medium'),
	txt('riddle', 'What has hands but cannot clap?', 'clock', 'easy', ['watch']),
	txt('riddle', 'What is full of holes but still holds water?', 'sponge', 'medium'),
	txt('riddle', 'The more you take, the more you leave behind. What am I?', 'footsteps', 'hard', ['steps', 'footstep', 'footprints']),
	txt('riddle', 'What word becomes shorter when you add two letters to it?', 'short', 'hard'),
	txt('riddle', 'What comes once in a minute, twice in a moment, but never in a thousand years?', 'm', 'hard', ['the letter m', 'letter m'])
];

const scrambles: Challenge[] = [
	['PLEAP', 'apple', 'easy'],
	['TRAEW', 'water', 'easy'],
	['OLGIC', 'logic', 'easy'],
	['DIRDEL', 'riddle', 'medium'],
	['ZZPLUE', 'puzzle', 'medium'],
	['NOCIFUSON', 'confusion', 'medium'],
	['DRAXOPA', 'paradox', 'hard'],
	['ILLSOUNI', 'illusion', 'hard']
].map(([s, a, d]) => txt('unscramble', `Unscramble this word: ${s}`, a, d as Challenge['difficulty']));

const maths: Challenge[] = [
	['What is 7 - 2 × 3?', '1', '7 - 6 = 1', 'easy'],
	['What is 9 - 3 ÷ 3 + 1?', '9', '9 - 1 + 1 = 9', 'easy'],
	['What is 100 ÷ 5 ÷ 2?', '10', '(100 ÷ 5) ÷ 2 = 10', 'medium'],
	['What is (8 + 4) ÷ 3 × 2?', '8', '12 ÷ 3 × 2 = 8', 'medium'],
	['What is 2 × 3² − 4?', '14', '2 × 9 − 4 = 14', 'hard'],
	['What is 6 ÷ 2 × (1 + 2)?', '9', '3 × 3 = 9 (left to right!)', 'hard']
].map(([q, a, e, d]) => txt('math-confusion', q, a, d as Challenge['difficulty'], undefined, e));

export const moreChallenges: Challenge[] = [
	...wordTraps,
	...logicPuzzles,
	...memoryFlash,
	...oddOnes,
	...counts,
	...riddles,
	...scrambles,
	...maths
];
