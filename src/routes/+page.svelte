<script lang="ts">
	export let data;

	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Project from '$lib/components/Project.svelte';
	import Experience from '$lib/components/Experience.svelte';

	// Static meta data
	const metaData = {
		title: 'Joy Karmakar Portfolio - Full Stack Developer',
		description: 'Portfolio of Joy - Full Stack Developer specializing in modern web technologies',
		url: 'https://joykarmakar.vercel.app',
		image: 'https://joykarmakar.vercel.app/joy.jpg',
		siteName: 'joykarmakar Portfolio',
		twitterHandle: '@JoyKarmakar9871'
	};
</script>

<svelte:head>
	<title>{data?.title || metaData.title}</title>
	<meta name="description" content={data?.description || metaData.description} />

	<meta
		name="keywords"
		content="portfolio, full stack developer, web developer, Animation,Figma,CSS, GitHub, MongoDB, Docker, Node Js, HTML,Git, GSAP,JavaScript, Python, PostgreSQL, Svelte, Redux, Redis"
	/>
	<meta name="author" content="Joy Karmakar" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Open Graph Meta Tags -->
	<meta property="og:title" content={data?.title || metaData.title} />
	<meta property="og:description" content={data?.description || metaData.description} />
	<meta property="og:url" content={data?.url || metaData.url} />
	<meta property="og:image" content={data?.image || metaData.image} />
	<meta property="og:image:type" content="image/jpg" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={data?.siteName || metaData.siteName} />
	<link rel="canonical" href={data?.url || metaData.url} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={data?.twitterHandle || metaData.twitterHandle} />
	<meta name="twitter:creator" content={data?.twitterHandle || metaData.twitterHandle} />
	<meta name="twitter:title" content={data?.title || metaData.title} />
	<meta name="twitter:description" content={data?.description || metaData.description} />
	<meta name="twitter:image" content={data?.image || metaData.image} />
</svelte:head>

<Hero />

<Project />

<About />

<Experience />
