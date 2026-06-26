import { useEffect } from 'react';

const useScrollAnimation = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // Remove visible class when element leaves viewport
                    // This allows the animation to re-trigger when scrolling back
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.animate-on-scroll, .slide-in-left-scroll, .slide-in-right-scroll'
        );

        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, []);
};

export default useScrollAnimation;
