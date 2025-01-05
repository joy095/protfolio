<script lang="ts">
	import StaggerText from './StaggerText.svelte';
	import { fade } from 'svelte/transition';

	let text = `Hi, I'm Martin Taylor, an art director and product designer based in London. With my
				background in visual arts and technology, I specialize in creating engaging user
				experiences through interactive design. I am deeply passionate about using my creative
				skills to collaborate on innovative and meaningful projects that make a genuine impact.`;
</script>

<div class="container-auto mt-40">
	<div class="flex justify-between pb-3 relative overflow-hidden">
		<p class="font-medium text-2xl leading-[1.6] tracking-tighter">About</p>
		<div class="nav-border"></div>
	</div>

	<div id="about" class="flex justify-between mt-16">
		<div class="w-[60%]">
			<StaggerText
				charClass="font-medium text-3xl leading-[1.6] tracking-tighter"
				{text}
				delay={5}
				initialDelay={200}
				duration={800}
			/>
		</div>

		<div class="w-[30%]" in:fade={{ duration: 800, delay: 400 }}>
			<img src="my_image.webp" alt="Joy Karmakar" />
		</div>
	</div>
</div>

<style>
	.nav-border {
		position: absolute;
		bottom: 0;
		height: 2px;
		background-color: black;
		width: 100%;
		right: 100%;
		opacity: 0;
		animation: border 1.2s ease-in-out 0.5s forwards;
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
