import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    // ── 1. Per-element observer: adds `visible` when in view ─────────────────
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve once visible to improve scroll performance and prevent scroll-up reset/jitter
            elementObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '-80px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll(
      '.anim-rise, .anim-pop, .anim-slide-left, .anim-slide-right, .anim-flip, ' +
      // legacy class support
      '.animate-on-scroll, .slide-in-left-scroll, .slide-in-right-scroll'
    );
    targets.forEach((el) => elementObserver.observe(el));

    // ── 2. Cascade observer: staggers direct children of [data-cascade] ──────
    const cascadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const parent = entry.target;
          if (entry.isIntersecting) {
            const children = parent.querySelectorAll(':scope > *');
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * 80}ms`;
              child.classList.add('cascade-visible');
            });
            parent.dataset.cascadeTriggered = 'true';
            // Unobserve once visible to improve scroll performance and prevent scroll-up reset/jitter
            cascadeObserver.unobserve(parent);
          }
        });
      },
      { threshold: 0.08, rootMargin: '-80px 0px -30px 0px' }
    );

    const cascadeParents = document.querySelectorAll('[data-cascade]');
    cascadeParents.forEach((el) => {
      // Mark each child as a cascade item
      el.querySelectorAll(':scope > *').forEach((child) => {
        child.classList.add('cascade-child');
      });
      cascadeObserver.observe(el);
    });

    return () => {
      targets.forEach((el) => {
        try { elementObserver.unobserve(el); } catch (e) {}
      });
      cascadeParents.forEach((el) => {
        try { cascadeObserver.unobserve(el); } catch (e) {}
      });
    };
  }, []);
};

export default useScrollAnimation;
