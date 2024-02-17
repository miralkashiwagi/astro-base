export default class Accordion {
  constructor(selector='.js-accordion') {
    this.accordions = [...document.querySelectorAll(selector)];
    this.init();
  }

  init() {
    this.accordions.forEach(el=> {
      const summary = el.querySelector('summary');
      const contentWrap = summary.nextElementSibling;
      let clicked = false;
      summary.addEventListener('click', (e) => {
        e.preventDefault();
        if(el.hasAttribute('open')) {
          this.closeAccordion(el, contentWrap);
          clicked = false;
        } else {
          this.openAccordion(el, contentWrap);
          clicked = true;
        }
      });

      // MutationObserver
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
            //クリック操作以外のとき
            if(!clicked && el.hasAttribute("open")){
              this.addClass(el);
            }
          }
        });
      });

      // observerの設定
      const config = { attributes: true };
      // observerの開始
      observer.observe(el, config);
    });
  }

  addClass(el){
    el.classList.add('is-open');
  }

  openAccordion(el, contentWrap) {
    el.setAttribute('open', 'true');
    setTimeout(()=>{
      //openを付けた後処理が早すぎるとアニメーションしないため遅延
      this.addClass(el);
    },10)
  }

  closeAccordion(el, contentWrap) {
    el.classList.remove('is-open');
    contentWrap.addEventListener('transitionend', function callback(){
      el.removeAttribute('open');
      contentWrap.removeEventListener('transitionend', callback);
    });
  }
}