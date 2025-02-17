<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	let inVisible = false;

	setTimeout(() => {
		inVisible = true;
	}, 1000);
</script>

{#if inVisible}
	<div in:fly={{ y: 20, duration: 800, delay: 0, opacity: 0 }} class="container-auto mt-40">
		<!-- About Section -->
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
						href="/Joy's_resume.pdf"
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

		<!-- Certifications Section -->
		<div class="mt-20">
			<h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Certifications Achieved</h2>
			<div class="space-y-8">
				<!-- HackerRank React Certification -->
				<div
					class="bg-white p-8 shadow-lg rounded-lg flex items-center space-x-6 hover:shadow-xl transition-shadow duration-300"
				>
					<img
						class="w-24 h-24 object-cover rounded-full border border-indigo p-1"
						src="react_basic certificate.webp"
						alt="HackerRank Certification"
					/>
					<div>
						<h3 class="text-xl font-semibold text-indigo-600">HackerRank React (Basic)</h3>
						<p class="text-gray-700 mt-2">Passed: February 2025</p>
						<p class="text-gray-600 mt-4">
							I have successfully completed the HackerRank React (Basic) certification, which
							validates my fundamental skills in React.js and component-based development.
						</p>
						<a
							target="_blank"
							href="https://www.hackerrank.com/certificates/a69958cf2207"
							class="text-indigo-600 mt-4 block font-semibold"
						>
							View Certification
						</a>
					</div>
				</div>

				<!-- Responsive Web Design Certification -->
				<div
					class="bg-white p-8 shadow-lg rounded-lg flex items-center space-x-6 hover:shadow-xl transition-shadow duration-300"
				>
					<img
						class="w-24 h-24 object-cover rounded-full border border-green p-1"
						src="responsive-design.webp"
						alt="Responsive Web Design Certification"
					/>
					<div>
						<h3 class="text-xl font-semibold text-green-600">Responsive Web Design</h3>
						<p class="text-gray-700 mt-2">Passed: February 2025</p>
						<p class="text-gray-600 mt-4">
							This certification highlights my proficiency in building responsive, mobile-first web
							designs using HTML, CSS, and modern web techniques.
						</p>
						<a
							target="_blank"
							href="https://www.freecodecamp.org/certification/joykarmakar/responsive-web-design"
							class="text-green-600 mt-4 block font-semibold"
						>
							View Certification
						</a>
					</div>
				</div>

				<!-- Webflow 101 Certification -->
				<div
					class="bg-white p-8 shadow-lg rounded-lg flex items-center space-x-6 hover:shadow-xl transition-shadow duration-300"
				>
					<img
						class="w-24 h-24 object-cover rounded-full border border-blue p-1"
						src="webflow-101.webp"
						alt="Webflow 101 Certification"
					/>
					<div>
						<h3 class="text-xl font-semibold text-blue-600">Webflow 101</h3>
						<p class="text-gray-700 mt-2">Passed: December 2024</p>
						<p class="text-gray-600 mt-4">
							This certification confirms my expertise in using Webflow for design-centric
							development, focusing on creating responsive websites without code.
						</p>
						<a
							target="_blank"
							href="webflow-101.webp"
							class="text-blue-600 mt-4 block font-semibold"
						>
							View Certification
						</a>
					</div>
				</div>
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
