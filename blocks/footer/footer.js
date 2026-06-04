import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // Add structural classes to match the 3-row footer design
  const sections = footer.querySelectorAll(':scope > div');
  if (sections.length > 0) {
    sections[0].classList.add('footer-links-section');
    const linkColumns = sections[0].querySelectorAll('.columns > div');
    linkColumns.forEach((col) => col.classList.add('footer-column'));
  }
  if (sections.length > 1) {
    sections[1].classList.add('footer-badges-section');
  }
  if (sections.length > 2) {
    sections[2].classList.add('footer-legal-section');
  }

  block.append(footer);
}
