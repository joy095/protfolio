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
			case 'x':
				url = `https://x.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(shareTitle)}`;
				break;
			case 'linkedin':
				url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&text=${encodeURIComponent(shareTitle)}`;
				break;
			case 'reddit':
				url = `https://www.reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent(shareTitle)}`;
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
							<button class="share-btn x" on:click={() => sharePost('x')} aria-label="Share on x">
								<svg class="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true"
									><g
										><path
											d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
										></path></g
									></svg
								>
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
							<button
								class="share-btn reddit"
								on:click={() => sharePost('reddit')}
								aria-label="Share on reddit"
							>
								<svg
									class="w-5 h-5"
									width="32"
									height="32"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 216 216"
									xml:space="preserve"
									xmlns:xlink="http://www.w3.org/1999/xlink"
								>
									<defs>
										<style>
											.snoo-cls-1 {
												fill: url(#snoo-radial-gragient) white;
											}

											.snoo-cls-1,
											.snoo-cls-2,
											.snoo-cls-3,
											.snoo-cls-4,
											.snoo-cls-5,
											.snoo-cls-6,
											.snoo-cls-7,
											.snoo-cls-8,
											.snoo-cls-9,
											.snoo-cls-10,
											.snoo-cls-11 {
												stroke-width: 0px;
											}

											.snoo-cls-2 {
												fill: url(#snoo-radial-gragient-2) white;
											}

											.snoo-cls-3 {
												fill: url(#snoo-radial-gragient-3) white;
											}

											.snoo-cls-4 {
												fill: url(#snoo-radial-gragient-4) #fc4301;
											}

											.snoo-cls-5 {
												fill: url(#snoo-radial-gragient-6) black;
											}

											.snoo-cls-6 {
												fill: url(#snoo-radial-gragient-8) black;
											}

											.snoo-cls-7 {
												fill: url(#snoo-radial-gragient-5) #fc4301;
											}

											.snoo-cls-8 {
												fill: url(#snoo-radial-gragient-7) white;
											}

											.snoo-cls-9 {
												fill: #842123;
											}

											.snoo-cls-10 {
												fill: #ff4500;
											}

											.snoo-cls-11 {
												fill: #ffc49c;
											}
										</style>
										<radialGradient
											id="snoo-radial-gragient"
											cx="169.75"
											cy="92.19"
											fx="169.75"
											fy="92.19"
											r="50.98"
											gradientTransform="translate(0 11.64) scale(1 .87)"
											gradientUnits="userSpaceOnUse"
										>
											<stop offset="0" stop-color="#feffff"></stop>
											<stop offset=".4" stop-color="#feffff"></stop>
											<stop offset=".51" stop-color="#f9fcfc"></stop>
											<stop offset=".62" stop-color="#edf3f5"></stop>
											<stop offset=".7" stop-color="#dee9ec"></stop>
											<stop offset=".72" stop-color="#d8e4e8"></stop>
											<stop offset=".76" stop-color="#ccd8df"></stop>
											<stop offset=".8" stop-color="#c8d5dd"></stop>
											<stop offset=".83" stop-color="#ccd6de"></stop>
											<stop offset=".85" stop-color="#d8dbe2"></stop>
											<stop offset=".88" stop-color="#ede3e9"></stop>
											<stop offset=".9" stop-color="#ffebef"></stop>
										</radialGradient>
										<radialGradient
											id="snoo-radial-gragient-2"
											cx="47.31"
											fx="47.31"
											r="50.98"
											xlink:href="#snoo-radial-gragient"
										></radialGradient>
										<radialGradient
											id="snoo-radial-gragient-3"
											cx="109.61"
											cy="85.59"
											fx="109.61"
											fy="85.59"
											r="153.78"
											gradientTransform="translate(0 25.56) scale(1 .7)"
											xlink:href="#snoo-radial-gragient"
										></radialGradient>
										<radialGradient
											id="snoo-radial-gragient-4"
											cx="-6.01"
											cy="64.68"
											fx="-6.01"
											fy="64.68"
											r="12.85"
											gradientTransform="translate(81.08 27.26) scale(1.07 1.55)"
											gradientUnits="userSpaceOnUse"
										>
											<stop offset="0" stop-color="#f60"></stop>
											<stop offset=".5" stop-color="#ff4500"></stop>
											<stop offset=".7" stop-color="#fc4301"></stop>
											<stop offset=".82" stop-color="#f43f07"></stop>
											<stop offset=".92" stop-color="#e53812"></stop>
											<stop offset="1" stop-color="#d4301f"></stop>
										</radialGradient>
										<radialGradient
											id="snoo-radial-gragient-5"
											cx="-73.55"
											cy="64.68"
											fx="-73.55"
											fy="64.68"
											r="12.85"
											gradientTransform="translate(62.87 27.26) rotate(-180) scale(1.07 -1.55)"
											xlink:href="#snoo-radial-gragient-4"
										></radialGradient>
										<radialGradient
											id="snoo-radial-gragient-6"
											cx="107.93"
											cy="166.96"
											fx="107.93"
											fy="166.96"
											r="45.3"
											gradientTransform="translate(0 57.4) scale(1 .66)"
											gradientUnits="userSpaceOnUse"
										>
											<stop offset="0" stop-color="#172e35"></stop>
											<stop offset=".29" stop-color="#0e1c21"></stop>
											<stop offset=".73" stop-color="#030708"></stop>
											<stop offset="1" stop-color="#000"></stop>
										</radialGradient>
										<radialGradient
											id="snoo-radial-gragient-7"
											cx="147.88"
											cy="32.94"
											fx="147.88"
											fy="32.94"
											r="39.77"
											gradientTransform="translate(0 .54) scale(1 .98)"
											xlink:href="#snoo-radial-gragient"
										></radialGradient>
										<radialGradient
											id="snoo-radial-gragient-8"
											cx="131.31"
											cy="73.08"
											fx="131.31"
											fy="73.08"
											r="32.6"
											gradientUnits="userSpaceOnUse"
										>
											<stop offset=".48" stop-color="#7a9299"></stop>
											<stop offset=".67" stop-color="#172e35"></stop>
											<stop offset=".75" stop-color="#000"></stop>
											<stop offset=".82" stop-color="#172e35"></stop>
										</radialGradient>
									</defs>
									<path
										class="snoo-cls-10"
										d="m108,0h0C48.35,0,0,48.35,0,108h0c0,29.82,12.09,56.82,31.63,76.37l-20.57,20.57c-4.08,4.08-1.19,11.06,4.58,11.06h92.36s0,0,0,0c59.65,0,108-48.35,108-108h0C216,48.35,167.65,0,108,0Z"
									></path>
									<circle class="snoo-cls-1" cx="169.22" cy="106.98" r="25.22"></circle>
									<circle class="snoo-cls-2" cx="46.78" cy="106.98" r="25.22"></circle>
									<ellipse class="snoo-cls-3" cx="108.06" cy="128.64" rx="72" ry="54"></ellipse>
									<path
										class="snoo-cls-4"
										d="m86.78,123.48c-.42,9.08-6.49,12.38-13.56,12.38s-12.46-4.93-12.04-14.01c.42-9.08,6.49-15.02,13.56-15.02s12.46,7.58,12.04,16.66Z"
									></path>
									<path
										class="snoo-cls-7"
										d="m129.35,123.48c.42,9.08,6.49,12.38,13.56,12.38s12.46-4.93,12.04-14.01c-.42-9.08-6.49-15.02-13.56-15.02s-12.46,7.58-12.04,16.66Z"
									></path>
									<ellipse class="snoo-cls-11" cx="79.63" cy="116.37" rx="2.8" ry="3.05"></ellipse>
									<ellipse class="snoo-cls-11" cx="146.21" cy="116.37" rx="2.8" ry="3.05"></ellipse>
									<path
										class="snoo-cls-5"
										d="m108.06,142.92c-8.76,0-17.16.43-24.92,1.22-1.33.13-2.17,1.51-1.65,2.74,4.35,10.39,14.61,17.69,26.57,17.69s22.23-7.3,26.57-17.69c.52-1.23-.33-2.61-1.65-2.74-7.77-.79-16.16-1.22-24.92-1.22Z"
									></path>
									<circle class="snoo-cls-8" cx="147.49" cy="49.43" r="17.87"></circle>
									<path
										class="snoo-cls-6"
										d="m107.8,76.92c-2.14,0-3.87-.89-3.87-2.27,0-16.01,13.03-29.04,29.04-29.04,2.14,0,3.87,1.73,3.87,3.87s-1.73,3.87-3.87,3.87c-11.74,0-21.29,9.55-21.29,21.29,0,1.38-1.73,2.27-3.87,2.27Z"
									></path>
									<path
										class="snoo-cls-9"
										d="m62.82,122.65c.39-8.56,6.08-14.16,12.69-14.16,6.26,0,11.1,6.39,11.28,14.33.17-8.88-5.13-15.99-12.05-15.99s-13.14,6.05-13.56,15.2c-.42,9.15,4.97,13.83,12.04,13.83.17,0,.35,0,.52,0-6.44-.16-11.3-4.79-10.91-13.2Z"
									></path>
									<path
										class="snoo-cls-9"
										d="m153.3,122.65c-.39-8.56-6.08-14.16-12.69-14.16-6.26,0-11.1,6.39-11.28,14.33-.17-8.88,5.13-15.99,12.05-15.99,7.07,0,13.14,6.05,13.56,15.2.42,9.15-4.97,13.83-12.04,13.83-.17,0-.35,0-.52,0,6.44-.16,11.3-4.79,10.91-13.2Z"
									></path>
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
		cursor: pointer;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
	}
	.share-btn:hover {
		background: #333;
		transform: scale(1.1);
	}
	.share-btn.x {
		background: #ffffff;
	}
	.share-btn.linkedin {
		background: #0077b5;
	}
	.share-btn.reddit {
		background: #ff4500;
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
