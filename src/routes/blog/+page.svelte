<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { urlFor } from '$lib/sanityImage';

	interface Author {
		name?: string;
	}

	interface Category {
		_id?: string;
		title?: string;
	}

	interface Post {
		_id?: string;
		title?: string;
		slug?: { current: string };
		publishedAt?: string;
		mainImage?: { _type: string; asset?: { _ref: string }; alt?: string };
		author?: Author;
		categories?: Category[];
		excerpt?: string;
	}

	export let data: { posts: Post[] };

	let showContent = false;
	let selectedCategory: string | null = null;
	let categories: string[] = ['All'];
	let errorMessage: string | null = null;

	onMount(() => {
		if (!data.posts || data.posts.length === 0) {
			errorMessage = 'No posts found.';
		}
		// Extract unique categories from posts
		const categorySet = new Set<string>();
		data.posts.forEach((post) => {
			if (post.categories && Array.isArray(post.categories)) {
				post.categories.forEach((cat) => {
					if (cat?.title && typeof cat.title === 'string') {
						categorySet.add(cat.title);
					}
				});
			}
		});
		categories = ['All', ...Array.from(categorySet)];
		showContent = true;
		console.log('Posts:', data.posts);
		console.log('Categories:', categories);
		return () => {};
	});

	// Filter posts by selected category
	$: filteredPosts =
		selectedCategory && selectedCategory !== 'All'
			? data.posts.filter((post) => post.categories?.some((cat) => cat.title === selectedCategory))
			: data.posts;

	// Share functionality
	const sharePost = (platform: string, post: Post) => {
		const shareUrl = `https://joykarmakar.vercel.app/blog/${post.slug?.current || ''}`;
		const shareTitle = post.title || 'Blog Post';
		let url = '';
		switch (platform) {
			case 'twitter':
				url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
				break;
			case 'linkedin':
				url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
				break;
		}
		window.open(url, '_blank');
	};
</script>

