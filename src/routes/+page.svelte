<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Project from '$lib/components/Project.svelte';
	import Experience from '$lib/components/Experience.svelte';
</script>

<svelte:head>
	<title>Joy Karmakar - Web Developer</title>
	<meta
		name="description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>

	<meta property="og:title" content="Joy Karmakar - Web Developer" />
	<meta
		property="og:description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta property="og:url" content="https://joykarmakar.vercel.app" />

	<link rel="canonical" href="https://joykarmakar.vercel.app" />

	<meta property="og:image:type" content="image/jpg" />
	<meta property="og:image" content="https://joykarmakar.vercel.app/joy.jpg" />
	<meta property="og:url" content="https://joykarmakar.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Joy Karmakar Portfolio" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@joykarmakar" />
	<meta name="twitter:creator" content="@joykarmakar" />
	<meta name="twitter:title" content="Joy Karmakar - Web Developer" />
	<meta
		name="twitter:description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta name="twitter:image" content="https://joykarmakar.vercel.app/joy.jpg" />
</svelte:head>

<Hero />

<Project />

<About />

<Experience />
