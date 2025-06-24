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
	let isContentVisible = false; // Controls visibility of all content

	// Define key for localStorage
	const HAS_VISITED_KEY = 'hasVisitedBefore';

	if (browser) {
		// Check localStorage for visit state
		const hasVisited = localStorage.getItem(HAS_VISITED_KEY);

		if (!hasVisited) {
			// First visit: show splash, hide all content
			showSplash = true;
			isContentVisible = false;
			localStorage.setItem(HAS_VISITED_KEY, 'true'); // Mark as visited
		} else {
			// Subsequent visits: skip splash, show content immediately
			showSplash = false;
			isContentVisible = true;
		}

		onMount(() => {
			initializeLenis(); // Initialize Lenis on mount

			if (showSplash) {
				// Hide splash after 3 seconds and show content
				setTimeout(() => {
					showSplash = false;
					isContentVisible = true;
				}, 3000);
			}

			// Subscribe to headerAnimationComplete
			headerAnimationComplete.subscribe((isComplete: boolean) => {
				// Update isContentVisible only if splash is no longer shown
				if (!showSplash) {
					isContentVisible = isComplete;
				}
			});

			// Event listener to clear HAS_VISITED_KEY on page exit
			const handleBeforeUnload = () => {
				console.log('User is exiting the page. Clearing HAS_VISITED_KEY.');
				localStorage.removeItem(HAS_VISITED_KEY); // Clear visit flag
			};

			window.addEventListener('beforeunload', handleBeforeUnload);

			return () => {
				window.removeEventListener('beforeunload', handleBeforeUnload);
			};
		});
	}
</script>

{#if showSplash}
	<SplashScreen />
{:else if isContentVisible}
	<main class="background" style="--number-of-lines: {numberOfLines}">
		<Header />
		<div class="mt-20">
			<slot />
		</div>
		<Cursor />
		<Footer />
	</main>
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	:global(html) {
		font-family: 'Space Grotesk Variable', sans-serif;
		color: #151515;
		background-color: #f1efed;
		letter-spacing: -0.02em;
	}

	.background {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
	}

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
</style>
