<script lang="ts">
	import '@fontsource-variable/space-grotesk';
	import { onMount } from 'svelte';

	import { initializeLenis } from '$lib/scroll';
	import '../app.css';

	import Header from '$lib/components/Header.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import Cursor from '$lib/Cursor.svelte';
	import { headerAnimationComplete } from '$lib/store';

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

<!-- {#if showSplash}
	<SplashScreen />
{/if} -->

{#if !showSplash}
	<Header />
{/if}

{#if isContentVisible}
	<Cursor />
	<main class="mt-20">
		<slot />
	</main>
{/if}

<style>
	:global(html) {
		font-family: 'Space Grotesk Variable', sans-serif;
		color: #151515;
		background-color: #f1efed;
	}
</style>
