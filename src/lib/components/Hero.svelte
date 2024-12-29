<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import StaggerText from './StaggerText.svelte';

	let text =
		'A passionate web developer with 2 years of experience in building responsive and scalable web applications using React.js, Node.js, and TypeScript. Skilled in crafting intuitive user interfaces with Tailwind CSS and managing databases like PostgreSQL and MongoDB.';

	let showHero = false;

	let scrollDirection: 'up' | 'down' | null = null;
	let lastScrollTop = 0;
	let scrollTimeout: ReturnType<typeof setTimeout>;

	const xPos = tweened(0, {
		duration: 4000,
		easing: cubicOut
	});

	const handleScroll = () => {
		const currentScrollTop = window.scrollY;
		const direction = currentScrollTop > lastScrollTop ? 'down' : 'up';
		scrollDirection = direction;

		// Update scroll position while scrolling
		xPos.set(direction === 'down' ? -50 : 50);

		// Clear previous timeout
		clearTimeout(scrollTimeout);

		// Set timeout to reset position when scrolling stops
		scrollTimeout = setTimeout(() => {
			xPos.set(0);
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
	<div class="overflow-hidden container-auto">
		<div
			in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }}
			id="animated-text"
			class="flex items-center gap-5 ml-[10vw] transition-transform duration-800"
			style="transform: translateX({$xPos}px)"
		>
			<img class="icon {scrollDirection}" src="/icons/line.svg" alt="" />
			<h2 class="text-[7rem] leading-[0.8] font-light tracking-tighter">I'm Joy Karmakar</h2>
		</div>

		<div class="flex justify-between mt-10 gap-10 mx-14">
			<div class="max-w-[50%]">
				<StaggerText
					charClass="font-medium text-2xl leading-[1.6] tracking-tighter"
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
				<h3 class="font-bold text-[7rem]">A developer</h3>
			</div>
		</div>

		<div class="h-[150vh]"></div>
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
