const REVEAL_SELECTOR = '.section__header, .card, .media, .timeline__item, .contact__row, .form, .detail-block';
const VISIBLE_CLASS = 'is-visible';
const STAGGER_MS = 45; // short so grids don't feel slow
const MAX_STAGGER_STEPS = 3;

// small delay between neighbors so grids come in one by one
function assignDelays(targets) {
  const seen = new Map();
  targets.forEach((target) => {
    const count = seen.get(target.parentElement) ?? 0;
    seen.set(target.parentElement, count + 1);
    target.style.setProperty('--reveal-delay', `${Math.min(count, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
  });
}

// fade elements in once when they scroll into view. just show them if the browser can't
export function initReveal(root = document) {
  const targets = root.querySelectorAll(REVEAL_SELECTOR);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  assignDelays(targets);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(VISIBLE_CLASS);
        observer.unobserve(entry.target);
      }
    },
    // start a bit before it reaches the screen
    { threshold: 0, rootMargin: '0px 0px 12% 0px' },
  );

  targets.forEach((target) => {
    target.classList.add('reveal');
    observer.observe(target);
  });

  // safety net: if the observer doesn't fire (hidden tab etc.) check the positions on load, scroll and resize
  const revealVisible = () => {
    targets.forEach((target) => {
      if (target.classList.contains(VISIBLE_CLASS)) return;
      const { top, bottom } = target.getBoundingClientRect();
      if (bottom > 0 && top < window.innerHeight * 1.1) {
        target.classList.add(VISIBLE_CLASS);
        observer.unobserve(target);
      }
    });
  };
  let queued = false;
  const queueCheck = () => {
    if (queued) return;
    queued = true;
    // setTimeout, not requestAnimationFrame, so it runs in tabs that aren't painted
    setTimeout(() => {
      queued = false;
      revealVisible();
    }, 60);
  };
  window.addEventListener('scroll', queueCheck, { passive: true });
  window.addEventListener('resize', queueCheck);
  window.addEventListener('hashchange', queueCheck);
  setTimeout(revealVisible, 400);
  setTimeout(revealVisible, 1500);
  // last resort: after a few seconds show everything, then stop listening
  setTimeout(() => {
    targets.forEach((target) => target.classList.add(VISIBLE_CLASS));
    window.removeEventListener('scroll', queueCheck);
    window.removeEventListener('resize', queueCheck);
    window.removeEventListener('hashchange', queueCheck);
  }, 6000);

  // the timeline line draws itself when it comes into view
  const drawObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.replace('is-pending', 'is-drawn');
        drawObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );
  root.querySelectorAll('.timeline').forEach((timeline) => {
    timeline.classList.add('is-pending');
    drawObserver.observe(timeline);
  });
}
