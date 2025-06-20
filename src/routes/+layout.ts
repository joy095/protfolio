import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
    // Base meta tags for the entire site
    return {
        meta: {
            title: 'Joy Karmakar - Full Stack Developer & UI/UX Designer',
            description: 'Portfolio of Joy Karmakar - Full Stack Developer specializing in React, Svelte, Node.js and modern web technologies.',
            url: url.href,
            image: 'https://joykarmakar.vercel.app/logo.webp',
            siteName: 'Joy Karmakar Portfolio',
            twitterHandle: '@JoyKarmakar9871'
        }
    };
};