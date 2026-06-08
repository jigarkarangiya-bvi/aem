import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  // Slider setup
  const sliderWrapper = document.createElement('div');
  sliderWrapper.className = 'cards-slider-wrapper';
  sliderWrapper.append(ul);

  const prevBtn = document.createElement('button');
  prevBtn.className = 'cards-slider-btn cards-slider-prev';
  prevBtn.innerHTML = '←';
  prevBtn.setAttribute('aria-label', 'Previous');

  const nextBtn = document.createElement('button');
  nextBtn.className = 'cards-slider-btn cards-slider-next';
  nextBtn.innerHTML = '→';
  nextBtn.setAttribute('aria-label', 'Next');

  sliderWrapper.append(prevBtn, nextBtn);
  block.replaceChildren(sliderWrapper);

  // Scroll logic
  const scrollAmount = () => {
    // Scroll by the width of one card + gap
    const card = ul.querySelector('li');
    return card ? card.offsetWidth + 24 : ul.clientWidth / 2;
  };

  prevBtn.addEventListener('click', () => {
    ul.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    ul.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  const toggleButtons = () => {
    prevBtn.disabled = ul.scrollLeft <= 0;
    // Add small buffer to avoid floating point issues
    nextBtn.disabled = ul.scrollLeft >= (ul.scrollWidth - ul.clientWidth - 5);
  };

  ul.addEventListener('scroll', toggleButtons, { passive: true });

  // Drag to scroll logic for desktop
  let isDown = false;
  let startX;
  let scrollLeft;

  ul.addEventListener('mousedown', (e) => {
    isDown = true;
    ul.classList.add('is-dragging');
    ul.style.scrollSnapType = 'none'; // Disable snap while dragging
    ul.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
    startX = e.pageX - ul.offsetLeft;
    scrollLeft = ul.scrollLeft;
  });

  ul.addEventListener('mouseleave', () => {
    isDown = false;
    ul.classList.remove('is-dragging');
    ul.style.scrollSnapType = 'x mandatory';
    ul.style.scrollBehavior = 'smooth';
  });

  ul.addEventListener('mouseup', () => {
    isDown = false;
    ul.classList.remove('is-dragging');
    ul.style.scrollSnapType = 'x mandatory';
    ul.style.scrollBehavior = 'smooth';
  });

  ul.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault(); // Stop text selection
    const x = e.pageX - ul.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast multiplier
    ul.scrollLeft = scrollLeft - walk;
  });

  // Prevent default image dragging which conflicts with slider swipe
  ul.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  // Initial check (use ResizeObserver or Timeout to ensure layout is done)
  setTimeout(toggleButtons, 100);
  window.addEventListener('resize', toggleButtons);
}
