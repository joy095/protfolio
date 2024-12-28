import * as LenisModule from '@studio-freight/lenis';

const Lenis = LenisModule.default;

export const initializeLenis = () => {
	const lenis = new (Lenis as any)({
		lerp: 0.1,
		smoothWheel: true
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);
};
