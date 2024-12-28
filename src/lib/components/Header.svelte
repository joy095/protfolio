<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let currentTime: string;
	let timezone: string = 'Kolkata';
	let isVisible = false;

	// Update time function to fetch the current time
	const updateTime = () => {
		const now = new Date();
		currentTime = new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: 'Asia/Kolkata'
		}).format(now);
	};

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000); // Update every second
		setTimeout(() => {
			isVisible = true; // Set the header visible after 2.5 seconds
		}, 2500);
		return () => clearInterval(interval);
	});

	// Track scroll direction
	let scrollDirection = 'up'; // Initially set to 'up'
	let lastScrollY = 0;

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		if (currentScrollY > lastScrollY) {
			scrollDirection = 'down'; // Scrolling down
		} else if (currentScrollY < lastScrollY) {
			scrollDirection = 'up'; // Scrolling up
		}
		lastScrollY = currentScrollY; // Update scroll position
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll); // Cleanup on destroy
		};
	});
</script>

<header
	class="header-container container-auto"
	class:scrolling-down={scrollDirection === 'down'}
	class:scrolling-up={scrollDirection === 'up'}
>
	{#if isVisible}
		<div class="relative overflow-hidden flex justify-between items-center py-5 px-8">
			<div class="nav-border"></div>

			<a class="font-bold text-xl" href="/" in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }}>
				Joy Karmakar
			</a>

			<nav>
				<ul class="flex gap-8 font-semibold text-black/85 text-lg">
					<li in:fly={{ y: 20, duration: 800, delay: 200, opacity: 0 }}>
						<a href="/#about" class="relative line-animate transition-opacity duration-200">
							About
						</a>
					</li>
					<li in:fly={{ y: 20, duration: 800, delay: 400, opacity: 0 }}>
						<a href="/#project" class="relative line-animate transition-opacity duration-200">
							Project
						</a>
					</li>
					<li in:fly={{ y: 20, duration: 800, delay: 600, opacity: 0 }}>
						<a href="/contact" class="relative line-animate transition-opacity duration-200">
							Contact
						</a>
					</li>
				</ul>
			</nav>

			<div
				class="text-black/85 text-lg font-semibold"
				in:fly={{ y: 20, duration: 800, delay: 800, opacity: 0 }}
			>
				{timezone} * {currentTime}
			</div>
		</div>
	{/if}
</header>

<style>
	/* Header styles */
	.header-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		background-color: #f1efed;
		z-index: 10;
		transition: transform 0.3s ease-in-out;
		transform: translateY(0); /* Initially visible */
	}

	/* Scroll down behavior (header moves up) */
	.scrolling-down {
		transform: translateY(-100%); /* Header goes up when scrolling down */
	}

	/* Scroll up behavior (header comes down) */
	.scrolling-up {
		transform: translateY(0); /* Header comes back down when scrolling up */
	}

	/* Border animation for nav */
	.nav-border {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: black;
		width: 100%;
		right: 100%;
		animation: border 1.2s ease-in-out 0.5s forwards;
	}

	@keyframes border {
		0% {
			right: 100%;
		}
		100% {
			right: 0;
		}
	}

	/* Line animation for the nav links */
	.line-animate {
		position: relative;
	}

	.line-animate::after {
		content: '';
		position: absolute;
		width: 0;
		height: 2px;
		bottom: -2px;
		left: 0;
		background-color: currentColor;
		transition: width 0.3s ease;
	}

	.line-animate:hover::after {
		width: 100%;
	}

	.line-animate:hover {
		color: #444;
	}
</style>
