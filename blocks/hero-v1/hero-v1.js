export default function decorate(block) {
  // Extract picture
  const picture = block.querySelector('picture');
  if (picture) {
    const wrapper = document.createElement('div');
    wrapper.className = 'hero-v1-media';
    wrapper.append(picture);
    block.prepend(wrapper);
  }

  // Ensure content is in its own wrapper
  const content = block.querySelector(':scope > div > div');
  if (content) {
    content.classList.add('hero-v1-content');
    
    // Clean up empty paragraphs
    content.querySelectorAll('p').forEach((p) => {
      if (p.innerHTML.trim() === '') p.remove();
    });

    // Style specific typography elements
    const pTags = content.querySelectorAll('p');
    pTags.forEach((p) => {
      const a = p.querySelector('a');
      if (a) {
        p.className = 'hero-v1-cta-wrapper';
        a.className = 'button primary';
      } else if (!p.querySelector('picture')) {
        // If they literally typed '#' instead of making it a heading
        const text = p.textContent.trim();
        if (text.startsWith('#')) {
          p.innerHTML = p.innerHTML.replace(/^#\s*/, '');
          p.className = 'hero-v1-title';
        } else if (!content.querySelector('.hero-v1-subtitle')) {
          p.className = 'hero-v1-subtitle';
        } else {
           p.className = 'hero-v1-desc';
        }
      }
    });

    const headings = content.querySelectorAll('h1, h2, h3, h4');
    headings.forEach((h) => {
      h.className = 'hero-v1-title';
    });
  }
}
