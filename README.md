# Eternal Confusion

A fast, mind-bending puzzle game that tests your perception. Beat the clock, dodge the traps, and survive as many levels as you can with three lives.

Built with **Svelte 5** (runes), **SvelteKit 3**, **Tailwind CSS 4** and **Vite 8**, and shipped as a fully static site.

## Gameplay

- Every round throws a different challenge at you, against a countdown that shrinks as you level up.
- Wrong answers and timeouts cost a life. Lose all three and it's game over.
- Correct answers fill the level bar and earn points. Fill the bar to advance.
- Difficulty ramps up: easy at the start, medium from level 5, hard from level 10, and harder levels also draw from easier questions.
- Your best score is saved in the browser.

### Challenge types

| Type | What you do |
| --- | --- |
| Stroop trap | Name the ink colour, or what the word says, while the other fights you |
| Mental math | Order-of-operations traps, typed answer |
| Pattern | Complete number and emoji sequences |
| Word trap | Spot the word that doesn't belong |
| Brain teaser / paradox | Classic trick questions and logical paradoxes |
| Memory flash | Memorise a sequence that disappears, then answer questions about it |
| Odd one out | Find the lookalike emoji in a grid |
| Count | Count the target emoji in a crowd |
| Riddle | Type the answer to a classic riddle |
| Unscramble | Rearrange the letters into a word |

About half of all rounds are generated procedurally (Stroop, arithmetic, sequences, odd-one-out, counting, unscramble), the rest come from a hand-written pool of 70+ questions.

### Controls

| Key | Action |
| --- | --- |
| `1`-`9` | Pick an option |
| `Enter` | Start / retry / submit a typed answer |

## Development

Requires [Bun](https://bun.sh) (or Node.js 20+ with your package manager of choice).

```bash
bun install
bun run dev        # start the dev server
bun run check      # type-check with svelte-check
bun run build      # static build into ./build
bun run preview    # preview the production build
```

> TypeScript is pinned to `^6`: SvelteKit 3 still needs the TypeScript compiler API, which TypeScript 7 no longer ships.

## Project structure

```
src/
  lib/
    EternalConfusion.svelte   game state: score, lives, levels, best score
    GameBoard.svelte          HUD, countdown and round flow
    ConfusionChallenge.svelte renders and scores every challenge type
    challenges.ts             challenge types, hand-written pool, picker
    moreChallenges.ts         extended hand-written challenges
    generators.ts             procedural challenge generators
    StartScreen.svelte
    GameOverScreen.svelte
  routes/                     single prerendered page
```

### Adding a challenge

Add an entry to `src/lib/moreChallenges.ts` (or a generator to `src/lib/generators.ts`). Multiple-choice challenges use `options` with `correctAnswer` as the index; typed ones use a string `correctAnswer` plus optional `acceptable` alternatives.

## Deployment

`adapter-static` prerenders the site to `./build`, which can be hosted on any static host (GitHub Pages, Cloudflare Pages, Netlify, ...).

## License

No license file is included yet.
