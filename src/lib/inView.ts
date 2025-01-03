// src/lib/inView.js
export function inView(node: Element, { threshold = 0.1, root = null, rootMargin = '0px' } = {}) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.dispatchEvent(new CustomEvent('enterview'));
			}
		},
		{ threshold, root, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
