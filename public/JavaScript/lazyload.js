document.addEventListener("DOMContentLoaded", function() {
    // Get all iframes with the "lazy-load-video" class
    const videos = document.querySelectorAll('.lazy-load-video');
    
    // Options for the Intersection Observer
    const options = {
      root: null, // Use the viewport as the root
      threshold: 0.5 // Trigger when 50% of the iframe is visible
    };
  
    // Callback function when an iframe intersects with the viewport
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Autoplay the video
          const iframe = entry.target;
          iframe.src = iframe.dataset.src; // Start loading the video
          iframe.play(); // Autoplay the video
        } else {
          // Pause the video
          const iframe = entry.target;
          iframe.pause();
        }
      });
    };
  
    // Create an Intersection Observer instance for each iframe
    videos.forEach(video => {
      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(video);
    });
  });
  