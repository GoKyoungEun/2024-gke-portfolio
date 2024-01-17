// SVG 경로 애니메이션 함수
let animationCompleted = false;

function animateSVGPath() {
    return new Promise((resolve) => {
        if (animationCompleted) {
            resolve();
            return;
        }

        const svgBox = document.querySelector('.svg-box');
        const svg = svgBox.querySelector('svg');
        const path = svgBox.querySelector('svg path');
        if (!path) {
            console.error("SVG 경로를 찾을 수 없습니다");
            resolve();
            return;
        }

        const length = path.getTotalLength();

        gsap.set(svg, { opacity: 1 });
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
        });

        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.out",
            onComplete: () => {
                animationCompleted = true;
                resolve();
            }
        });
    });
}

// 스크롤에 따른 애니메이션을 위한 ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".svg-box",
    start: "top center",
    end: "bottom top",
    onEnter: animateSVGPath,
    onEnterBack: animateSVGPath,
    once: true
});

// '.page2'의 너비를 반환하는 함수
function getWorkListWidth() {
    const workList = document.querySelector('.portfolio-work-list');
    return workList ? workList.offsetWidth : 0;
}

// '.page2' 고정을 위한 ScrollTrigger
ScrollTrigger.create({
    trigger: ".sec-portfolio-work",
    start: "top top",
    end: () => `+=${getWorkListWidth()}`,
    pin: true,
    scrub: true
});

// '.page2' 애니메이션
gsap.to(".portfolio-work-content-wrap", {
    x: () => -getWorkListWidth(),
    ease: "none",
    scrollTrigger: {
        trigger: ".sec-portfolio-work",
        start: "top top",
        end: () => `+=${getWorkListWidth()}`,
        scrub: true
    }
});

// Swiper 초기화
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// 메인 타이틀 타이핑 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    new TypeIt("#mainTitle", {
        speed: 150,
        startDelay: 1400,
    })
    .type("KYOUNG eun", { delay: 100 })
    .delete(3)
    .type("EUN", { delay: 100 })
    .type("<br>PORTFOLIO", { delay: 100 })
    .go();
});

// 포트폴리오 섹션 내 텍스트 호버시 이미지 변경
$('.portfolio-about-text p strong').mouseenter(function () {
    let changeImage = $(this).attr('data-img');
    $('.portfolio-about-img .nomal-img').css({
        'background-image': 'url(' + changeImage + ')'
    });
});
$('.portfolio-about-text p strong').mouseleave(function () {
    $('.portfolio-about-img .nomal-img').css({
        'background-image': ''
    });
});

// 탭 메뉴 기능
function changeContent(contentId) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].id !== contentId) {
            tabcontent[i].style.display = "none";
            tabcontent[i].style.opacity = "0";
        }
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    var selectedContent = document.getElementById(contentId);
    selectedContent.style.display = "block";
    setTimeout(function() {
        selectedContent.style.opacity = "1";
    }, 10);
}

window.onload = function() {
    changeContent("content1");
};

// 흐르는 텍스트 애니메이션
const pTag1 = document.querySelector('.first-parallel');
const pTag2 = document.querySelector('.second-parallel');

const textArr1 = 'HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode'.split(' ');
const textArr2 = 'HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode'.split(' ');

let count1 = 0;
let count2 = 0;

initTexts(pTag1, textArr1);
initTexts(pTag2, textArr2);

function initTexts(element, textArray) {
    textArray.push(...textArray);
    for (let i = 0; i < textArray.length; i++) {
        element.innerText += `${textArray[i]}\u00A0\u00A0\u00A0\u00A0`;
    }
}

function marqueeText(count, element, direction) {
    if (count > element.scrollWidth / 2) {
        element.style.transform = `translate3d(0, 0, 0)`;
        count = 0;
    }
    element.style.transform = `translate3d(${direction * count}px, 0, 0)`;

    return count;
}

function animate() {
    count1++;
    count2++;

    count1 = marqueeText(count1, pTag1, -1);
    count2 = marqueeText(count2, pTag2, 1);

    window.requestAnimationFrame(animate);
}

function scrollHandler() {
    count1 += 10;
    count2 += 10;
}

window.addEventListener('scroll', scrollHandler);
animate();

// 내비게이션 메뉴의 부드러운 스크롤 처리
$(document).ready(function() {
    $(".nav-menu ul li a").click(function(e) {
        e.preventDefault();
        let targetId = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(targetId).offset().top
        }, 1000);
    });
});
