<script lang="ts">
    import About from '$lib/components/About.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import Project from '$lib/components/Project.svelte';
    import Experience from '$lib/components/Experience.svelte';

    import type { PageData } from './$types'; // Correct type for page data

    export let data: PageData; // Data from the load functions
    const { posts, meta, error } = data; // Destructure all relevant data

    console.log("Data in +page.svelte:", data); // Now this should log posts and meta
</script>

<svelte:head>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />

    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:url" content={meta.url} />
    <meta property="og:image" content={meta.image} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={meta.siteName} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={meta.title} />
    <meta name="twitter:description" content={meta.description} />
    <meta name="twitter:image" content={meta.image} />
    <meta name="twitter:site" content={meta.twitterHandle} />
    <meta name="twitter:creator" content={meta.twitterHandle} />
</svelte:head>

<Hero />

<Project {posts} {error} />

<About />

<Experience />