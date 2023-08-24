const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const slideWidth = slides[0].clientWidth;

let slideIndex = 0;

function showSlide(index) {
    slider.style.transform = `translateX(-${slideWidth * index}px)`;
}

showSlide(slideIndex);

setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}, 2000); // This changes slide every 5 seconds.
