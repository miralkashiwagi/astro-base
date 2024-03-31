/**
 * 引数で指定されたDOM要素(element)に対する特定のイベント(event)のハンドラ(handler)を割り当てる
 * 割り当てたイベントリスナーを後で解除するためのAPI（unsubscribeメソッド）を持つオブジェクトを返す
 */
const attachEvent = (element, event, handler, options) => {
  // イベントリスナーを要素に割り当て
  element.addEventListener(event, handler, options);

  // イベントの割り当てを解除するためのAPIを返す
  return {
    unsubscribe() {
      element.removeEventListener(event, handler);
    }
  };
};
export { attachEvent }


/**
 * モーダルウィンドウやポップアップを前面に表示する際にページの背景を固定する
 */
const backfaceFixed = (fixed) => {
  /**
   * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
   */
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';

  /**
   * 背面固定する対象を決定する
   */
  const scrollingElement =
    'scrollingElement' in document
      ? document.scrollingElement
      : document.documentElement;

  /**
   * 背面固定時に変数にスクロール量を格納
   */
  const scrollY = fixed
    ? scrollingElement.scrollTop
    : parseInt(scrollingElement.style.top || '0');

  /**
   * CSSで背面を固定
   */
  const styles = {
    height: '100vh',
    left: '0',
    overflow: 'hidden',
    position: 'fixed',
    top: `${scrollY * -1}px`,
    width: '100vw'
  };

  Object.keys(styles).forEach((key) => {
    scrollingElement.style[key] = fixed ? styles[key] : '';
  });

  /**
   * 背面固定解除時に元の位置にスクロールする
   */
  if (!fixed) window.scrollTo(0, scrollY * -1);
};
export { backfaceFixed }


/**
 * レスポンシブ対応JS切り替え
 * responsiveMatch(
 *   () => {
 *     console.log("Match")
 *   },
 *   () => {
 *     console.log("unMatch")
 *   },
 *   "max-width: 500px"//省略可
 * );
 */
const responsiveMatch = (match,unMatch,media = 'max-width: 768px') => {
  //第3引数に入れたメディアクエリもしくは768pxのところでMediaQueryList作成
  const mql = window.matchMedia('('+media+')');

  //MediaQueryListにマッチした時の動作、しなかった時の動作を引数から受け取る
  function action(e) {
    if (e.matches) {
      match();
    } else {
      unMatch();
    }
  }

  //MediaQueryListのChangeイベント時に発火させる
  mql.addEventListener("change", action);
  //ページ読み込み時にも発火させる
  action(mql);
}
export { responsiveMatch }