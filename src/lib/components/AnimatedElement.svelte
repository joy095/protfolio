<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let heading: HTMLElement;

	onMount(() => {
		gsap.fromTo(
			heading,
			{ x: 0 }, // starting position
			{
				scrollTrigger: {
					trigger: heading,
					start: 'top center', // Trigger when element reaches center of viewport
					end: 'bottom top', // End when bottom of element reaches top of viewport
					scrub: 1, // Smooth animation with 1 second lag
					toggleClass: 'active', // Optional: add class for additional styling
					// markers: true,    // Useful for debugging
					pin: false // Set to true if you want the element to be pinned while animating
					// snap: 0 // Set to true for snapping to specific scroll positions
				},
				x: 200, // Move right instead of off-screen
				opacity: 1, // Fade in
				scale: 1.1, // Slightly scale up
				ease: 'power2.out', // Smoother easing
				duration: 1
			}
		);
	});
</script>

<div class="container">
	<h2 id="right-heading" bind:this={heading}>This is the heading</h2>
	<h2>This is the ddcd heading</h2>
</div>

<style>
	.container {
		min-height: 150vh; /* Add some scrollable space */
	}

	#right-heading {
		position: relative;
		padding: 20px;
		background-color: lightblue;
		width: 200px;
		font-size: 2rem;
		opacity: 0.5; /* Start partially transparent */
		transform: translateX(-200px); /* Start position */
		transition: background-color 0.3s ease;
	}
</style>
