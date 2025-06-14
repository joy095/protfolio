<script lang="ts">
	export let data;

	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Project from '$lib/components/Project.svelte';
	import Experience from '$lib/components/Experience.svelte';

	// Fallback meta data in case server load fails
	const fallbackMeta = {
		title: 'Joy Karmakar - Full Stack Developer & UI/UX Designer',
		description:
			'Portfolio of Joy Karmakar - Full Stack Developer specializing in React, Svelte, Node.js and modern web technologies.',
		url: 'https://joykarmakar.vercel.app',
		image: 'https://joykarmakar.vercel.app/joy.jpg',
		siteName: 'Joy Karmakar Portfolio',
		twitterHandle: '@JoyKarmakar9871'
	};

	// Use data from server or fallback
	$: metaTitle = data?.title || fallbackMeta.title;
	$: metaDescription = data?.description || fallbackMeta.description;
	$: metaUrl = data?.url || fallbackMeta.url;
	$: metaImage = data?.image || fallbackMeta.image;
	$: metaSiteName = data?.siteName || fallbackMeta.siteName;
	$: metaTwitterHandle = data?.twitterHandle || fallbackMeta.twitterHandle;
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={metaDescription} />

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:url" content={metaUrl} />
	<meta property="og:image" content={metaImage} />
	<meta property="og:image:type" content="image/jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={metaSiteName} />
	<link rel="canonical" href={metaUrl} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={metaTwitterHandle} />
	<meta name="twitter:creator" content={metaTwitterHandle} />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={metaDescription} />
	<meta name="twitter:image" content={metaImage} />

	<!-- Additional SEO Meta Tags -->
	<meta
		name="keywords"
		content="Joy Karmakar, Full Stack Developer, React, Svelte, Node.js, Portfolio, Web Developer"
	/>
	<meta name="author" content="Joy Karmakar" />
	<meta name="robots" content="index, follow" />
</svelte:head>

<Hero />

<Project />

<About />

<Experience />
