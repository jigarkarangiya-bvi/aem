export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  block.classList.add('announcements-container');

  rows.forEach((row, index) => {
    row.classList.add('announcement-item');
    if (index === 0) row.classList.add('active');

    const cols = [...row.children];

    // First column is the text
    if (cols[0]) {
      cols[0].classList.add('announcement-text');
    }

    // Second column (optional) is the background color
    if (cols.length > 1) {
      const color = cols[1].textContent.trim();
      if (color) {
        row.style.backgroundColor = color;
      }
      cols[1].remove(); // Remove color column from DOM
    } else {
      // Default color if none provided
      row.style.backgroundColor = '#7a8b5e'; // olive green from screenshot
    }
  });

  // Set up auto-scroll if there are multiple announcements
  if (rows.length > 1) {
    let currentIndex = 0;
    setInterval(() => {
      rows[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % rows.length;
      rows[currentIndex].classList.add('active');
    }, 4000); // Switch every 4 seconds
  }
}
