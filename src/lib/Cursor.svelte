<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLDivElement;
	let mouseX = -200;
	let mouseY = -200;
	let currentX = mouseX;
	let currentY = mouseY;
	let isHovered = false;

	// Create a MutationObserver to watch for new links
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

	const handleMouseEnter = () => {
		isHovered = true;
	};

	const handleMouseLeave = () => {
		isHovered = false;
	};

	const attachLinkListeners = (element: Element) => {
		if (element.tagName.toLowerCase() === 'a') {
			element.addEventListener('mouseenter', handleMouseEnter);
			element.addEventListener('mouseleave', handleMouseLeave);
		}
		// Also check children
		element.querySelectorAll('a').forEach((link) => {
			link.addEventListener('mouseenter', handleMouseEnter);
			link.addEventListener('mouseleave', handleMouseLeave);
		});
	};

	const removeLinkListeners = (element: Element) => {
		if (element.tagName.toLowerCase() === 'a') {
			element.removeEventListener('mouseenter', handleMouseEnter);
			element.removeEventListener('mouseleave', handleMouseLeave);
		}
		element.querySelectorAll('a').forEach((link) => {
			link.removeEventListener('mouseenter', handleMouseEnter);
			link.removeEventListener('mouseleave', handleMouseLeave);
		});
	};

	onMount(() => {
		// Initial setup
		window.addEventListener('mousemove', handleMouseMove);
		document.querySelectorAll('a').forEach(attachLinkListeners);

		// Create observer for dynamic content
		observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				// Handle added nodes
				mutation.addedNodes.forEach((node) => {
					if (node instanceof Element) {
						attachLinkListeners(node);
					}
				});
				// Handle removed nodes
				mutation.removedNodes.forEach((node) => {
					if (node instanceof Element) {
						removeLinkListeners(node);
					}
				});
			});
		});

		// Start observing
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});

		moveCursor();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.querySelectorAll('a').forEach(removeLinkListeners);
			observer.disconnect();
		};
	});
</script>

<div bind:this={cursor} class="cursor" class:hovered={isHovered}></div>

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
		transform: translate(-50%, -50%) scale(1.5);
	}
</style>
