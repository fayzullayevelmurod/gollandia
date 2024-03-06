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

menuOpen.addEventListener('click', function (e) {
    headerMob.classList.add('active');
});
menuClose.addEventListener('click', function (e) {
    headerMob.classList.remove('active');
});
headerMobBg.addEventListener('click', function (e) {
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


// AOS js
AOS.init();

// Form validation
document.querySelector('.form-sec-btn').addEventListener('click', function(event) {
    var nameInput = document.getElementById('requestName');
    var phoneInput = document.getElementById('requestPhone2');
    var textErrors = document.querySelectorAll('.t-input-error'); // querySelectorAll() ishlatiladi

    let hasError = false;

    if (!/^[a-zA-Z]+$/.test(nameInput.value)) {
        nameInput.classList.add('error');
        hasError = true;
        textErrors.forEach(function(textError) {
            textError.classList.add('active');
        });
    } else {
        nameInput.classList.remove('error');
    }
    
    if (phoneInput.value.length < 7 || isNaN(parseInt(phoneInput.value))) {
        phoneInput.classList.add('error');
        hasError = true; // Error mavjud bo'lsa hasError ni true qilamiz
        textErrors.forEach(function(textError) {
            textError.classList.add('active');
        });
    } else {
        phoneInput.classList.remove('error');
    }

    if (hasError) {
        event.preventDefault(); 
        setTimeout(function() {
            textErrors.forEach(function(textError) {
                textError.classList.remove('active');
            });
        }, 5000); // 10 sekunddan keyin .active olib tashlash
    }
});




// Input number
let input = document.querySelector("#requestPhone");
let input2 = document.querySelector("#requestPhone2");
window.intlTelInput(input, {});
window.intlTelInput(input2, {});

let inputValue1 = document.querySelector("#requestPhone");
let inputValue2 = document.querySelector("#requestPhone2");
let countryCode = "+1";
inputValue1.value = countryCode;
inputValue2.value = countryCode;

// Input mask
document.addEventListener('DOMContentLoaded', function () {
    applyMask('requestPhone', '+0 (000) 000-00-00');
    applyMask('requestPhone2', '+0 (000) 000-00-00');
});

function applyMask(elementId, mask) {
    let element = document.getElementById(elementId);
    let maskOptions = {
        mask: mask,
        lazy: false
    };

    element.addEventListener('focus', function () {
        new IMask(element, maskOptions);
    });
}

