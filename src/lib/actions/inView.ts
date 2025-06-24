export function inView(node: HTMLElement, options?: IntersectionObserverInit) {
    let observer: IntersectionObserver;
    let hasIntersected = false; // Add a flag to track if it has intersected

    const observe = () => {
        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!hasIntersected) { // Only dispatch 'inview' if it hasn't intersected before
                        node.dispatchEvent(new CustomEvent('inview'));
                        hasIntersected = true; // Set flag to true
                        // Disconnect observer after the first intersection to prevent re-triggering
                        observer.unobserve(node);
                    }
                }
                // We no longer dispatch 'outview' if we want the animation to run only once and then stop observing.
                // If you later decide you *do* want to reset when out of view, you'd add this back
                // and reconsider the observer.unobserve(node) logic.
            });
        }, options);

        observer.observe(node);
    };

    observe();

    return {
        update(newOptions: IntersectionObserverInit) {
            // If you want the animation to potentially re-run if options change *and* it's out of view,
            // you'd add more complex logic here. For "run once", usually `update` won't be used
            // to re-trigger after the initial run. We can simplify this if the action is truly for "run once".
            // For now, let's keep the existing logic, but acknowledge it might not be strictly needed for
            // a single-run animation purpose.
            const optionsChanged = JSON.stringify(options) !== JSON.stringify(newOptions);
            if (optionsChanged) {
                options = newOptions;
                // If options change, and we want to allow it to run again, reset hasIntersected and re-observe
                if (!hasIntersected) { // Only re-observe if it hasn't run yet
                    observe();
                }
            }
        },
        destroy() {
            if (observer) {
                observer.disconnect();
            }
        }
    };
}