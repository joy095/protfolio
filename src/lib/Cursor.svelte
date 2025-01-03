<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLDivElement;
	let mouseX = -200;
	let mouseY = -200;
	let currentX = mouseX;
	let currentY = mouseY;
	let isHovered = false;
	let isCustomHover = false;

	// Create a MutationObserver to watch for new elements
	let observer: MutationObserver;

	const moveCursor = () => {
		const speed = 0.1;
		currentX += (mouseX - currentX) * speed;
		currentY += (mouseY - currentY) * speed;

		if (cursor) {
			cursor.style.left = `${currentX}px`;
			cursor.style.top = `${currentY}px`;
		}

		requestAnimationFrame(moveCursor);
	};

	const handleMouseMove = (event: MouseEvent) => {
		mouseX = event.clientX;
		mouseY = event.clientY;
	};

	const handleMouseEnter = (event: Event) => {
		if (event.target instanceof HTMLElement) {
			// Type guard for HTMLElement
			isHovered = true;
			isCustomHover = event.target.classList.contains('project-banner');
		}
	};

	const handleMouseLeave = (event: Event) => {
		isHovered = false;
		isCustomHover = false;
	};

	const attachLinkListeners = (element: Element) => {
		if (element.classList.contains('nav-links') || element.classList.contains('project-banner')) {
			element.addEventListener('mouseenter', handleMouseEnter);
			element.addEventListener('mouseleave', handleMouseLeave);
		}
		// Also check children
		element.querySelectorAll('.nav-links, .project-banner').forEach((el) => {
			el.addEventListener('mouseenter', handleMouseEnter);
			el.addEventListener('mouseleave', handleMouseLeave);
		});
	};

	const removeLinkListeners = (element: Element) => {
		if (element.classList.contains('nav-links') || element.classList.contains('project-banner')) {
			element.removeEventListener('mouseenter', handleMouseEnter);
			element.removeEventListener('mouseleave', handleMouseLeave);
		}
		element.querySelectorAll('.nav-links, .project-banner').forEach((el) => {
			el.removeEventListener('mouseenter', handleMouseEnter);
			el.removeEventListener('mouseleave', handleMouseLeave);
		});
	};

	onMount(() => {
		// Initial setup
		window.addEventListener('mousemove', handleMouseMove);
		document.querySelectorAll('.nav-links, .project-banner').forEach(attachLinkListeners);

		// Create observer for dynamic content
		observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node instanceof Element) {
						attachLinkListeners(node);
					}
				});
				mutation.removedNodes.forEach((node) => {
					if (node instanceof Element) {
						removeLinkListeners(node);
					}
				});
			});
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		moveCursor();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.querySelectorAll('.nav-links, .project-banner').forEach(removeLinkListeners);
			observer.disconnect();
		};
	});
</script>

<div
	bind:this={cursor}
	class="cursor"
	class:hovered={isHovered && !isCustomHover}
	class:project-banner={isCustomHover}
></div>

<style>
	.cursor {
		width: 20px;
		height: 20px;
		background: rgb(255, 255, 255);
		border-radius: 50%;
		position: fixed;
		pointer-events: none;
		transform: translate(-50%, -50%);
		transition: transform 0.3s;
		z-index: 9999;
		mix-blend-mode: difference;
	}

	.cursor.hovered {
		transform: translate(-50%, -50%) scale(2);
	}

	.project-banner {
		transition: transform 0.5s ease;
		transform: translate(-50%, -50%) scale(6.5);
	}
	.project-banner::after {
		content: 'Explore';
		position: absolute;
		height: 100%;
		width: 100%;
		top: 38%;
		left: 25%;
		right: 0;
		bottom: 0;
		font-size: 0.2rem;
		font-weight: 600;
		z-index: 1;
	}
</style>
