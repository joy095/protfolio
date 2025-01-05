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
			<div class="w-[60%]">
				<p class="font-medium text-3xl leading-[1.6] tracking-tighter"></p>
			</div>
			<div class="w-[30%]" in:fade={{ duration: 800, delay: 300 }}>
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
