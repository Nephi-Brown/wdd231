document.addEventListener('DOMContentLoaded', async () => {
    const carousel = document.querySelector('.profile-carousel');

    try {
        const response = await fetch('data/media.json');
        if (!response.ok) throw new Error('Failed to load carousel images');
        const data = await response.json();
        const images = data.items.map(item => item.image).filter(Boolean);

        if (!images.length) {
            carousel.innerHTML = '<p>No images available</p>';
            return;
        }

        images.forEach((imgName, index) => {
            const img = document.createElement('img');
            img.src = `images/${imgName}`;
            img.alt = `Media image ${index + 1}`;
            img.loading = 'lazy'; // ✅ lazy load here
            img.classList.add('carousel-image');
            img.style.opacity = index === 0 ? '1' : '0';
            carousel.appendChild(img);
        });

        const imgElements = carousel.querySelectorAll('img');
        let currentIndex = 0;

        function showNextImage() {
            imgElements[currentIndex].style.opacity = '0';
            currentIndex = (currentIndex + 1) % imgElements.length;
            imgElements[currentIndex].style.opacity = '1';
        }

        setInterval(showNextImage, 5000);

    } catch (error) {
        console.error('Carousel error:', error);
        carousel.innerHTML = '<p style="color:red;">Failed to load carousel images.</p>';
    }
});