<svelte:head>
	<title>Software Engineering Blog</title>
	<meta
		name="description"
		content="Explore our latest software engineering insights, tutorials, and in-depth articles."
	/>
	<meta property="og:title" content="Software Engineering Blog" />
	<meta
		property="og:description"
		content="Explore our latest software engineering insights, tutorials, and in-depth articles."
	/>
	<meta property="og:url" content="https://joykarmakar.vercel.app/blog" />
	<meta
		property="og:image"
		content={data.posts[0]?.mainImage
			? urlFor(data.posts[0].mainImage).width(1200).url()
			: 'https://joykarmakar.vercel.app/logo.webp'}
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://joykarmakar.vercel.app/blog" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Software Engineering Blog" />
	<meta
		name="twitter:description"
		content="Explore our latest software engineering insights, tutorials, and in-depth articles."
	/>
	<meta
		name="twitter:image"
		content={data.posts[0]?.mainImage
			? urlFor(data.posts[0].mainImage).width(1200).url()
			: 'https://joykarmakar.vercel.app/logo.webp'}
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if showContent}
	<div class="container-auto" in:fly={{ duration: 800, y: 50 }}>
		<!-- Hero Header -->
		<header class="hero text-center mb-16">
			<h1
				class="font-display text-[3.5rem] md:text-[5rem] leading-tight tracking-tight"
				in:fly={{ duration: 800, y: 20 }}
			>
				Software Engineering Blog
			</h1>
			<p
				class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mt-4"
				in:fly={{ duration: 800, y: 20, delay: 200 }}
			>
				Discover insights, tutorials, and in-depth articles on software engineering.
			</p>
		</header>

		<!-- Error Message -->
		{#if errorMessage}
			<div class="text-red-500 text-xl text-center p-4">
				<p>{errorMessage}</p>
			</div>
		{:else}
			<!-- Category Filters -->
			<nav class="category-filters mb-12 flex flex-wrap gap-4 justify-center">
				{#each categories as category}
					<button
						class="category-btn"
						class:active={selectedCategory === category}
						on:click={() => (selectedCategory = category)}
					>
						{category}
					</button>
				{/each}
			</nav>

			<!-- Blog Posts Grid -->
			<div class="blog-grid">
				{#if filteredPosts.length === 0}
					<p class="text-xl text-gray-600 text-center">No posts found for this category.</p>
				{:else}
					{#each filteredPosts as post, index (post.slug?.current || index)}
						<a
							href={`/blog/${post.slug?.current}`}
							class="blog-card group"
							in:fade={{ duration: 500, delay: index * 100 }}
						>
							{#if post.mainImage?.asset}
								<div class="card-image">
									<img
										src={urlFor(post.mainImage).width(600).url()}
										alt={post.mainImage.alt || post.title || 'Blog Image'}
										class="w-full h-full object-cover rounded-lg"
									/>
								</div>
							{/if}
							<div class="card-content">
								{#if post.categories?.length}
									<div class="categories flex flex-wrap gap-2 mb-2">
										{#each post.categories as cat}
											<span class="category-tag">{cat.title || 'Unknown'}</span>
										{/each}
									</div>
								{/if}
								<h2 class="card-title">{post.title || 'Untitled Post'}</h2>
								<p class="card-meta">
									By {post.author?.name || 'Unknown Author'} •
									{post.publishedAt
										? new Date(post.publishedAt).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
											})
										: 'No Date'}
								</p>
								{#if post.excerpt}
									<p class="card-excerpt">{post.excerpt}</p>
								{/if}
								<div class="read-more">Read More</div>
								<div
									class="share-buttons flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<button
										class="share-btn twitter"
										on:click|stopPropagation={() => sharePost('twitter', post)}
										aria-label="Share on Twitter"
									>
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
											<path
												d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.6 8.6 0 01-2.72 1.04A4.28 4.28 0 0015.88 4c-2.37 0-4.3 1.93-4.3 4.3 0 .34.04.67.11.98A12.2 12.2 0 012.07 4.76a4.3 4.3 0 001.33 5.73 4.27 4.27 0 01-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.3 4.3 0 01-1.94.07 4.3 4.3 0 004.01 2.98A8.6 8.6 0 010 19.54a12.14 12.14 0 006.58 1.93c7.9 0 12.22-6.54 12.22-12.22 0-.19 0-.37-.01-.56A8.7 8.7 0 0022.46 6z"
											/>
										</svg>
									</button>
									<button
										class="share-btn linkedin"
										on:click|stopPropagation={() => sharePost('linkedin', post)}
										aria-label="Share on LinkedIn"
									>
										<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
											<path
												d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.89 1.63-1.83 3.35-1.83 3.58 0 4.24 2.36 4.24 5.43v6.29zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</a>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<div class="container-auto text-center p-10">
		<p class="text-xl font-semibold text-gray-600">Loading...</p>
	</div>
{/if}

<style>
	/* Global Container */
	.container-auto {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	/* Hero Header */
	.hero {
		margin-top: 6rem;
		margin-bottom: 4rem;
	}
	.font-display {
		font-family: 'Playfair Display', serif;
		color: #151515;
	}

	/* Category Filters */
	.category-filters {
		border-bottom: 1px solid #e5e1dc;
		padding-bottom: 1rem;
	}
	.category-btn {
		padding: 0.5rem 1.25rem;
		border-radius: 9999px;
		background: #f1efed;
		color: #151515;
		font-size: 0.875rem;
		font-weight: 500;
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}
	.category-btn:hover {
		background: #151515;
		color: #f1efed;
	}
	.category-btn.active {
		background: #151515;
		color: #f1efed;
	}

	/* Blog Grid */
	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}

	/* Blog Card */
	.blog-card {
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}
	.blog-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
	}
	.card-image {
		position: relative;
		height: 200px;
		overflow: hidden;
	}
	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.blog-card:hover .card-image img {
		transform: scale(1.05);
	}
	.card-content {
		padding: 1.5rem;
		flex-grow: 1;
	}
	.categories {
		display: flex;
		flex-wrap: wrap;
	}
	.category-tag {
		display: inline-block;
		background: #151515;
		color: #f1efed;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
	}
	.card-title {
		font-family: 'Playfair Display', serif;
		font-size: 1.5rem;
		font-weight: 700;
		color: #151515;
		margin: 0.75rem 0;
		line-height: 1.3;
	}
	.card-meta {
		font-size: 0.875rem;
		color: #666;
		margin-bottom: 0.75rem;
	}
	.card-excerpt {
		font-family: 'Inter', sans-serif;
		font-size: 0.875rem;
		color: #333;
		line-height: 1.6;
		margin-bottom: 1rem;
	}
	.read-more {
		display: inline-block;
		font-family: 'Inter', sans-serif;
		font-size: 0.875rem;
		font-weight: 600;
		color: #151515;
		position: relative;
	}
	.read-more::after {
		content: '';
		position: absolute;
		width: 0;
		height: 2px;
		bottom: -2px;
		left: 0;
		background: #151515;
		transition: width 0.3s ease;
	}
	.blog-card:hover .read-more::after {
		width: 100%;
	}
	.share-buttons {
		margin-top: 0.5rem;
	}
	.share-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background: #151515;
		color: #f1efed;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
	}
	.share-btn:hover {
		background: #333;
		transform: scale(1.1);
	}
	.share-btn.twitter {
		background: #1da1f2;
	}
	.share-btn.linkedin {
		background: #0077b5;
	}

	/* Responsive Adjustments */
	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2.5rem;
		}
		.blog-grid {
			grid-template-columns: 1fr;
		}
		.card-title {
			font-size: 1.25rem;
		}
	}
</style>
