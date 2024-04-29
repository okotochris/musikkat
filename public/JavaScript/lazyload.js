document.addEventListener("DOMContentLoaded", function() {
  // Get all iframes with the "lazy-load-video" class
  const videos = document.querySelectorAll('.lazy-load-video');
  
  // Object to track whether video source has been loaded
  const videoLoaded = {};

  // Options for the Intersection Observer
  const options = {
    root: null, // Use the viewport as the root
    threshold: 0 // Trigger when the video enters the viewport
  };

  // Callback function when a video intersects with the viewport
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting && !videoLoaded[video.dataset.src]) {
        // Load the video source only if it hasn't been loaded before
        video.src = video.dataset.src;
        videoLoaded[video.dataset.src] = true; // Set the flag to true
      }
    });
  };

  // Create an Intersection Observer instance for each video
  videos.forEach(video => {
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(video);
  });
});
