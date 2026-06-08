export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'brand-list-container';

  [...block.children].forEach((row) => {
    [...row.children].forEach((cell) => {
      const pic = cell.querySelector('picture');
      const a = cell.querySelector('a');

      if (!pic) return; // skip empty cells

      const li = document.createElement('li');
      li.className = 'brand-list-item';

      if (a) {
        // Remove any text from the link, wrap it around the picture
        a.innerHTML = '';
        a.className = 'brand-list-link';
        a.append(pic);
        li.append(a);
      } else {
        li.append(pic);
      }

      ul.append(li);
    });
  });

  block.textContent = '';
  block.append(ul);
}
