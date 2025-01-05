<script lang="ts">
	import Marquee from './Marquee.svelte';

	let numberOfLines = 11;
</script>

<footer class="background relative" style="--number-of-lines: {numberOfLines}">
	<div class="h-full w-full absolute bg-[#151515] -z-10"></div>

	<Marquee speed={20} direction="left" pauseOnHover={true}>
		<h2 class="text-[13rem] font-semibold tracking-[0.5] leading-[1] -mt-11">
			Let's Work together&nbsp;
		</h2>
	</Marquee>

	<div class="container-auto">
		<div class="flex justify-between mt-32">
			<div class="flex flex-col gap-5"></div>
			<p class="text-[1.375rem] font-medium leading-[1.5] w-[30%]">
				I'm currently available for new work, let me know if you need a digital designer. I'd love
				to talk about the next big thing!
			</p>
		</div>
	</div>
</footer>

<style>
	.background {
		position: relative;
		min-height: 100vh; /* Full viewport height */
		overflow: hidden; /* Prevent scrolling from pseudo-elements */
		color: #f1efed;
	}

	/* Background lines */
	.background::before {
		content: '';
		position: absolute;
		top: 0;
		left: -5vw; /* Start at the very left */
		right: 0; /* Extend to the very right */
		bottom: 0;
		background-image: repeating-linear-gradient(
			to right,
			transparent,
			transparent calc((100% - 4vw) / var(--number-of-lines) - 1px),
			/* 4vw for left and right padding */ rgba(83, 83, 83, 0.3)
				calc((100% - 4vw) / var(--number-of-lines) - 1px),
			rgba(83, 83, 83, 0.3) calc((100% - 4vw) / var(--number-of-lines))
		);
		z-index: -1; /* Send to back */
	}
</style>
