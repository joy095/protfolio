<script lang="ts">
	import '@fontsource-variable/space-grotesk';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { initializeLenis } from '$lib/scroll';

	let numberOfLines = 11;
	let showSplash = true; // Initialize to true to show splash initially
	let isContentVisible = false; // Initialize to false to hide content initially

	// Define a key for localStorage to track if splash has been shown
	const HAS_SEEN_SPLASH_KEY = 'hasSeenSplash';
	const SPLASH_SCREEN_DURATION = 3000; // Duration for the splash screen
	const CONTENT_FADE_IN_DELAY = 500; // Delay after splash hides before content shows

	onMount(() => {
		initializeLenis();
		// Check if the user has seen the splash screen before in localStorage
		const hasSeenSplash = localStorage.getItem(HAS_SEEN_SPLASH_KEY);

		if (hasSeenSplash) {
			// If seen before, bypass the splash screen
			showSplash = false;
			isContentVisible = true; // Show content immediately
		} else {
			// If it's the first visit, show the splash screen
			setTimeout(() => {
				showSplash = false; // Hide splash after its duration
				// Set the flag in localStorage so next time there's no splash
				localStorage.setItem(HAS_SEEN_SPLASH_KEY, 'true');

				// After the splash hides, introduce a slight delay before showing main content
				setTimeout(() => {
					isContentVisible = true;
				}, CONTENT_FADE_IN_DELAY);
			}, SPLASH_SCREEN_DURATION);
		}
	});
</script>

<main class="background" style="--number-of-lines: {numberOfLines}">
	<div class="mt-20">
		<slot />
	</div>
</main>

{#if showSplash}
	<SplashScreen />
{:else}
	<Header />
	<Footer />
	{#if isContentVisible}
		<Cursor />
	{/if}
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	:global(html) {
		font-family: 'Space Grotesk Variable', sans-serif;
		color: #151515;
		background-color: #f1efed;
		letter-spacing: -0.02em;

		/* Background container */
		.background {
			position: relative;
			min-height: 100vh;
			overflow: hidden;
		}

		/* Background lines */
		.background::before {
			content: '';
			position: absolute;
			top: 0;
			left: -5vw;
			right: 0;
			bottom: 0;
			background-image: repeating-linear-gradient(
				to right,
				transparent,
				transparent calc((100% - 4vw) / var(--number-of-lines) - 1px),
				rgba(204, 204, 204, 0.3) calc((100% - 4vw) / var(--number-of-lines) - 1px),
				rgba(204, 204, 204, 0.3) calc((100% - 4vw) / var(--number-of-lines))
			);
			z-index: -1;
		}
	}
</style>
