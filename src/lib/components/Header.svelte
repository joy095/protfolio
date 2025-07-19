<!-- @format -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { headerAnimationComplete } from '$lib/stores/store';
	import { smoothScrollToSection } from '$lib/scroll';
	import { inView } from '$lib/actions/inView';

	let currentTime: string;
	let timezone: string;
	let isVisible = false;
	let numberOfLines = 11;

	// Get user's timezone
	const getUserTimezone = () => {
		const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
		// Convert timezone format from "America/New_York" to "New York"
		return timezoneName.split('/').pop()?.replace(/_/g, ' ') || timezoneName;
	};

	// Update time function to fetch the current time in user's timezone
	const updateTime = () => {
		const now = new Date();
		currentTime = new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
		}).format(now);
	};

	onMount(() => {
		timezone = getUserTimezone();
		updateTime();
		const interval = setInterval(updateTime, 1000);
		setTimeout(() => {
			isVisible = true;
		}, 0);
		return () => clearInterval(interval);
	});

	// Track scroll direction
	let scrollDirection = 'up';
	let lastScrollY = 0;

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		if (currentScrollY > lastScrollY) {
			scrollDirection = 'down';
		} else if (currentScrollY < lastScrollY) {
			scrollDirection = 'up';
		}
		lastScrollY = currentScrollY;
	};

	onMount(() => {
		const hash = window.location.hash;
		if (hash) {
			setTimeout(() => {
				const section = document.querySelector(hash);
				if (section) {
					section.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}, 100);
		}

		window.addEventListener('scroll', handleScroll);
		headerAnimationComplete.set(true);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Handle hover state for buttons
	let hoveredButtons: { [key: string]: boolean } = {};
	const handleHover = (id: string) => {
		hoveredButtons[id] = true;
	};
</script>

{#if isVisible}
	<header
		class="header-container container-auto background"
		style="--number-of-lines: {numberOfLines}"
		class:scrolling-down={scrollDirection === 'down'}
		class:scrolling-up={scrollDirection === 'up'}
	>
		<div
			use:inView={{ threshold: 0.2 }}
			on:inview={() => (isVisible = true)}
			on:introend={() => headerAnimationComplete.set(true)}
			class="relative overflow-hidden flex justify-between items-center py-5"
		>
			<div class="nav-border"></div>

			<a
				class="nav-links font-bold md:text-xl sm:text-lg text-base flex gap-1 items-center"
				href="/#hero"
				on:click={(e) => smoothScrollToSection(e, '#hero')}
				in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }}
				on:mouseover={() => handleHover('home')}
				on:focus={() => handleHover('home')}
				class:hovered={hoveredButtons['home']}
			>
				Joy Karmakar
			</a>

			<nav>
				<ul class="flex gap-5 md:gap-8 font-semibold text-black/85 text-base md:text-lg">
					<li class="nav-links" in:fly={{ y: 20, duration: 800, delay: 200, opacity: 0 }}>
						<a
							href="/#about"
							on:click={(e) => smoothScrollToSection(e, '#about')}
							class="button overflow-hidden flex"
							on:mouseover={() => handleHover('about')}
							on:focus={() => handleHover('about')}
							class:hovered={hoveredButtons['about']}
						>
							About
						</a>
					</li>
					<li class="nav-links" in:fly={{ y: 20, duration: 800, delay: 400, opacity: 0 }}>
						<a
							href="/blog"
							class="button overflow-hidden flex"
							on:mouseover={() => handleHover('blog')}
							on:focus={() => handleHover('blog')}
							class:hovered={hoveredButtons['blog']}
						>
							Blog
						</a>
					</li>
					<li class="nav-links" in:fly={{ y: 20, duration: 800, delay: 600, opacity: 0 }}>
						<a
							href="/contact"
							class="button overflow-hidden flex"
							on:mouseover={() => handleHover('contact')}
							on:focus={() => handleHover('contact')}
							class:hovered={hoveredButtons['contact']}
						>
							Contact
						</a>
					</li>
				</ul>
			</nav>

			<div
				class="text-black/85 text-lg font-semibold md:flex hidden"
				in:fly={{ y: 20, duration: 800, delay: 800, opacity: 0 }}
			>
				{timezone} * {currentTime}
			</div>
		</div>
	</header>
{/if}

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
		transform: translateY(0);
	}

	.scrolling-down {
		transform: translateY(-100%);
	}

	.scrolling-up {
		transform: translateY(0);
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

	/* Button hover animation styles */
	.button {
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.button::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: -100%;
		height: 2px;
		width: 100%;
		background-color: #333;
		transition: left 0.4s ease;
	}

	.button:hover::before {
		animation: slideIn 0.4s ease forwards;
	}

	.button.hovered:not(:hover)::before {
		animation: slideOut 0.4s ease forwards;
	}

	@keyframes slideIn {
		0% {
			left: -100%;
		}
		100% {
			left: 0%;
		}
	}

	@keyframes slideOut {
		0% {
			left: 0%;
		}
		100% {
			left: 100%;
		}
	}

	/* Background styles */
	.background {
		min-height: 68px;
		overflow: hidden;
	}

	.background::before {
		content: '';
		position: absolute;
		top: 0;
		left: -5vw;
		right: 0;
		bottom: 0;
		background-image: repeating-linear-gradient(
			to right,
			transparent,
			transparent calc((100% - 4vw) / var(--number-of-lines) - 1px),
			rgba(204, 204, 204, 0.3) calc((100% - 4vw) / var(--number-of-lines) - 1px),
			rgba(204, 204, 204, 0.3) calc((100% - 4vw) / var(--number-of-lines))
		);
		z-index: -1;
	}
</style>
