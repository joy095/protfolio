<script lang="ts">
	import { fade, fly } from 'svelte/transition';

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
					Full-stack web developer proficient in HTML, CSS, and JavaScript, with experience in
					React.js, Tailwind CSS, Node.js, and Express.js. Skilled in working with databases like
					PostgreSQL and MongoDB. Familiar with TypeScript, Webflow for design-centric development,
					GSAP for animations, Figma for UI/UX design, Golang, Docker, and version control using
					Git. Focused on creating efficient and functional web applications.
				</p>

				<div class="mt-10">
					<a
						target="_blank"
						href="/Joy_resume.pdf"
						class="nav-links px-7 py-3 bg-[#151515] text-white"
					>
						Download my CV
					</a>
				</div>
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
