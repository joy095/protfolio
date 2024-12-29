<script lang="ts">
	import { onMount } from 'svelte';
	import { posts, isLoading, error, fetchPosts } from '$lib/store/posts';
	import { urlFor } from '$lib/sanity';
	import type { Work } from '$lib/types/post';

	onMount(() => {
		fetchPosts();
	});
</script>

<main>
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
</main>

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
