import {attachEvent} from '../utiles/utiles.js';
import MicroModal from 'micromodal';

export class DrawerMenu {
  // コンストラクタを定義。
  // 「drawer(モーダルメニュー本体のHTML要素)」「button(メニューボタンのHTML要素)」「options(オプション設定)」
  constructor(drawer, button, options) {

    //drawer が　#ではじまるか確認
    if (!drawer.startsWith('#')) {
      throw TypeError('モーダルメニューは#で始まるセレクタである必要があります');
    }
    //drawerの#を除いた値を取得
    this.drawerId = drawer.slice(1);

    // モーダルメニュー本体を保存
    this.drawer = drawer;
    this.drawerElement = document.querySelector(drawer);
    if (!this.drawerElement)
      throw TypeError('指定したモーダルメニュー本体のセレクタが見つかりません');


    //button が #ではじまるか確認
    if (!button.startsWith('#')) {
      throw TypeError('メニューボタンは#で始まるセレクタである必要があります');
    }

    //buttonの#を除いた値を取得
    this.buttonId = button.slice(1);

    // メニューボタンを保存
    this.button = button;
    this.hamburgerElement = document.querySelector(button);
    if (!this.hamburgerElement)
      throw TypeError('指定したメニューボタンのセレクタが見つかりません');

    // デフォルトのオプション設定値
    const defaultOptions = {
      // headerSelector: '#js-header',
      // closeTriggerSelector: '.js-drawer-menu-close', // ボタンとは別にクリック時にメニューを閉じるトリガーとなるセレクタ
      // inertTarget: 'main, footer', // 開いている時はこのセレクタを読み上げ対象外にする
      // clickLinkToClose: true, // メニュー内のリンクをクリック時にメニューを閉じるか
      // toggleDuration: 500 // メニューの遷移時間
    };

    // デフォルトのオプション設定値と、引数で受け取ったオプション設定値をマージ
    const mergedOptions = Object.assign(defaultOptions, options);
    // mergedOptionsをoptionsプロパティとして保存します。
    this.options = mergedOptions;

    this.buttonHandler = this.buttonClick.bind(this);
  }

  init() {
    // メニューボタンをクリックしたらbuttonHandlerを実行
    attachEvent(this.hamburgerElement, 'click', this.buttonHandler);
  }


  buttonClick(event) {
    if (this.hamburgerElement.ariaExpanded==="false") {
      this.open();
    } else {
      this.close();
    }
  }


  open() {
    this.hamburgerElement.ariaExpanded = "true";
    MicroModal.show(this.drawerId, {
      disableScroll: true, // ページスクロールを無効に
      awaitOpenAnimation: true, // 開閉時のアニメーションを可能に
      awaitCloseAnimation: true,
      onClose:()=>{
        this.hamburgerElement.ariaExpanded = "false";
      },
      onShow:()=> {
        // モーダルが表示されたときにボタンにフォーカスを設定
        this.hamburgerElement.focus();
      },
    });
  }

  close() {
    this.hamburgerElement.ariaExpanded = "false";
    MicroModal.close(this.drawerId);
  }
}
