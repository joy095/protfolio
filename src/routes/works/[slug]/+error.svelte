<!-- src/routes/+error.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-[50vh] flex items-center justify-center px-4">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">
			{#if $page.status === 404}
				Post Not Found
			{:else}
				Something Went Wrong
			{/if}
		</h1>

		<p class="text-gray-600 mb-8">
			{#if $page.status === 404}
				We couldn't find the post you're looking for.
			{:else}
				There was an error loading this post. Please try again later.
			{/if}
		</p>

		<div class="flex gap-4 justify-center">
			<a
				href="/"
				class="inline-block bg-primary px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
			>
				Return Home
			</a>

			{#if $page.status !== 404}
				<button
					onclick={() => window.location.reload()}
					class="inline-block border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary/10 transition-colors"
				>
					Try Again
				</button>
			{/if}
		</div>
	</div>
</div>
