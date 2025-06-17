document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.profile-carousel');
    const images = carousel.querySelectorAll('img');
    const totalImages = images.length;
    let currentIndex = 0;
    
    for (let i = 1; i < totalImages; i++) {
        images[i].style.opacity = "0";
    }
 
    function showNextImage() {
        images[currentIndex].style.opacity = "0";
        
        currentIndex = (currentIndex + 1) % totalImages;
        
        images[currentIndex].style.opacity = "1";
    }
  
    setInterval(showNextImage, 5000);
});