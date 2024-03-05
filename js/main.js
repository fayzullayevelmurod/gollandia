
// Header scroll
window.addEventListener('scroll', function () {
    let header = document.querySelector('.header');
    let scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        header.style.backgroundColor = '#01356280';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

// Header menu
let headerMob = document.querySelector('.header-mob');
let headerMobBg = document.querySelector('.header-mob-bg');
let menuOpen = document.querySelector('.menu-open');
let menuClose = document.querySelector('.menu-close');

menuOpen.addEventListener('click', function(e) {
    headerMob.classList.add('active');
});
menuClose.addEventListener('click', function(e) {
    headerMob.classList.remove('active');
});
headerMobBg.addEventListener('click', function(e) {
    headerMob.classList.remove('active');
});

// Home modal
let homeVideo = document.querySelector('.home-video-modal');
let homeOpenModal = document.querySelector('.home-link-modal');
let homeCloseModal = document.querySelector('.close-home-modal');
let videoPlayer = document.querySelector('.home-video iframe');

function openModalHome() {
    homeVideo.classList.add('active');
}

function closeModalHome() {
    homeVideo.classList.remove('active');
    videoPlayer.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    videoPlayer.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0,true]}', '*');
}

homeOpenModal.addEventListener('click', openModalHome);
homeCloseModal.addEventListener('click', closeModalHome);
homeVideo.addEventListener('click', function (e) {
    if (e.target !== videoPlayer) { // agar bosilgan element video tagi emas
        closeModalHome();
    }
});



// House slider
var houseSlide = new Swiper(".houseSlide", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});



// Form phone
