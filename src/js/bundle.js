/* ================
import
================ */
import SmoothScroll from 'smooth-scroll';
import gsap from 'gsap';
import scrollTrigger from 'gsap/ScrollTrigger';
// import { SimpleScrollTrigger } from 'simple-scroll-trigger';
import splide from '@splidejs/splide';


/* ================
window.AddPackagesにいれる
================ */

class AddPackages {
  constructor() {
    this.gsap = gsap;
    this.gsap.registerPlugin(scrollTrigger);
  }

  SmoothScroll($trigger, $settings) {
    return new SmoothScroll($trigger, $settings);
  }

  Splide($settings) {
    return new splide($settings);
  }

  // SimpleScrollTrigger($settings) {
  //   new SimpleScrollTrigger($settings);
  // }
}


const addPackages = new AddPackages();

function copyMethodsToWindow(object) {
  // 自身と親プロトタイプの全てのプロパティを取得
  let props = Object.getOwnPropertyNames(object)
      .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(object)));

  // プロパティとメソッドをwindowオブジェクトにコピー
  for (let prop of props) {
    // すでにwindowに存在するプロパティと重複しないことを確認
    if(!window[prop]) {
      window[prop] = typeof object[prop] === 'function' ?
          object[prop].bind(object) : object[prop];
    }
  }
}

copyMethodsToWindow(addPackages);