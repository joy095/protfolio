<!-- src/routes/posts/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { posts, isLoading, error, fetchPosts } from '$lib/stores/posts';
	import { urlFor } from '$lib/sanity';
	import RevealImage from '$lib/components/RevealImage.svelte';
	import { smoothScrollToSection } from '$lib/scroll';

	function intersectionObserver(node: HTMLElement, index: number) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							node.style.opacity = '1';
							node.style.transform = 'translateY(0)';
						}, index * 100);

						observer.unobserve(node);
					}
				});
			},
			{
				root: null,
				rootMargin: '50px',
				threshold: 0.1
			}
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	let contentVisible = false;

	onMount(() => {
		fetchPosts();
	});

	setTimeout(() => {
		contentVisible = true;
	}, 2000);
</script>

{#if contentVisible}
	<section class="container-auto">
		<div class="flex justify-between border-b-2 border-black/80 pb-3">
			<p class="font-medium text-2xl leading-[1.6] tracking-tighter">Featured work</p>
			<a
				on:click={(e) => smoothScrollToSection(e, '#project')}
				href="#project"
				class="text-lg font-medium flex items-center gap-1"
			>
				Scroll
				<img loading="lazy" src="/icons/arrow.svg" alt="arrow" class="animate-bounce h-4 w-4" />
			</a>
		</div>
		<div id="project"></div>
		{#if $isLoading}
			<div class="loading">Loading posts...</div>
		{:else if $error}
			<div class="error">
				Error: {$error}
				<button on:click={fetchPosts}>Retry</button>
			</div>
		{:else if $posts.length > 0}
			<div class="post-container">
				{#each $posts as post, index (post._id)}
					<div
						class="post-card opacity-0 translate-y-10 transition-all duration-1000 ease-out"
						use:intersectionObserver={index}
					>
						<div class="flex flex-col mt-8 md:mt-0 justify-between gap-4 md:gap-5 md:w-[30%] pr-5">
							<h2 class="title">{post.title}</h2>
							<div class="flex flex-col gap-4 md:gap-6">
								{#if post.description}
									<p class="font-medium text-xl tracking-[.8]">{post.description}</p>
								{/if}
								<a class="btn" href="works/{post.slug.current}">View</a>
							</div>
						</div>
						{#if post.image}
							<div class="banner-wrap">
								<RevealImage
									className="project-banner"
									src={urlFor(post.image)}
									alt={post.title}
									revealOptions={{
										duration: 1,
										delay: index * 100
									}}
								/>
							</div>
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
		flex-direction: column-reverse;
		will-change: transform, opacity;
		max-height: 600px;
		overflow: hidden;
	}

	.banner-wrap {
		height: 30vh;
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

	@media (min-width: 768px) {
		.post-card {
			flex-direction: row;
		}
		.banner-wrap {
			width: 70%;
			height: 90vh;
		}
	}
</style>
