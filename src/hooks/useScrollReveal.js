import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
    const elementRef = useRef(null);
    const { threshold = 0.1, rootMargin = '0px' } = options;

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold,
                rootMargin
            }
        );

        element.classList.add('reveal');
        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin]);

    return elementRef;
}

