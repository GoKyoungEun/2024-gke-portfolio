
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
            console.error("SVG path not found");
            resolve();
            return;
        }

        const length = path.getTotalLength();

        // SVG의 opacity를 1로 설정
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

function resetAnimation() {
    animationCompleted = false;
    // .svg-box의 opacity를 0으로 설정
    gsap.to('.svg-box svg', { opacity: 0, duration: 0.5 });
}

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".svg-box",
    start: "top center", // .svg-box가 뷰포트 아래쪽에 닿을 때
    end: "bottom top", // .svg-box가 뷰포트 위쪽으로 사라질 때
    onEnter: animateSVGPath,
    onLeave: resetAnimation,
    onEnterBack: animateSVGPath,
    onLeaveBack: resetAnimation
});

function getWorkListWidth() {
	const workList = document.querySelector('.work-list');
	return workList ? workList.offsetWidth : 0; // workList가 존재하면 너비 반환, 그렇지 않으면 0 반환
  }
  
ScrollTrigger.create({
    trigger: ".sec-portfolio-work",
    start: "top top", // .page2의 상단이 뷰포트 상단에 도달했을 때 시작
    end: () => `+=${getWorkListWidth()}`, // 6000px 만큼 스크롤할 동안 애니메이션 진행
    pin: true, // .page2를 고정
    scrub: true, // 스크롤 위치에 따라 애니메이션 조정
});

gsap.to(".content-wrap", {
	x: () => -getWorkListWidth(), // .content-wrap의 이동 거리를 동적으로 계산
	ease: "none",
	scrollTrigger: {
	  trigger: ".sec-portfolio-work",
	  start: "top top",
	  end: () => `+=${getWorkListWidth()}`, // .work-list의 너비만큼 스크롤 구간 설정
	  scrub: true
	}
});

document,addEventListener('DOMContentLoaded', () => {
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



const pTag1 = document.querySelector('.first-parallel')
const pTag2 = document.querySelector('.second-parallel')

const textArr1 = 'HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode'.split(' ')
const textArr2 = 'HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode HTML CSS JavaScript SCSS jQuery Animation React Node Git Figma VSCode'.split(' ')

let count1 = 0
let count2 = 0

initTexts(pTag1, textArr1)
initTexts(pTag2, textArr2)

function initTexts(element, textArray) {
  textArray.push(...textArray)
  for (let i = 0; i < textArray.length; i++) {
    element.innerText += `${textArray[i]}\u00A0\u00A0\u00A0\u00A0`
  }
}

function marqueeText(count, element, direction) {
  if (count > element.scrollWidth / 2) {
    element.style.transform = `translate3d(0, 0, 0)`
    count = 0
  }
  element.style.transform = `translate3d(${direction * count}px, 0, 0)`

  return count
}

function animate() {
  count1++
  count2++

  count1 = marqueeText(count1, pTag1, -1)
  count2 = marqueeText(count2, pTag2, 1)

  window.requestAnimationFrame(animate)
}

function scrollHandler() {
  count1 += 15
  count2 += 15
}

window.addEventListener('scroll', scrollHandler)
animate()

$('.portfolio-about-text p strong').mouseenter(function () {
  let changeImage = $(this).attr('data-img')
  let changeRotateImage = $(this).attr('data-rotate-img')
  $('.portfolio-about-img .nomal-img').css({
    'background-image': 'url(' + changeImage + ')'
  })
  $('.portfolio-about-img .rotate-img').css({
    'background-image': 'url(' + changeRotateImage + ')'
  })
})
$('.portfolio-about-text p strong').mouseleave(function () {
  $('.portfolio-about-img .nomal-img').css({
    'background-image': ''
  })
  $('.portfolio-about-img .rotate-img').css({
    'background-image': ''
  })
})