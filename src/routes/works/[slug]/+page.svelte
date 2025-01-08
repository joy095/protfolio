<!-- src/routes/works/[slug]/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoading, error, fetchPostBySlug } from '$lib/stores/posts';
	import type { Work } from '$lib/types/post';
	import { urlFor } from '$lib/sanity';
	import ParallaxScroll from '$lib/components/ParallaxScroll.svelte';

	export let data: { work: Work | null };

	let work: Work | null = data.work;

	onMount(async () => {
		if (!work && window) {
			const slug = window.location.pathname.split('/').pop();
			if (slug) {
				work = await fetchPostBySlug(slug);
			}
		}
	});
</script>

{#if $isLoading}
	<div class="flex justify-center items-center min-h-[500px]">
		<div
			class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
		></div>
	</div>
{:else if $error}
	<div class="max-w-3xl mx-auto px-4 py-12">
		<div class="bg-red-50 border-l-4 border-red-400 p-4">
			<div class="flex">
				<div class="flex-shrink-0">
					<svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<div class="ml-3">
					<p class="text-sm text-red-700">{$error}</p>
				</div>
			</div>
		</div>
	</div>
{:else if work}
	<article class="container-auto my-40">
		<!-- Header -->
		<header class="mb-3 relative pb-2 overflow-hidden">
			<div class="nav-border"></div>
			<div class="flex items-end justify-between gap-5 mb-4">
				<h1 class="text-7xl font-bold text-gray-900">{work.title}</h1>
				<span class="rounded-full text-2xl font-medium">
					{work.description}
				</span>
			</div>
		</header>

		<!-- Main content -->
		<div class="prose prose-lg max-w-none">
			<div class="flex items-end flex-col gap-5 mb-8">
				{#if work.link}
					<a
						class="text-xl font-medium button overflow-hidden flex items-center gap-2"
						target="_blank"
						href={work.link}
						>View live website
						<img class="h-4 w-4" src="/icons/arrow-black.svg" alt="icon" />
					</a>
				{/if}
			</div>
			<div class="flex flex-col gap-5">
				{#if work.image}
					<ParallaxScroll speed={0.2}>
						<img
							loading="lazy"
							src={urlFor(work.image)}
							alt={work.title}
							class="w-full h-[90vh] object-cover"
						/>
					</ParallaxScroll>
				{/if}

				{#if work.image_2}
					<ParallaxScroll speed={0.2}>
						<div class="bg-[#c3c2be] px-[10%] pt-[15%]">
							<img
								loading="lazy"
								src={urlFor(work.image_2)}
								alt={work.title}
								class="w-full h-[90vh] object-cover"
							/>
						</div>
					</ParallaxScroll>
				{/if}

				<div class="grid grid-cols-2 gap-5">
					{#if work.image_4}
						<ParallaxScroll speed={0.2}>
							<div class="bg-[#c3c2be] px-[10%] pt-[15%]">
								<img
									loading="lazy"
									src={urlFor(work.image_4)}
									alt={work.title}
									class="w-full h-[90vh] object-cover"
								/>
							</div>
						</ParallaxScroll>
					{/if}
					{#if work.image_5}
						<ParallaxScroll speed={0.2}>
							<div class="bg-[#c3c2be] px-[10%] pt-[15%]">
								<img
									loading="lazy"
									src={urlFor(work.image_5)}
									alt={work.title}
									class="w-full h-[90vh] object-cover"
								/>
							</div>
						</ParallaxScroll>
					{/if}
				</div>

				{#if work.image_3}
					<ParallaxScroll speed={0.2}>
						<div class="bg-[#c3c2be] px-[10%] pt-[15%]">
							<img
								loading="lazy"
								src={urlFor(work.image_3)}
								alt={work.title}
								class="w-full h-[90vh] object-cover"
							/>
						</div>
					</ParallaxScroll>
				{/if}
			</div>
			<!-- Additional content sections can be added here based on your Work type -->
		</div>
	</article>
{:else}
	<div class="flex justify-center items-center min-h-[500px]">
		<p class="text-gray-500">Work not found.</p>
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
		opacity: 0;
		animation: border 1.2s ease-in-out 0.4s forwards;
	}

	@keyframes border {
		0% {
			right: 100%;
			opacity: 1;
		}
		100% {
			right: 0;
			opacity: 1;
		}
	}

	.button {
		position: relative;
		cursor: pointer;
		overflow: hidden;
		width: fit-content;
	}

	.button:hover img {
		rotate: 45deg;
		transition: rotate 0.4s ease;
	}
	.button:not(:hover) img {
		rotate: 0deg;
		transition: rotate 0.4s ease;
	}

	.button::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: -100%;
		height: 2px;
		width: 100%;
		background-color: #151515;
		transition: left 0.4s ease;
	}

	.button:hover::before {
		animation: slideIn 0.4s ease forwards;
	}

	.button:not(:hover)::before {
		animation: slideOut 0.4s ease forwards;
	}

	@keyframes slideIn {
		0% {
			left: -100%;
		}
		100% {
			left: 0%;
		}
	}

	@keyframes slideOut {
		0% {
			left: 0%;
		}
		100% {
			left: 100%;
		}
	}
</style>
