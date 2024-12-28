<script>
	import { fly } from 'svelte/transition';

	let showContact = false;

	setTimeout(() => {
		showContact = true;
	}, 1000);
</script>

{#if showContact}
	<div class="container-auto" in:fly={{ duration: 800, y: 50 }}>
		<h1>Hello</h1>
	</div>
{/if}
