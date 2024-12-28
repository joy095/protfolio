<script lang="ts">
	import '@fontsource-variable/space-grotesk';

	import { onMount } from 'svelte';

	import { initializeLenis } from '$lib/scroll';

	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';
	import Cursor from '$lib/Cursor.svelte';

	onMount(() => {
		initializeLenis();
	});
</script>

<div>
	<SplashScreen />

	<Header />

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
