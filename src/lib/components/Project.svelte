<script lang="ts">
	import { onMount } from 'svelte';
	import { posts, isLoading, error, fetchPosts } from '$lib/store/posts';
	import { urlFor } from '$lib/sanity';

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
			<div class="post-container">
				{#each $posts as post (post._id)}
					<div class="post-card">
						<div class="flex flex-col justify-between gap-5">
							<h2 class="title">{post.title}</h2>
							<div class="flex flex-col gap-6">
								<p class="font-medium text-xl tracking-[.8]">{post.description}</p>
								<a class="btn" href={post.slug.current}>{post.type}</a>
							</div>
						</div>
						{#if post.image}
							<img class="project-banner" src={urlFor(post.image)} alt={post.title} />
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p>No posts found.</p>
		{/if}
	</section>
{/if}

<style>
	.post-container {
		margin-top: 5rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.post-card {
		display: flex;
		justify-content: space-between;
		gap: 3rem;
	}

	.post-card img {
		width: 70%;
		height: 30rem;
		object-fit: cover;
	}

	.title {
		font-size: 2rem;
		font-weight: 500;
	}

	.btn {
		background-color: rgba(21, 21, 21, 0.08);
		padding: 0.6rem 1rem;
		width: fit-content;
		border-radius: 0.25rem;
		font-weight: 500;
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
