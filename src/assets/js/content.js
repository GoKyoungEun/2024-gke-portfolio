

// svg path 애니메이션을 실행하는 함수
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

// ScrollTrigger를 사용하여 스크롤 위치에 따라 애니메이션 실행

gsap.registerPlugin(ScrollTrigger);

// svg-box가 뷰포트에 진입할 때 animateSVGPath 함수 실행
ScrollTrigger.create({
  trigger: ".svg-box",
  start: "top center",
  end: "bottom top",
  onEnter: animateSVGPath,
  onEnterBack: animateSVGPath,
  once: true // animateSVGPath가 처음 등장할 때만 실행되도록 함
});

// .page2의 너비를 반환하는 함수
function getWorkListWidth() {
	const workList = document.querySelector('.portfolio-work-list');
	return workList ? workList.offsetWidth : 0; // workList가 존재하면 너비 반환, 그렇지 않으면 0 반환
  }

// .page2를 고정하는 애니메이션
ScrollTrigger.create({
    trigger: ".sec-portfolio-work",
    start: "top top", // .page2의 상단이 뷰포트 상단에 도달했을 때 시작
    end: () => `+=${getWorkListWidth()}`, // 6000px 만큼 스크롤할 동안 애니메이션 진행
    pin: true, // .page2를 고정
    scrub: true, // 스크롤 위치에 따라 애니메이션 조정
});

// .page2의 애니메이션
gsap.to(".portfolio-work-content-wrap", {
	x: () => -getWorkListWidth(), // .content-wrap의 이동 거리를 동적으로 계산
	ease: "none",
	scrollTrigger: {
	  trigger: ".sec-portfolio-work",
	  start: "top top",
	  end: () => `+=${getWorkListWidth()}`, // .work-list의 너비만큼 스크롤 구간 설정
	  scrub: true
	}
});

//swiper
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


// KV 텍스트 타이핑 애니메이션
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


// 텍스트 클릭에 따라 .portfolio-about-img 이미지 변경
$('.portfolio-about-text p strong').mouseenter(function () {
  let changeImage = $(this).attr('data-img')
  $('.portfolio-about-img .nomal-img').css({
    'background-image': 'url(' + changeImage + ')'
  })
})
$('.portfolio-about-text p strong').mouseleave(function () {
  $('.portfolio-about-img .nomal-img').css({
    'background-image': ''
  })

})


// 탭 메뉴
function changeContent(contentId) {
  var i, tabcontent, tablinks;

  // 첫 번째 탭 컨텐츠를 제외한 나머지를 숨깁니다.
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    if
(tabcontent[i].id !== contentId) {
tabcontent[i].style.display = "none";
tabcontent[i].style.opacity = "0";
}
}

// 모든 탭 링크에서 'active' 클래스를 제거합니다.
tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
tablinks[i].className = tablinks[i].className.replace(" active", "");
}

// 선택된 탭 컨텐츠에 'show' 클래스를 추가하여 페이드 인 효과를 적용합니다.
var selectedContent = document.getElementById(contentId);
selectedContent.style.display = "block";
setTimeout(function() {
selectedContent.style.opacity = "1";
}, 10);
}

// 페이지 로드 시 첫 번째 탭 컨텐츠를 활성화합니다.
window.onload = function() {
  changeContent("content1");
};




// 스크롤 롤링 텍스트 애니메이션
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
  count1 += 10
  count2 += 10
}

window.addEventListener('scroll', scrollHandler)
animate()


$(document).ready(function() {
  // 스크롤 이벤트 처리
  $(".nav-menu ul li a").click(function(e) {
      e.preventDefault();
      let targetId = $(this).attr('href');
      $('html, body').animate({
          scrollTop: $(targetId).offset().top
      }, 1000);
  });
});

