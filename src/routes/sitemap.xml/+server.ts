import { client } from '$lib/sanity.js';
import { xml } from '@sveltejs/kit';

export async function GET() {
    const site = 'https://joykarmakar.vercel.app';

    // Fetch all slugs of works
    const works = await client.fetch(`*[_type == "work"]{ "slug": slug.current }`);

    const urls = [
        { loc: `${site}/`, priority: 1.0 },
        { loc: `${site}/about`, priority: 0.8 },
        { loc: `${site}/contact`, priority: 0.8 },
        ...works.map((w: { slug: string }) => ({
            loc: `${site}/works/${w.slug}`,
            priority: 0.7
        }))
    ];

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
	${urls
            .map(
                (url) => `<url>
	<loc>${url.loc}</loc>
	<priority>${url.priority}</priority>
</url>`
            )
            .join('\n')}
</urlset>`;

    return xml(xmlContent, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}
