import type { Challenge } from './challenges';

type Difficulty = 'easy' | 'medium' | 'hard';

const rnd = (n: number) => Math.floor(Math.random() * n);
const between = (a: number, b: number) => a + rnd(b - a + 1);
const choice = <T>(arr: readonly T[]): T => arr[rnd(arr.length)];

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = rnd(i + 1);
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/** Put the correct answer among distractors at a random position. */
function withOptions<T>(correct: T, distractors: T[], size = 4): { options: T[]; index: number } {
	const unique = [...new Set(distractors)].filter((d) => d !== correct);
	const options = shuffle([correct, ...unique.slice(0, size - 1)]);
	return { options, index: options.indexOf(correct) };
}

// Literal class names so Tailwind's scanner picks them up
const inks = [
	{ name: 'red', cls: 'text-red-500' },
	{ name: 'blue', cls: 'text-blue-500' },
	{ name: 'green', cls: 'text-green-500' },
	{ name: 'yellow', cls: 'text-yellow-400' },
	{ name: 'purple', cls: 'text-purple-500' },
	{ name: 'orange', cls: 'text-orange-500' },
	{ name: 'pink', cls: 'text-pink-500' }
];

function stroop(difficulty: Difficulty): Challenge {
	const [word, ink] = shuffle(inks);
	const askWord = difficulty !== 'easy' && Math.random() < 0.4;
	const correct = askWord ? word.name : ink.name;
	const others = shuffle(inks.map((i) => i.name));
	const { options } = withOptions(correct, others, difficulty === 'hard' ? 6 : 4);
	return {
		type: 'color-word',
		question: askWord ? 'What does the word SAY? (ignore the color)' : 'What COLOR is this word written in?',
		word: word.name.toUpperCase(),
		color: ink.cls,
		options,
		correctAnswer: correct,
		difficulty
	};
}

function math(difficulty: Difficulty): Challenge {
	let expr: string;
	let value: number;
	const a = between(2, 9), b = between(2, 9), c = between(2, 9), d = between(1, 9);
	if (difficulty === 'easy') {
		expr = `${a} + ${b} × ${c}`;
		value = a + b * c;
	} else if (difficulty === 'medium') {
		const t = rnd(2);
		expr = t ? `${a * c} ÷ ${c} + ${b} × ${d}` : `${a} × ${b} − ${c} × ${d}`;
		value = t ? a + b * d : a * b - c * d;
	} else {
		const t = rnd(3);
		if (t === 0) { expr = `(${a} + ${b}) × ${c} − ${d}`; value = (a + b) * c - d; }
		else if (t === 1) { expr = `${a} + ${b} × ${c}² − ${d}`; value = a + b * c * c - d; }
		else { expr = `${a * b * c} ÷ ${a} ÷ ${b} + ${d}`; value = c + d; }
	}
	return {
		type: 'math-confusion',
		question: `What is ${expr}?`,
		correctAnswer: String(value),
		explanation: `${expr} = ${value}`,
		difficulty
	};
}

function sequence(difficulty: Difficulty): Challenge {
	const kinds: (() => { seq: number[]; next: number; near: number[] })[] = [
		() => { const s = between(1, 20), st = between(2, 9); return { seq: [0, 1, 2, 3].map((i) => s + st * i), next: s + st * 4, near: [st + 1, st - 1, 1] }; },
		() => { const s = between(1, 4), r = between(2, 3); return { seq: [0, 1, 2, 3].map((i) => s * r ** i), next: s * r ** 4, near: [s * r ** 3 + r, s * r ** 4 - r, s * r ** 4 + s] }; },
		() => { const o = between(1, 5); return { seq: [0, 1, 2, 3].map((i) => (i + o) ** 2), next: (4 + o) ** 2, near: [(4 + o) ** 2 + 2, (4 + o) ** 2 - 3, (4 + o) ** 2 + (o + 3)] }; },
		() => { const x = between(1, 5), y = between(1, 5); const s = [x, y, x + y, x + 2 * y, 2 * x + 3 * y]; return { seq: s.slice(0, 4), next: s[4], near: [s[4] + 1, s[4] - 2, s[3] + s[3]] }; }
	];
	const pool = difficulty === 'easy' ? kinds.slice(0, 2) : kinds;
	const { seq, next, near } = choice(pool)();
	const { options, index } = withOptions(String(next), [...near.map((n) => String(next + n - near[0] + 1)), String(next + 2), String(next - 1), String(next + 5)].filter((v) => Number(v) > 0));
	return {
		type: 'pattern',
		question: 'Which number completes the sequence?',
		pattern: [...seq.map(String), '?'],
		options,
		correctAnswer: index,
		difficulty
	};
}

const lookalikes: [string, string][] = [
	['🙂', '🙃'], ['🐵', '🙈'], ['🔵', '🟦'], ['🌑', '🌒'], ['🍎', '🍅'], ['😀', '😃'],
	['🔹', '🔷'], ['🐶', '🐕'], ['🟠', '🟧'], ['⚪', '🔘'], ['🌕', '🌝'], ['🍊', '🍑']
];

function oddOne(difficulty: Difficulty): Challenge {
	const [base, odd] = Math.random() < 0.5 ? choice(lookalikes) : [...choice(lookalikes)].reverse();
	const size = difficulty === 'easy' ? 9 : difficulty === 'medium' ? 12 : 16;
	const at = rnd(size);
	return {
		type: 'odd-one-out',
		question: 'Spot the one that is different',
		options: Array.from({ length: size }, (_, i) => (i === at ? odd : base)),
		correctAnswer: at,
		difficulty
	};
}

function counting(difficulty: Difficulty): Challenge {
	const [target, ...rest] = shuffle(['🍎', '🍌', '🍇', '⭐', '🌙', '🐟', '🎈', '🍪', '🦋']).slice(0, 3);
	const len = difficulty === 'easy' ? 8 : difficulty === 'medium' ? 11 : 14;
	const pattern = Array.from({ length: len }, () => (Math.random() < 0.4 ? target : choice(rest)));
	const n = pattern.filter((p) => p === target).length;
	const { options, index } = withOptions(String(n), [String(n + 1), String(n - 1), String(n + 2), String(Math.max(0, n - 2))]);
	return {
		type: 'count',
		question: `How many ${target} are there?`,
		pattern,
		options,
		correctAnswer: index,
		difficulty
	};
}

const words = ['mirror', 'jungle', 'puzzle', 'riddle', 'shadow', 'planet', 'dragon', 'castle', 'rocket', 'bridge', 'thunder', 'whisper', 'monster', 'compass', 'gravity', 'illusion', 'paradox', 'enigma'];

function unscramble(difficulty: Difficulty): Challenge {
	const pool = words.filter((w) => (difficulty === 'easy' ? w.length <= 6 : difficulty === 'medium' ? w.length <= 7 : true));
	const word = choice(pool);
	let s = word;
	while (s === word) s = shuffle([...word]).join('');
	return {
		type: 'unscramble',
		question: `Unscramble this word: ${s.toUpperCase()}`,
		correctAnswer: word,
		difficulty
	};
}

const generators = [stroop, math, sequence, oddOne, counting, unscramble];

/** A freshly generated, practically unique challenge. */
export function generateChallenge(difficulty: Difficulty): Challenge {
	return choice(generators)(difficulty);
}
