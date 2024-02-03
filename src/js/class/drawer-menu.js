// https://codepen.io/tak-dcxi/pen/MWjzyjO

import {attachEvent, backfaceFixed} from '../utiles/utiles.js';

export class DrawerMenu {
  // コンストラクタを定義。
  // 「drawer(モーダルメニュー本体のHTML要素)」「button(メニューボタンのHTML要素)」「options(オプション設定)」
  constructor(drawer, button, options) {

    // モーダルメニュー本体を保存
    this.drawerElement = drawer;
    if (!this.drawerElement)
      throw TypeError('指定したモーダルメニュー本体のセレクタが見つかりません');


    // メニューボタンを保存
    this.hamburgerElement = button;
    if (!this.hamburgerElement)
      throw TypeError('指定したメニューボタンのセレクタが見つかりません');


    // デフォルトのオプション設定値
    const defaultOptions = {
      headerSelector: '#js-header',
      closeTriggerSelector: '.js-drawer-menu-close', // ボタンとは別にクリック時にメニューを閉じるトリガーとなるセレクタ
      inertTarget: 'main, footer', // 開いている時はこのセレクタを読み上げ対象外にする
      clickLinkToClose: true, // メニュー内のリンクをクリック時にメニューを閉じるか
      toggleDuration: 500 // メニューの遷移時間
    };


    // デフォルトのオプション設定値と、引数で受け取ったオプション設定値をマージ
    const mergedOptions = Object.assign(defaultOptions, options);
    // mergedOptionsをoptionsプロパティとして保存します。
    this.options = mergedOptions;


    // options.headerSelectorにマッチする要素を検索し、headerElementプロパティとして保存します。
    this.headerElement = document.querySelector(this.options.headerSelector);
    // もしheaderElementが存在しない場合、エラーを投げます。
    if (!this.headerElement) throw TypeError('固定ヘッダーの指定は必須です');

    /**
     * ボタンとは別にメニューを閉じるトリガーとなるセレクタの設定
     * メニュー内のリンクをクリック時にメニューを閉じる設定をしている場合はメニュー内のa要素をクリック時にもメニューを閉じる
     */
    // closeTriggerには、クリックイベントが発生したらドロワーメニューを閉じる要素が格納されます。
    this.closeTrigger = document.querySelectorAll(
      this.options.closeTriggerSelector
    );


    /**
     * メニュー内のリンクをクリック時にメニューを閉じる設定をしている場合はメニュー内のa要素をクリック時にもメニューを閉じる
     */
    // innerLinkは、メニュー内のa要素にクリックイベントが発生したらドロワーメニューを閉じる要素で、.js-ignore-targetクラスを持たないものが格納されます。
    this.innerLink = this.drawerElement.querySelectorAll(
      'a:not(.js-ignore-target)'
    );


    /**
     * メニューオープン時に読み上げおよびに対象外にするセレクタの設定
     */
    // inertTargetプロパティには、メニューオープン時に読み上げおよびに対象外にする要素が格納されます。
    this.inertTarget = document.querySelectorAll(this.options.inertTarget);
    // もしinertTargetが存在しない場合、エラーを投げます。
    if (!this.inertTarget.length)
      throw TypeError('inert対象のセレクタの指定は必須です');


    /**
     * イベントリスナーの設定
     */
    // イベントリスナー関数をthisにバインドして、それぞれのハンドラーに格納します。
    this.buttonHandler = this.handleButtonClick.bind(this);
    this.closeTriggerHandler = this.handleCloseTriggerClick.bind(this);
    this.innerLinkHandler = this.handleInnerLinkClick.bind(this);
    this.keyupHandler = this.handleKeyup.bind(this);
  }



  /**
   * initメソッド
   */
  init() {
    // 状態格納で使用する変数
    this.isExpanded = false;

    // 初期化時に属性を付与する
    this.prepareAttributes();

    // メニューボタンをクリックしたらbuttonHandlerを実行
    attachEvent(this.hamburgerElement, 'click', this.buttonHandler);
  }


  /**
   * HTML要素に必要な属性を追加するメソッド
   */
  prepareAttributes() {
    // モーダルメニュー本体にinert属性を設定
    this.drawerElement.setAttribute('inert', '');

    // メニューボタンのaria-controls属性にdrawerElementのidを設定
    this.hamburgerElement.setAttribute(
      'aria-controls',
      this.drawerElement.getAttribute('id')
    );

    // aria-expanded属性にfalseを設定（メニューが閉じている）
    this.hamburgerElement.setAttribute('aria-expanded', 'false');
    // aria-haspopup属性にtrueを設定し（ポップアップメニューを持っている）
    this.hamburgerElement.setAttribute('aria-haspopup', 'true');

    // headerElementに対して、data-drawer-opened属性にfalseを設定し、ドロワーが閉じていることを示します。
    this.headerElement.setAttribute('data-drawer-opened', 'false');

    // ドロワーメニューの遷移時間をCSSカスタムプロパティとして設定します。
    document.documentElement.style.setProperty(
      '--drawer-toggle-duration',
      `${this.options.toggleDuration}ms`
    );
  }

