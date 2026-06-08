export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const mediaRow = rows[0];
  const contentRow = rows[1];

  // 1. Setup Video Background
  let videoURL = '';

  const existingVideo = mediaRow.querySelector('video');
  const videoLink = mediaRow.querySelector('a');
  const posterPic = mediaRow.querySelector('picture');

  if (existingVideo) {
    videoURL = existingVideo.querySelector('source') ? existingVideo.querySelector('source').src : existingVideo.src;
  } else if (videoLink) {
    videoURL = videoLink.href;
  } else {
    // Check for raw text that might be a URL
    const text = mediaRow.textContent.trim();
    const urlMatch = text.match(/https?:\/\/[^\s"]+/);
    if (urlMatch) {
      [videoURL] = urlMatch;
    }
  }

  const mediaWrapper = document.createElement('div');
  mediaWrapper.className = 'video-hero-media';

  if (videoURL) {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('loop', '');
    video.autoplay = true;
    video.muted = true;

    const source = document.createElement('source');
    source.src = videoURL;

    // Check if it's an MP4, ignoring query parameters like ?token=...
    const urlWithoutQuery = videoURL.split('?')[0];
    if (urlWithoutQuery.endsWith('.mp4') || videoURL.includes('pexels.com')) {
      source.type = 'video/mp4';
    }
    video.appendChild(source);

    // Force browser to load the video
    video.load();

    if (posterPic) {
      const img = posterPic.querySelector('img');
      if (img) video.poster = img.src;
    }

    // Add pause/play button
    const btn = document.createElement('button');
    btn.className = 'video-hero-pause-btn';
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>'; // Pause SVG

    btn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>'; // Pause
      } else {
        video.pause();
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>'; // Play
      }
    });

    mediaWrapper.append(video, btn);
  } else if (posterPic) {
    mediaWrapper.append(posterPic);
  }

  block.prepend(mediaWrapper);
  mediaRow.remove();

  // 2. Setup Content
  contentRow.className = 'video-hero-content';

  // Style the button specifically for this hero
  const links = contentRow.querySelectorAll('a');
  links.forEach((a) => {
    // Ensure it uses the global unified button styles
    a.classList.add('button', 'primary');

    // Ensure the parent isn't constraining it
    if (a.parentElement.classList.contains('button-container')) {
      a.parentElement.classList.remove('button-container');
    }
  });
}
