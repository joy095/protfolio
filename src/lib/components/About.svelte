<script lang="ts">
	import InView from '$lib/components/InView.svelte';

	let contentVisible = false;

	setTimeout(() => {
		contentVisible = true;
	}, 2000);
</script>

{#if contentVisible}
	<div class="container-auto">
		<InView>
			<div class="flex justify-between pb-3 relative overflow-hidden">
				<p class="font-medium text-2xl leading-[1.6] tracking-tighter">About</p>
				<div class="nav-border"></div>
			</div>

			<div id="about"></div>
		</InView>
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
		animation: border 1.2s ease-in-out 0.5s forwards;
	}

	@keyframes border {
		0% {
			right: 100%;
		}
		100% {
			right: 0;
		}
	}
</style>
