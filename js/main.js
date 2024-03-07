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
        hasError = true;
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

// fetchCountry();


// Input mask
// document.addEventListener('DOMContentLoaded', function () {
//     applyMask('requestPhone', '+0 (000) 000-00-00');
//     applyMask('requestPhone2', '+0 (000) 000-00-00');
// });

// function applyMask(elementId, mask) {
//     let element = document.getElementById(elementId);
//     let maskOptions = {
    //         mask: mask,
    //         lazy: false
    //     };
    
    //     element.addEventListener('focus', function () {
        //         new IMask(element, maskOptions);
        //     });
        // }

$('.input_phone__wrap').each(function (idx, el) {
    let inp = $(el).find('input[type="tel"]')[0];
    $(inp).inputmask({"mask": "+9(999)999-9999"})
    $(inp).on('input', function () {
        setTimeout(() => {
            let ico = $(el).find('.iti__selected-flag .iti__flag')[0].getAttribute('class').split(' ')[1]
            if (ico.length > 5) {
                ico = ico.slice(ico.length - 2)
                fetchCountry(inp, ico.toUpperCase());
            }
        }, 200);
    })

    $(el).find('.iti__country-list li').each(function (li_idx, li) {
        $(li).click(function () {
            let code = $(li).find('.iti__dial-code').text();
            $(inp).val(code);
            setTimeout(() => {
                let ico = $(el).find('.iti__selected-flag .iti__flag')[0].getAttribute('class').split(' ')[1]
                if (ico.length > 5) {
                    ico = ico.slice(ico.length - 2)
                    fetchCountry(inp, ico.toUpperCase());
                }
            }, 200);
        })
    })
})

// document.querySelector('#requestPhone2').oninput = () => {
// }

// document.querySelector('#requestPhone').oninput = () => {
//     setTimeout(() => {
//         let ico = document.querySelector('.iti__selected-flag .iti__flag').getAttribute('class').split(' ')[1]
//         if (ico.length > 5) {
//             ico = ico.slice(ico.length - 2)
//             fetchCountry('#requestPhone', ico.toUpperCase());
//         }
//     }, 200);
// }

// $('#requestPhone2').inputmask({"mask": "+9(999)999-9999"})

function fetchCountry (el, ico) {
    fetch("./js/country.json")
        .then((res) => res.json())
        .then(res => {
            res.forEach(c => {
                if (c.iso == ico) {
                    let m = c.mask;
                    let code = ''
                    for (let i = 1; i < c.code.length; i++) {
                        code += '9'
                    }
                    $(el).inputmask({"mask": `+${code}${m}`})
                }
            })
        })
}

