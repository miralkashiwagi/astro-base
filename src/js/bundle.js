/* ================
import
================ */
import SmoothScroll from 'smooth-scroll';
import gsap from 'gsap';
import scrollTrigger from 'gsap/ScrollTrigger';
// import { SimpleScrollTrigger } from 'simple-scroll-trigger';
import splide from '@splidejs/splide';
import {responsiveMatch} from './utiles/utils.js';

// import Accordion from './class/Accordion.js';


/* ================
window.AddPackagesにいれる
================ */

class AddPackages {
  constructor() {
    this.gsap = gsap;
    this.gsap.registerPlugin(scrollTrigger);
    this.responsiveMatch = responsiveMatch;
  }

  // Accordion($selector){
  //   return new Accordion($selector);
  // }

  SmoothScroll(trigger, settings) {
    return new SmoothScroll(trigger, settings);
  }

  splide(target,settings) {
    return new splide(target,settings);
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