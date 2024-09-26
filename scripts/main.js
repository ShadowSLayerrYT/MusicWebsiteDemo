document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        durationSpan.textContent = formatTime(audioPlayer.duration);
        progressBar.max = Math.floor(audioPlayer.duration);
    });

    audioPlayer.addEventListener('timeupdate', () => {
        progressBar.value = Math.floor(audioPlayer.currentTime);
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    });

    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });

    // Animate features on scroll
    const features = document.querySelectorAll('.feature');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'slide-up');
            }
        });
    }, { threshold: 0.1 });

    features.forEach(feature => {
        observer.observe(feature);
    });

    // Add fade-in animation to main elements
    const mainElements = document.querySelectorAll('main > *');
    mainElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});