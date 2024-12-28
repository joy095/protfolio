<script lang="ts">
	import '@fontsource-variable/space-grotesk';

	import { onMount } from 'svelte';

	import { initializeLenis } from '$lib/scroll';

	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import { headerAnimationComplete } from '$lib/store';

	let isReady = false;

	// React to store changes
	$: if ($headerAnimationComplete) {
		isReady = true;
	}

	let showSplash = true;

	onMount(() => {
		initializeLenis();

		// Hide splash screen after 3 seconds
		setTimeout(() => {
			showSplash = false;
		}, 3000);
	});
</script>

<div>
	{#if showSplash}
		<SplashScreen />
	{/if}

	<!-- {#if isReady} -->
	<Header />
	<!-- {/if} -->
	<Cursor />

	<main class="mt-20">
		<slot />
	</main>
</div>

<style>
	:global(html) {
		font-family: 'Space Grotesk Variable', sans-serif;
		color: #151515;
		background-color: #f1efed;
	}
</style>
