<!-- src/routes/works/[slug]/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoading, error, fetchPostBySlug } from '$lib/stores/posts';
	import type { Work } from '$lib/types/post';
	import { urlFor } from '$lib/sanity';

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
		<div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
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
	<article class="max-w-4xl mx-auto px-4 py-12">
		<!-- Header -->
		<header class="mb-8">
			<div class="flex items-center justify-between mb-4">
				<h1 class="text-4xl font-bold text-gray-900">{work.title}</h1>
				<span
					class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
				>
					{work.type}
				</span>
			</div>
		</header>

		<!-- Main content -->
		<div class="prose prose-lg max-w-none">
			{#if work.image}
				<div class="relative aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
					<img
						src={urlFor(work.image)}
						alt={work.title}
						class="absolute inset-0 w-full h-full object-cover"
					/>
				</div>
			{/if}

			<div class="bg-white rounded-lg shadow-sm p-6">
				<h2 class="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
				<p class="text-gray-600">{work.description}</p>
			</div>

			<!-- Additional content sections can be added here based on your Work type -->
		</div>
	</article>
{:else}
	<div class="flex justify-center items-center min-h-[500px]">
		<p class="text-gray-500">Work not found.</p>
	</div>
{/if}
