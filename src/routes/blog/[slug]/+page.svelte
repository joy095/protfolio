<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { PortableText } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanityImage';

	interface Category {
		_id?: string;
		title?: string;
	}

	interface Author {
		name?: string;
		image?: { _type: string; asset?: { _ref: string } };
		bio?: any[];
	}

	interface Post {
		title?: string;
		slug?: { current: string };
		publishedAt?: string;
		content?: any[];
		mainImage?: { _type: string; asset?: { _ref: string }; alt?: string };
		author?: Author;
		categories?: Category[];
		tags?: string[] | null;
		seo?: { metaDescription?: string };
	}

	export let data: {
		post?: Post;
		title: string;
		description: string;
		url: string;
		image: string;
	};

	let showContent = true;
	let errorMessage: string | null = null;

	console.log('Page Data:', data);

	if (!data.post) {
		errorMessage = 'No post data found.';
	}

	// Share functionality
	const sharePost = (platform: string) => {
		const shareUrl = data.url || window.location.href;
		const shareTitle = data.title || 'Blog Post';
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
	<title>{data.title || 'Blog Post'}</title>
	<meta name="description" content={data.description || 'Read our latest blog post'} />
	<meta property="og:title" content={data.title || 'Blog Post'} />
	<meta property="og:description" content={data.description || 'Read our latest blog post'} />
	<meta property="og:url" content={data.url || ''} />
	<meta property="og:image" content={data.image || ''} />
	<meta property="og:type" content="article" />
	<link rel="canonical" href={data.url || ''} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.title || 'Blog Post'} />
	<meta name="twitter:description" content={data.description || 'Read our latest blog post'} />
	<meta name="twitter:image" content={data.image || ''} />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if showContent}
	<div class="container-auto" in:fly={{ duration: 800, y: 50 }}>
		{#if errorMessage}
			<div class="text-red-500 text-xl p-4 text-center">
				<p>{errorMessage}</p>
			</div>
		{:else if data.post}
			<!-- Hero Section -->
			<section class="hero">
				{#if data.post.mainImage?.asset}
					<div class="hero-image" in:fade={{ duration: 1000 }}>
						<img
							src={urlFor(data.post.mainImage).width(1200).url()}
							alt={data.post.mainImage.alt || data.post.title || 'Post Image'}
							class="w-full h-auto object-cover rounded-xl shadow-lg"
						/>
					</div>
				{/if}
				<h1
					class="hero-title font-display text-[3.5rem] md:text-[5rem] leading-tight tracking-tight text-center"
					in:fly={{ duration: 800, y: 20, delay: 200 }}
				>
					{data.post.title || 'Untitled Post'}
				</h1>
			</section>

			<!-- Main Content -->
			<div class="content-grid">
				<!-- Sidebar (Metadata) -->
				<aside class="sidebar sticky top-20">
					<div class="metadata bg-[#f1efed] p-6 rounded-xl shadow-md">
						<div class="author flex items-center gap-4 mb-4">
							{#if data.post.author?.image?.asset}
								<img
									src={urlFor(data.post.author.image).width(60).url()}
									alt={data.post.author.name || 'Author'}
									class="w-12 h-12 rounded-full object-cover"
								/>
							{/if}
							<div>
								<p class="text-lg font-semibold">By {data.post.author?.name || 'Unknown Author'}</p>
								<p class="text-sm text-gray-600">
									{data.post.publishedAt
										? new Date(data.post.publishedAt).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})
										: 'No Date'}
								</p>
							</div>
						</div>
						{#if data.post.categories?.length}
							<div class="mb-4">
								<p class="text-sm font-semibold text-gray-700">Categories:</p>
								<div class="flex flex-wrap gap-2 mt-2">
									{#each data.post.categories as cat}
										<span class="category-tag">{cat.title || 'Unknown'}</span>
									{/each}
								</div>
							</div>
						{/if}
						{#if data.post.tags && data.post.tags.length}
							<div class="mb-4">
								<p class="text-sm font-semibold text-gray-700">Tags:</p>
								<div class="flex flex-wrap gap-2 mt-2">
									{#each data.post.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							</div>
						{/if}
						<div class="share-buttons flex gap-4">
							<button
								class="share-btn twitter"
								on:click={() => sharePost('twitter')}
								aria-label="Share on Twitter"
							>
								<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.6 8.6 0 01-2.72 1.04A4.28 4.28 0 0015.88 4c-2.37 0-4.3 1.93-4.3 4.3 0 .34.04.67.11.98A12.2 12.2 0 012.07 4.76a4.3 4.3 0 001.33 5.73 4.27 4.27 0 01-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21a4.3 4.3 0 01-1.94.07 4.3 4.3 0 004.01 2.98A8.6 8.6 0 010 19.54a12.14 12.14 0 006.58 1.93c7.9 0 12.22-6.54 12.22-12.22 0-.19 0-.37-.01-.56A8.7 8.7 0 0022.46 6z"
									/>
								</svg>
							</button>
							<button
								class="share-btn linkedin"
								on:click={() => sharePost('linkedin')}
								aria-label="Share on LinkedIn"
							>
								<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.89 1.63-1.83 3.35-1.83 3.58 0 4.24 2.36 4.24 5.43v6.29zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .8 0 1.78v20.44C0 23.2.8 24 1.78 24h20.44c.98 0 1.78-.8 1.78-1.78V1.78C24 .8 23.2 0 22.22 0z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</aside>

				<!-- Article Content -->
				<article class="content">
					<div class="prose prose-xl max-w-none">
						{#if data.post.content}
							<PortableText value={data.post.content} />
						{:else}
							<p class="text-gray-600">No content available.</p>
						{/if}
					</div>
				</article>
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

	/* Hero Section */
	.hero {
		position: relative;
		margin-bottom: 4rem;
	}
	.hero-image {
		position: relative;
		height: 60vh;
		max-height: 600px;
		overflow: hidden;
		border-radius: 1rem;
	}
	.hero-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	.hero-image:hover img {
		transform: scale(1.05);
	}
	.hero-title {
		font-family: 'Playfair Display', serif;
		color: #151515;
		margin: 2rem 0 1rem;
	}

	/* Content Grid */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 2rem;
		margin-bottom: 4rem;
	}
	@media (max-width: 768px) {
		.content-grid {
			grid-template-columns: 1fr;
		}
	}

	/* Sidebar */
	.sidebar {
		padding-top: 1rem;
	}
	.metadata {
		border: 1px solid #e5e1dc;
	}
	.category-tag {
		display: inline-block;
		background: #151515;
		color: #f1efed;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
	}
	.tag {
		display: inline-block;
		background: #e5e1dc;
		color: #151515;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
	}
	.share-buttons {
		margin-top: 1rem;
	}
	.share-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
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

	/* Content */
	.content {
		font-family: 'Inter', sans-serif;
		line-height: 1.8;
	}
	.prose {
		color: #151515;
	}
	.prose :global(h2) {
		font-family: 'Playfair Display', serif;
		font-size: 2.25rem;
		font-weight: 700;
		margin-top: 2.5rem;
		color: #151515;
	}
	.prose :global(h3) {
		font-family: 'Inter', sans-serif;
		font-size: 1.75rem;
		font-weight: 600;
		margin-top: 2rem;
		color: #151515;
	}
	.prose :global(p) {
		margin-bottom: 1.25rem;
		color: #333;
	}
	.prose :global(pre) {
		background: #f1efed;
		padding: 1.5rem;
		border-radius: 0.75rem;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.6;
	}
	.prose :global(code) {
		background: #e5e1dc;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}
	.prose :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1.25rem;
	}
	.prose :global(li) {
		margin-bottom: 0.5rem;
	}

	/* Responsive Adjustments */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2.5rem;
		}
		.hero-image {
			height: 40vh;
		}
		.sidebar {
			position: static;
		}
	}
</style>
