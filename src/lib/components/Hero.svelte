<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let scrollDirection: 'up' | 'down' | null = null;
	let lastScrollTop = 0; // Tracks the last scroll position

	const handleScroll = () => {
		const currentScrollTop = window.scrollY;

		if (currentScrollTop > lastScrollTop) {
			// Scrolling down
			scrollDirection = 'down';
		} else if (currentScrollTop < lastScrollTop) {
			// Scrolling up
			scrollDirection = 'up';
		}

		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For mobile/overscroll behavior
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	onMount(async () => {
		if (browser) {
			gsap.registerPlugin(ScrollTrigger);

			// First text
			gsap.from('#text-first', {
				scrollTrigger: {
					trigger: '#text-first',
					start: 'top top',
					end: 'bottom top',
					scrub: true,
					// markers: true,
					toggleActions: 'play none none reverse',
					onUpdate: (self) => {
						const progress = self.progress;
						const direction = self.direction;
						const element = document.getElementById('text-first');
						if (direction === 1) {
							// Scrolling down
							gsap.to(element, { x: 100 * progress, duration: 1 });
						} else {
							// Scrolling up
							gsap.to(element, { x: 0 * (1 - progress), duration: 1 });
						}
					}
				}
				// opacity: 0
			});

			// Second text (opposite direction)
			gsap.from('.text-second', {
				scrollTrigger: {
					trigger: '.text-second',
					start: 'top top',
					end: 'bottom top',
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

<div class="overflow-hidden">
	<div id="text-first" class="flex items-center gap-2 ml-[10vw]">
		<img class="icon {scrollDirection}" src="/icons/line.svg" alt="" />
		<h2 class="text-8xl leading-[0.8] font-light">I'm Joy Karmakar</h2>
	</div>

	<div class="text-second">
		<h2>Second Text</h2>
		<p>Moves right on scroll down, left on scroll up</p>
	</div>
</div>

<style>
	.text-second {
		margin: 100vh 0;
		padding: 20px;
	}

	.icon {
		animation: spinnerUp 10s linear infinite;
	}
	.icon.up {
		animation: spinnerUp 10s linear infinite;
	}
	.icon.down {
		animation: spinnerDown 10s linear infinite;
	}
	@keyframes spinnerUp {
		to {
			transform: rotate(-360deg);
		}
	}
	@keyframes spinnerDown {
		to {
			transform: rotate(360deg);
		}
	}
</style>