  /**
   * ハンバーガーメニューのボタンがクリックされたときのメソッド
   */
  handleButtonClick(event) {
    // ページ遷移を無効化
    // event.preventDefault();

    // メニューが閉じている場合を開く、開いている場合は閉じる
    if (!this.isExpanded) {
      this.open();
    } else {
      this.close();
    }
  }


  /**
   * メニュー閉じるトリガーがクリックされたときに実行されるメソッド
   */
  handleCloseTriggerClick(event) {
    event.preventDefault();
    this.close();
  }

  /**
   * メニュー内のリンクがクリックされたときに、メニューを閉じるメソッド
   */
  handleInnerLinkClick(event) {
    this.close();
  }

  /**
   * キー操作に応じて操作する
   */
  handleKeyup(event) {
    // キーボードから押されたキーが'Escape'または'Esc'であれば、メニューを閉じる
    if (event.key === 'Escape' || event.key === 'Esc') this.close();
  }


  /**
   * メニューを開くためのメソッド
   */
  open() {
    // キーボードからキーが押されたとき、handleKeyupを実行するイベントリスナーを追加します。
    attachEvent(document, 'keyup', this.keyupHandler);

    // 各閉じるトリガーがクリックされたとき、handleCloseTriggerClickを実行するイベントリスナーを追加します。
    this.closeTrigger.forEach((trigger) => {
      attachEvent(trigger, 'click', this.closeTriggerHandler);
    });

    // clickLinkToCloseがtrueの場合、メニュー内のリンクがクリックされたとき、handleInnerLinkClickを実行するイベントリスナーを追加します。
    if (this.options.clickLinkToClose) {
      this.innerLink.forEach((link) => {
        attachEvent(link, 'click', this.innerLinkHandler);
      });
    }

    // HTML要素の属性を、メニューが開いている状態に変更します。
    this.changeAttribute(true);
    // スクロールを無効化します。
    backfaceFixed(true);

    // 100ミリ秒遅れてisExpandedをtrueにし、メニューが開いている状態を保存します。
    setTimeout(() => {
      this.isExpanded = true;
    }, 100);
  }

  close() {
    // メニューを閉じるためのメソッドです。

    // メニューボタンや各種トリガーのイベントリスナを解除します。
    attachEvent(this.hamburgerElement, 'click', this.buttonHandler).unsubscribe();
    attachEvent(document, 'keyup', this.keyupHandler).unsubscribe();
    this.closeTrigger.forEach((trigger) => {
      attachEvent(trigger, 'click', this.closeTriggerHandler).unsubscribe();
    });

    // clickLinkToCloseがtrueの場合、メニュー内リンクのイベントリスナを解除します。
    if (this.options.clickLinkToClose) {
      this.innerLink.forEach((link) => {
        attachEvent(link, 'click', this.innerLinkHandler).unsubscribe();
      });
    }

    // HTML要素の属性を、メニューが閉じている状態に変更します。
    this.changeAttribute(false);
    // スクロールを可能にします。
    backfaceFixed(false);

    // メニューの遷移時間分遅れて、ハンバーガーメニューボタンのイベントリスナを再設定し、isExpandedをfalseにし、メニューが閉じている状態を保存します。
    setTimeout(() => {
      attachEvent(this.hamburgerElement, 'click', this.buttonHandler);
      this.isExpanded = false;
    }, this.options.toggleDuration);
  }

  changeAttribute(expanded) {
    // メニューが開いたときにtrue、閉じたときにfalseが渡され、HTML要素の属性を変更するメソッドです。

    // メニューが開いた場合、drawerElementのinert属性を削除します。閉じた場合、inert属性を設定します。
    if (expanded) {
      this.drawerElement.removeAttribute('inert');
    } else {
      this.drawerElement.setAttribute('inert', '');
    }

    // hamburgerElementのaria-expanded属性に、expanded引数（メニューが開いているか閉じているかを表すブール値）を文字列化して設定します。
    this.hamburgerElement.setAttribute('aria-expanded', String(expanded));

    // headerElementのdata-drawer-opened属性に、expanded引数を文字列化して設定します。
    this.headerElement.setAttribute('data-drawer-opened', String(expanded));

    // inertTarget（ドロワーメニューが開いている間、読み上げおよびクリック対象外にする要素）の各要素について、メニューが開いた場合、inert属性を設定します。閉じた場合、inert属性を削除します。
    this.inertTarget.forEach((element) => {
      if (expanded) {
        element.setAttribute('inert', '');
      } else {
        element.removeAttribute('inert');
      }
    });
  }
}


