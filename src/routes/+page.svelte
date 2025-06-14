<script lang="ts">
	export let data;

	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Project from '$lib/components/Project.svelte';
	import Experience from '$lib/components/Experience.svelte';
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:url" content={data.url} />
	<meta property="og:image" content={data.image} />
	<meta property="og:image:type" content="image/jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={data.siteName} />
	<link rel="canonical" href={data.url} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={data.twitterHandle} />
	<meta name="twitter:creator" content={data.twitterHandle} />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image" content={data.image} />
</svelte:head>

<Hero />

<Project />

<About />

<Experience />
