<script>
	import { onMount } from 'svelte';

	export let once = true; // Only trigger once by default
	export let threshold = 0.1; // How much of element needs to be visible
	export let rootMargin = '0px'; // Margin around root

	let element;
	let visible = false;

	onMount(() => {
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				visible = entry.isIntersecting;

				if (once && visible) {
					observer.unobserve(element);
				}
			},
			{
				threshold,
				rootMargin
			}
		);

		observer.observe(element);

		return () => {
			if (element) observer.unobserve(element);
		};
	});
</script>

<div bind:this={element} class:visible>
	<slot {visible} />
</div>

<style>
	div {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	div.visible {
		opacity: 1;
		transform: translateY(0);
	}
</style>
