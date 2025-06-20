<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import StaggerText from './StaggerText.svelte';

	let text = `A showcase of web applications and backend systems I’ve developed using modern tools like Go, PostgreSQL, Redis, SvelteKit, React, Node.js, and more — all focused on speed, scalability, and great user experience.`;

	let showHero = false;

	let scrollDirection: 'up' | 'down' | null = null;
	let lastScrollTop = 0;
	let scrollTimeout: ReturnType<typeof setTimeout>;

	const xPos1 = tweened(0, {
		duration: 4000,
		easing: cubicOut
	});
	const xPos2 = tweened(0, {
		duration: 4000,
		easing: cubicOut
	});

	const handleScroll = () => {
		const currentScrollTop = window.scrollY;
		const direction = currentScrollTop > lastScrollTop ? 'down' : 'up';
		scrollDirection = direction;

		// Update scroll position while scrolling
		xPos1.set(direction === 'down' ? -100 : 100);
		xPos2.set(direction === 'down' ? 100 : -100);

		// Clear previous timeout
		clearTimeout(scrollTimeout);

		// Set timeout to reset position when scrolling stops
		scrollTimeout = setTimeout(() => {
			xPos1.set(0);
			xPos2.set(0);
		}, 150); // Adjust delay as needed

		lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			clearTimeout(scrollTimeout);
		};
	});

	setTimeout(() => {
		showHero = true;
	}, 1000);
</script>

{#if showHero}
	<div id="hero" class="overflow-hidden container-auto">
		<div
			in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }}
			id="animated-text"
			class="flex items-center justify-center gap-5 transition-transform duration-800"
			style="transform: translateX({$xPos1}px)"
		>
			<img
				loading="lazy"
				class="icon h-[12vw] sm:h-20 xl:h-full {scrollDirection}"
				src="/icons/line.svg"
				alt=""
			/>
			<h2
				class="text-[10vw] xl:text-[7rem] lg:text-[5.5rem] md:text-[5rem] leading-[0.8] font-light tracking-tighter"
			>
				I'm Joy Karmakar
			</h2>

		</div>

		<div class="flex flex-col xl:flex-row justify-between mt-10 gap-10 mx-[8vw] lg:mx-14">
			<div in:fly={{ y: 20, duration: 800, delay: 600, opacity: 0 }} class="xl:max-w-[50%]">
				<StaggerText
					charClass="font-medium text-lg md:text-xl lg:text-2xl leading-[1.6] tracking-tighter"
					{text}
					delay={5}
					initialDelay={200}
					duration={800}
				/>
			</div>

			<div
				in:fly={{ y: 20, duration: 800, delay: 200, opacity: 0 }}
				class="flex items-center min-w-fit"
			>
				<h3 class="font-bold text-[10vw] xl:text-[7rem] lg:text-[5.5rem] md:text-[5rem]">
					A developer
				</h3>
			</div>
		</div>

		<h2
			in:fly={{ y: 20, duration: 800, delay: 400, opacity: 0 }}
			class="text-[10vw] xl:text-[7rem] lg:text-[5.5rem] md:text-[5rem] font-light leading-[0.9] mt-4 tracking-tighter flex justify-center"
			style="transform: translateX({$xPos2}px)"
		>
			lives by develop
		</h2>
	</div>
{/if}

<style>
	.letter {
		display: inline-block;
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
