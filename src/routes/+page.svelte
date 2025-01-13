<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Project from '$lib/components/Project.svelte';
	import Experience from '$lib/components/Experience.svelte';
</script>

<head>
	<title> Joy Karmakar - Web Developer </title>
	<meta
		name="description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta name="author" content="Joy Karmakar" />
	<meta property="og:title" content="Joy Karmakar - Web Developer" />
	<meta
		property="og:description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta property="og:image" content="https://joykarmakar.vercel.app/joy.PNG" />
	<meta property="og:url" content="https://joykarmakar.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="https://joykarmakar.vercel.app/joy.PNG" />
	<meta name="twitter:title" content="Joy Karmakar - Web Developer" />
	<meta
		name="twitter:description"
		content="Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies."
	/>
	<meta name="twitter:image" content="https://joykarmakar.vercel.app/joy.PNG" />
</head>

<Hero />

<Project />

<About />

<Experience />
