<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	onMount(async () => {
		if (browser) {
			gsap.registerPlugin(ScrollTrigger);

			// First text
			gsap.from('.text-first', {
				scrollTrigger: {
					trigger: '.text-first',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
					toggleActions: 'play none none reverse',
					onUpdate: (self) => {
						const progress = self.progress;
						const direction = self.direction;
						const element = document.querySelector('.text-first');
						if (direction === 1) {
							// Scrolling down
							gsap.to(element, { x: -100 * progress, duration: 0.5 });
						} else {
							// Scrolling up
							gsap.to(element, { x: 100 * (1 - progress), duration: 0.5 });
						}
					}
				}
				// opacity: 0
			});

			// Second text (opposite direction)
			gsap.from('.text-second', {
				scrollTrigger: {
					trigger: '.text-second',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
					toggleActions: 'play none none reverse',
					onUpdate: (self) => {
						const progress = self.progress;
						const direction = self.direction;
						const element = document.querySelector('.text-second');
						if (direction === 1) {
							// Scrolling down
							gsap.to(element, { x: 100 * progress, duration: 0.5 });
						} else {
							// Scrolling up
							gsap.to(element, { x: -100 * (1 - progress), duration: 0.5 });
						}
					}
				}
				// opacity: 0
			});
		}
	});
</script>

<div class="container-auto overflow-hidden">
	<div class="text-first">
		<h2>First Text</h2>
		<p>Moves left on scroll down, right on scroll up</p>
	</div>

	<div class="text-second">
		<h2>Second Text</h2>
		<p>Moves right on scroll down, left on scroll up</p>
	</div>
</div>

<style>
	.text-first,
	.text-second {
		margin: 100vh 0;
		padding: 20px;
	}
</style>
