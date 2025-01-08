<script lang="ts">
	import StaggerText from './StaggerText.svelte';
	import { fade, fly } from 'svelte/transition';

	let text = `Hi, I'm Joy Karmakar, an art director and product designer based in India. With my background in visual arts and technology, I specialize in creating engaging user experiences through interactive design. I am deeply passionate about using my creative skills to collaborate on innovative and meaningful projects that make a genuine impact.`;

	let inVisible = false;

	setTimeout(() => {
		inVisible = true;
	}, 1000);
</script>

{#if inVisible}
	<div in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }} class="container-auto mt-40">
		<div class="flex justify-between pb-3 relative overflow-hidden">
			<p
				class="font-medium text-2xl leading-[1.6] tracking-tighter"
				in:fly={{ x: -20, duration: 600, delay: 100 }}
			>
				About
			</p>
			<div class="nav-border"></div>
		</div>

		<div id="about" class="flex flex-col gap-5 md:flex-row justify-between mt-16">
			<div class="md:w-[60%]">
				<p
					class="font-medium text-lg sm:text-[1.5rem] md:text-[1.625rem] lg:text-3xl lg:leading-[1.6] leading-[1.6] tracking-tighter"
				>
					{text}
				</p>
			</div>
			<div class="object-top overflow-hidden md:w-[30%]" in:fade={{ duration: 800, delay: 300 }}>
				<img loading="lazy" src="my_image.webp" alt="Joy Karmakar" />
			</div>
		</div>
	</div>
{/if}

<style>
	.nav-border {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: black;
		width: 100%;
		right: 100%;
		opacity: 0;
		animation: border 1.2s ease-in-out 0.4s forwards;
	}

	@keyframes border {
		0% {
			right: 100%;
			opacity: 1;
		}
		100% {
			right: 0;
			opacity: 1;
		}
	}
</style>
