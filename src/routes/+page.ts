import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        title: 'Joy Karmakar - Web Developer',
        description:
            'Explore the portfolio of Joy Karmakar, a web developer and designer specializing in building beautiful, functional websites using modern technologies.',
        url: 'https://joykarmakar.vercel.app',
        image: 'https://joykarmakar.vercel.app/joy.jpg',
        siteName: 'Joy Karmakar Portfolio',
        twitterHandle: '@joykarmakar'
    };
};
