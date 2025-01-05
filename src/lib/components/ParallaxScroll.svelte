<!-- ParallaxScroll.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';

	interface $$Props {
		speed?: number;
	}

	export let speed: number = 2; // Default to faster scroll speed

	let container: HTMLDivElement;
	let content: HTMLDivElement;

	onMount(() => {
		const handleScroll = (): void => {
			if (!container || !content) return;

			// Get the container's position relative to the viewport
			const containerRect = container.getBoundingClientRect();

			// Calculate how far we've scrolled past the top of the container
			const scrolledPastContainer = -containerRect.top;

			// Only apply transform when container is in view
			if (containerRect.top <= window.innerHeight && containerRect.bottom >= 0) {
				// Multiply the scroll amount by speed to make content scroll faster
				const translateY = scrolledPastContainer * speed;
				content.style.transform = `translateY(${translateY}px)`;
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="parallax-container" bind:this={container}>
	<div class="parallax-content" bind:this={content}>
		<slot></slot>
	</div>
</div>

<style>
	.parallax-container {
		width: 100%;
		height: 400px;
		overflow: hidden;
		position: relative;
	}

	.parallax-content {
		width: 100%;
		/* Make content taller than container to allow for scrolling */
		height: 150%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
