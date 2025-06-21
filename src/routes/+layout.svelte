<script lang="ts">
	import '@fontsource-variable/space-grotesk';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { initializeLenis } from '$lib/scroll';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import { headerAnimationComplete } from '$lib/stores/store';
	import Footer from '$lib/components/Footer.svelte';

	let numberOfLines = 11;
	let showSplash = false; // Initialize to false by default on SSR
	let isContentVisible = false; // Initialize to false to hide content initially

	// Define a key for local storage
	const HAS_VISITED_KEY = 'hasVisitedBefore';

	if (browser) {
		// This logic now runs when the component is first created on the client
		// (before onMount), ensuring splash state is set immediately.
		const hasVisited = localStorage.getItem(HAS_VISITED_KEY);

		if (!hasVisited) {
			// First visit: show splash and set flag
			showSplash = true;
			isContentVisible = false; // Ensure content is hidden
			localStorage.setItem(HAS_VISITED_KEY, 'true'); // Mark as visited
		} else {
			// Subsequent visits: skip splash, show content immediately
			showSplash = false;
			isContentVisible = true;
		}

		onMount(() => {
			initializeLenis(); // Initialize Lenis on mount

			if (showSplash) {
				// Only hide splash after 3 seconds if it was shown
				setTimeout(() => {
					showSplash = false;
				}, 3000);
			}

			// Subscribe to headerAnimationComplete
			headerAnimationComplete.subscribe((isComplete: boolean) => {
				// Only update isContentVisible if splash is no longer shown
				if (!showSplash) {
					isContentVisible = isComplete;
				}
			});

			// --- NEW: Event listener to clear localStorage on page exit ---
			const handleBeforeUnload = () => {
				console.log('User is exiting the page. Clearing HAS_VISITED_KEY.');
				localStorage.removeItem(HAS_VISITED_KEY); // Removes the item
				// Or if you prefer to explicitly set it to 'false':
				// localStorage.setItem(HAS_VISITED_KEY, 'false');
			};

			window.addEventListener('beforeunload', handleBeforeUnload);

			// --- Cleanup function for onMount ---
			// This ensures the event listener is removed when the component is destroyed,
			// preventing memory leaks if this layout were ever unmounted dynamically.
			return () => {
				window.removeEventListener('beforeunload', handleBeforeUnload);
			};
		});
	}
</script>

<main class="background" style="--number-of-lines: {numberOfLines}">
	<div class="mt-20">
		<slot />
	</div>
</main>

{#if browser}
	{#if showSplash}
		<SplashScreen />
	{:else}
		<Header />
		{#if isContentVisible}
			<Cursor />
			<Footer />
		{/if}
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
