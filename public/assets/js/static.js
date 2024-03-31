/* ================
SP NAV
================ */


const sp_button = document.querySelector('#js-sp-button');
const sp_nav = document.querySelector('#js-sp-nav');
const nav_anchor = sp_nav.querySelectorAll('a[href*=\'#\']');


sp_button.addEventListener('click', event => {
  if (sp_nav.classList.contains('is-open')) {
    nav_close();
  } else {
    nav_open();
  }
});
nav_anchor.forEach(item => {
  item.addEventListener('click', event => {
    nav_close();
  });
});

function nav_open() {
  sp_button.classList.add('is-open');
  sp_nav.classList.add('is-open');
  sp_nav.classList.remove('is-sp-close');
}

function nav_close() {
  sp_button.classList.remove('is-open');
  sp_nav.classList.remove('is-open');
  sp_nav.addEventListener('animationend', () => {
    sp_nav.classList.add('is-sp-close');
  }, { once: true });
}


/* ================
Slider
================ */
document.addEventListener('DOMContentLoaded', function() {
  const splideSlide = splide('.js-slider', {
    type: 'loop',
    gap: 32,
    autoplay: true,
    pagination: false
  });
  splideSlide.mount();

  responsiveMatch(
    () => {
      console.log("Match")
    },
    () => {
      console.log("unMatch")
    },
    "max-width: 500px"//省略可
  );
});


/* ================
GSAP
================ */

window.addEventListener('pageshow', function() {
  const header = document.querySelector('.js-header');
  if (header) {

    responsiveMatch(
      () => {
        gsap.set(header, { padding: '1.75rem 2.5rem' });
        gsap.to(header, {
          padding: '0.5rem 2.5rem', duration: 0.1, scrollTrigger: {
            trigger: 'body',
            start: 'top -100px',
            toggleActions: 'play pause resume reverse'
          }
        });
      },
      () => {
      });


  }

  const fadeInTargets = document.querySelectorAll('.js-fadein');
  if (fadeInTargets.length) {
    fadeInTargets.forEach((target) => {
      gsap.to(target, {
        y: 0, opacity: 1, ease: 'power1.Out', scrollTrigger: {
          trigger: target,
          start: 'top 80%'
        }
      });
    });
  }

  const fadeInStaggerTargets = document.querySelectorAll('.js-fadein-stagger');
  if (fadeInStaggerTargets.length) {
    fadeInStaggerTargets.forEach((target) => {
      const item = target.querySelectorAll('.js-fadein-stagger-item');
      gsap.to(item, {
        y: 0, opacity: 1, stagger: 0.2, scrollTrigger: {
          trigger: target,
          start: 'top 80%'
        }
      });
    });
  }
});

/* ================
SmoothScroll
================ */
document.addEventListener('DOMContentLoaded', function() {

  SmoothScroll('a[href*="#"]', {
    // header: '.c-header', // 固定ヘッダーのセレクタ
    speed: 60, // スクロールするスピードを指定します。
    offset: 100, // スクロールする位置を整数で指定します。
    easing: 'easeIn' // イージングを指定できます
  });
  //
  // let spSmoothScroll,pcSmoothScroll;
  // responsive(
  //   () => {
  //     spSmoothScroll = SmoothScroll('a[href*="#"]', {
  //       // header: '.c-header', // 固定ヘッダーのセレクタ
  //       speed: 60, // スクロールするスピードを指定します。
  //       offset: 100, // スクロールする位置を整数で指定します。
  //       easing: 'easeIn' // イージングを指定できます
  //     });
  //   },
  //   () => {
  //     pcSmoothScroll = SmoothScroll('a[href*="#"]', {
  //       // header: '.c-header', // 固定ヘッダーのセレクタ
  //       speed: 60, // スクロールするスピードを指定します。
  //       offset: 160, // スクロールする位置を整数で指定します。
  //       easing: 'easeIn' // イージングを指定できます
  //     });
  //   }
  // );
});
