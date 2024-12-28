<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLDivElement;
	let mouseX = -200;
	let mouseY = -200;
	let currentX = mouseX;
	let currentY = mouseY;
	let isHovered = false;

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

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		const links = document.querySelectorAll('a');
		links.forEach((link) => {
			link.addEventListener('mouseenter', handleMouseEnter);
			link.addEventListener('mouseleave', handleMouseLeave);
		});

		moveCursor();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			links.forEach((link) => {
				link.removeEventListener('mouseenter', handleMouseEnter);
				link.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	});
</script>

<div bind:this={cursor} class="cursor {isHovered ? 'hovered' : ''}"></div>

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
</style>
