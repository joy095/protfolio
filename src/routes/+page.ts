import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
    const pageUrl = url.href;

    return {
        title: 'Joy Karmakar - Full Stack Developer & UI/UX Designer',
        description: 'Portfolio of Joy Karmakar - Full Stack Developer specializing in React, Svelte, Node.js and modern web technologies. Explore my projects and experience.',
        url: pageUrl, // Use the actual page URL
        image: 'https://joykarmakar.vercel.app/logo.webp',
        siteName: 'Joy Karmakar Portfolio',
        twitterHandle: '@JoyKarmakar9871'
    };
};