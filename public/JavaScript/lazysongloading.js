document.addEventListener("DOMContentLoaded", function() {
  // Get all audio elements with the "lazy-load-audio" class
  const audios = document.querySelectorAll('.lazy-load-audio');
  
  // Options for the Intersection Observer
  const options = {
    root: null, // Use the viewport as the root
    threshold: 0 // Trigger when the audio enters the viewport
  };

  let currentlyPlayingAudio = null; // Variable to store the currently playing audio

  // Object to track whether audio source has been loaded
  const audioLoaded = {};

  // Callback function when an audio intersects with the viewport
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      const audio = entry.target;
      if (entry.isIntersecting && !audioLoaded[audio.dataset.src]) {
        // Load the audio source only if it hasn't been loaded before
        audio.src = audio.dataset.src;
        audioLoaded[audio.dataset.src] = true; // Set the flag to true
      }
    });
  };

  // Create an Intersection Observer instance for each audio element
  audios.forEach(audio => {
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(audio);
  });

  // Event listener function to handle pausing of other audios when a new audio is played
  const handleAudioPlay = (event) => {
    const audio = event.target;
    if (audio !== currentlyPlayingAudio && currentlyPlayingAudio) {
      currentlyPlayingAudio.pause();
    }
    currentlyPlayingAudio = audio;
  };

  // Add event listener to pause other audios when a new audio is played
  audios.forEach(audio => {
    audio.addEventListener('play', handleAudioPlay);
  });
});
