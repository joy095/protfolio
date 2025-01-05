<script lang="ts">
	import '@fontsource-variable/space-grotesk';
	import { onMount } from 'svelte';

	import { initializeLenis } from '$lib/scroll';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import { headerAnimationComplete } from '$lib/stores/store';
	import Footer from '$lib/components/Footer.svelte';

	let numberOfLines = 11;

	let showSplash = true;
	let isContentVisible = false;

	onMount(() => {
		initializeLenis();

		setTimeout(() => {
			showSplash = false;
		}, 3000);
	});

	headerAnimationComplete.subscribe((isComplete: boolean) => {
		isContentVisible = isComplete;
	});
</script>

{#if showSplash}
	<SplashScreen />
{/if}

{#if !showSplash}
	<Header />
{/if}

{#if isContentVisible}
	<Cursor />
	<main class="background" style="--number-of-lines: {numberOfLines}">
		<div class="mt-20">
			<slot />
		</div>
	</main>
{/if}

<Footer />

<style>
	:global(html) {
		font-family: 'Space Grotesk Variable', sans-serif;
		color: #151515;
		background-color: #f1efed;
	}

	/* Background container */
	.background {
		position: relative;
		min-height: 100vh; /* Full viewport height */
		overflow: hidden; /* Prevent scrolling from pseudo-elements */
	}

	/* Background lines */
	.background::before {
		content: '';
		position: absolute;
		top: 0;
		left: -5vw; /* Start at the very left */
		right: 0; /* Extend to the very right */
		bottom: 0;
		background-image: repeating-linear-gradient(
			to right,
			transparent,
			transparent calc((100% - 4vw) / var(--number-of-lines) - 1px),
			/* 4vw for left and right padding */ rgba(204, 204, 204, 0.3)
				calc((100% - 4vw) / var(--number-of-lines) - 1px),
			rgba(204, 204, 204, 0.3) calc((100% - 4vw) / var(--number-of-lines))
		);
		z-index: -1; /* Send to back */
	}
</style>
