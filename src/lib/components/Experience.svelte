<script>
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
				Expericence
			</p>
			<div class="nav-border"></div>
		</div>

		<div class="flex justify-between mt-16">
			<div class="w-[30%]">
				<p class="font-medium text-xl leading-[1.6] tracking-tighter">
					I've worked with companies and clients. I enjoy collaborating with clients who appreciate
					the importance of good developer.
				</p>
			</div>
			<div class="flex justify-between w-[60%]">
				<div class="flex flex-col gap-5 w-full">
					<p class="text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">Skkyee</p>
					<p class="text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">Skkyee</p>
					<p class="text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">Acceleratron</p>
					<p class="text-xl font-medium border-b-2 w-full pb-5">Logic ‘n’ Color</p>
				</div>
				<div class="flex flex-col gap-5 border-b-2 w-full">
					<p class="text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">Web Developer</p>
					<p class="text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">
						Web Development Intern
					</p>
					<p class="text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">Internship</p>
					<p class="text-xl font-medium border-b-2 w-full pb-5">Frontend Developer</p>
				</div>
				<div class="flex flex-col gap-5 border-b-2 w-full">
					<p class="flex justify-end text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">
						Apr 2024 - Present
					</p>
					<p class="flex justify-end text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">
						Jan 2024 - Apr 2024
					</p>
					<p class="flex justify-end text-xl font-medium border-b-2 border-[#c2c2c2] w-full pb-5">
						Dec 2023 - Jan 2024
					</p>
					<p class="flex justify-end text-xl font-medium w-full pb-5">Jun 2023 - Nov 2023</p>
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
