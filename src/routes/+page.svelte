<script>
	import AnimatedElement from '$lib/components/AnimatedElement.svelte';
</script>

<div class="container-auto mt-2">
	<div class="flex items-center gap-2">
		<img class="icon" src="/icons/line.svg" alt="" />
		Hello
	</div>

	<AnimatedElement />
</div>

<style>
	.icon {
		animation: spinner 15s linear infinite;
	}
	@keyframes spinner {
		to {
			transform: rotate(-360deg);
		}
	}
</style>
