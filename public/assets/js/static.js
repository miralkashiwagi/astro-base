/* ================
独自JS
================ */


/* ================
AddPackagesに入れたJSの使用
================ */

SmoothScroll('a[href*="#"]', {
  ignore: ['[data-scroll-ignore]'], // 無効にしたいリンクのセレクタ
  // header: '.l-header', // 固定ヘッダーのセレクタ
  speed: 200, // スクロールするスピードを指定します。
  offset: 60, // スクロールする位置を整数で指定します。
  easing: 'easeIn' // イージングを指定できます
});


function gsapFunction(){
  gsap.set('.js-fadein', {
    opacity: 0,
  })

  gsap.to('.js-fadein', {
    opacity: 1,
    duration: 5,
    delay: 2,
    ease: 'power2.out',
  });
}




// function normalFadeIn() {
//   const triggerElements = document.querySelectorAll("[data-scroll='fadeinup']");
//   triggerElements.forEach(function (triggerElement) {
//     triggerElement.classList.add('is-init');
//     SimpleScrollTrigger({
//       // トリガー要素。必須。
//       trigger: triggerElement,
//       // 指定した開始位置に開始判定が上から下へ入ったときに呼ばれる関数。省略可。
//       onEnter: () => {
//         triggerElement.classList.add('is-showing');
//       },
//       // 指定した開始位置に開始判定が下から上へ出たときに呼ばれる関数。省略可。
//       onLeaveBack: () => {},
//       // 指定した終了位置に終了判定が上から下へ出たときに呼ばれる関数。省略可。
//       onLeave: () => {},
//       // 指定した終了位置に終了判定が下から上へ入ったときに呼ばれる関数。省略可。
//       onEnterBack: () => {},
//       // 開始判定する画面上端からの位置。from:"bottom"オプションを指定した場合は下端から計算されます。単位は%もしくはpx。100%とした場合は、画面下端が判定位置です。省略した場合は画面上端。
//       startViewPortPoint: { value: 100, unit: '%', from: 'top' },
//       // 開始位置の要素上端からの位置。from:"bottom"オプションを指定した場合は下端から計算されます。単位は%もしくはpx。50pxとした場合は要素上端から50pxの位置に開始判定がくると発火します。省略した場合は要素上端。
//       startTriggerPoint: { value: 50, unit: 'px', from: 'top' },
//       // 終了判定する画面上端からの位置。from:"bottom"オプションを指定した場合は下端から計算されます。単位は%もしくはpx。0%とした場合は、画面上端が判定位置です。省略した場合は画面上端。endTriggerPointと両方省略した場合はend判定は設定されません。
//       endViewPortPoint: { value: 0, unit: '%', from: 'bottom' },
//       // 終了位置の要素上端からの位置。from:"bottom"オプションを指定した場合は下端から計算されます。単位は%もしくはpx。100%とした場合は要素下端の位置に終了判定がくると発火します省略可。省略した場合は要素上端。endViewPortPointと両方省略した場合はend判定は設定されません。
//       endTriggerPoint: { value: 100, unit: '%', from: 'bottom' },
//       // 関数を一度だけ呼びます。省略可。省略した場合はfalseとなり、通り過ぎるたびに呼ばれます
//       isOnce: true,
//       // リロード時やリサイズに開始判定を過ぎていた場合にonEnter関数を呼ぶかどうか。trueにした場合は過ぎていた場合に呼びます。オプションで"end"値とした場合は判定範囲は開始判定より下、終了判定より上の範囲にて呼びます。"all"値はtrueと同じです。省略可。省略した場合はfalseで、初期読み込み、リサイズ時には呼びません。
//       initOnEnter: true
//       // リロード時やリサイズに終了判定を過ぎていた場合にonLeave関数を呼ぶかどうか。真偽値のみで判定範囲オプションはありません。
//       //initOnLeave: true
//     });
//   });
// }

// normalFadeIn();
gsapFunction();
// splide();