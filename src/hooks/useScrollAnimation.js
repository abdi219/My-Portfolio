import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    // ── 1. Per-element observer: adds `visible` when in view ─────────────────
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Only reset (remove visible) if it exits the bottom of the viewport
            // (boundingClientRect.top is positive and entry is not intersecting)
            if (entry.boundingClientRect.top > 0) {
              entry.target.classList.remove('visible');
            }
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
          } else {
            // Only reset if it exits the bottom of the viewport
            if (entry.boundingClientRect.top > 0) {
              const children = parent.querySelectorAll(':scope > *');
              children.forEach((child) => {
                child.style.transitionDelay = '';
                child.classList.remove('cascade-visible');
              });
              delete parent.dataset.cascadeTriggered;
            }
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
      targets.forEach((el) => elementObserver.unobserve(el));
      cascadeParents.forEach((el) => cascadeObserver.unobserve(el));
    };
  }, []);
};

export default useScrollAnimation;
