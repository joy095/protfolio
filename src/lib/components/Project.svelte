<script lang="ts">
	import { onMount } from 'svelte';
	import { posts, isLoading, error, fetchPosts } from '$lib/store/posts';
	import { urlFor } from '$lib/sanity';
	import type { Work } from '$lib/types/post';

	let contentVisible = false;

	onMount(() => {
		fetchPosts();
	});

	setTimeout(() => {
		contentVisible = true;
	}, 2000);
</script>

{#if contentVisible}
	<section class="container-auto" id="project">
		<div class="flex justify-between border-b-2 border-black/80 pb-3">
			<p class="font-medium text-2xl leading-[1.6] tracking-tighter">Featured work</p>

			<div class="text-lg font-medium flex items-center gap-1">
				Scroll
				<img src="/icons/arrow.svg" alt="arrow" class="animate-bounce h-4 w-4" />
			</div>
		</div>
		<h1>Blog Posts</h1>

		{#if $isLoading}
			<div class="loading">Loading posts...</div>
		{:else if $error}
			<div class="error">
				Error: {$error}
				<button on:click={fetchPosts}>Retry</button>
			</div>
		{:else if $posts.length > 0}
			<div class="posts-grid">
				{#each $posts as post (post._id)}
					<article class="post-card">
						{#if post.image}
							<img src={urlFor(post.image)} alt={post.title} />
						{/if}
						<h2>{post.title}</h2>
					</article>
				{/each}
			</div>
		{:else}
			<p>No posts found.</p>
		{/if}
	</section>
{/if}

<style>
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		padding: 1rem;
	}

	.post-card {
		border: 1px solid #ddd;
		padding: 1rem;
		border-radius: 8px;
	}

	.post-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 4px;
	}

	.loading {
		text-align: center;
		padding: 2rem;
	}

	.error {
		color: red;
		text-align: center;
		padding: 2rem;
	}
</style>
