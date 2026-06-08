export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;
  
  row.classList.add('features-row');
  const cols = [...row.children];
  
  cols.forEach((col, index) => {
    col.classList.add('feature-item');
    
    // The first column is usually the "Start your custom journey" title
    if (index === 0) {
      col.classList.add('feature-title-col');
    } else {
      col.classList.add('feature-content-col');
      
      // Structure: Icon on left, Text on right
      const pic = col.querySelector('picture');
      if (pic) {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'feature-icon';
        pic.parentNode.insertBefore(iconWrapper, pic);
        iconWrapper.append(pic);
      }
      
      const textWrapper = document.createElement('div');
      textWrapper.className = 'feature-text';
      // Move all remaining elements (h4, p, etc) into the text wrapper
      while (col.children.length > (pic ? 1 : 0)) {
        textWrapper.append(col.lastElementChild);
      }
      // Since we appended from the end, we need to reverse them to keep original order
      const children = Array.from(textWrapper.children).reverse();
      textWrapper.replaceChildren(...children);
      
      col.append(textWrapper);
    }
  });
}
