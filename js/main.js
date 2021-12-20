$(function() {
  //ウィンドウ幅・高さを取得
  const windowWidth = $(window).width();
  const windowHeight = $(window).height();
  // .parallax要素を取得
  const $targets = $('.parallax');
  // イベント発火のタイミング
  const offset = 50;

  // 各パララックス要素に対し、イベント発火の地点を取得
  let targetPositions = []
  $targets.each(function(index, el) {
    targetPositions[index] = $(el).offset().top - offset;
  })

  //画面表示時にすでにパララックス要素が見える場合は.on-load-parallxクラスをつけ特別処理を後で行う
  for(let i = 0; i < targetPositions.length; i++) {
    if(targetPositions[i] < windowHeight) {
      const theTarget = $targets[i]
      $(theTarget).addClass('on-load-parallax')
    }
  }

  //スクロールイベント
  $(window).scroll(function() {
    //スクロール量を取得
    const scroll = $(window).scrollTop();
    for(let i = 0; i < targetPositions.length; i++) {
      if(scroll + windowHeight >= targetPositions[i]) { // スクロール量が発火地点に達したら要素のズラし開始
        //要素の移動速度
        let speed = 0.3
        const theTarget = $targets[i];
        if(windowWidth <= 768) {//スマホ時のスピード
          speed = speed / 2
        }

        let translateY = 0;
        if($(theTarget).hasClass('on-load-parallax')) {//画面表示時に見えてたパララックス要素にはスクロール量で計算
          translateY = scroll * speed
        } else { // 残りは「発火地点からのスクロール量」で計算
          translateY = (scroll - targetPositions[i] + windowHeight) * speed
        }
        // Y方向に位置をずらす
        $(theTarget).css('transform', 'translateY('+ translateY + 'px)')
      } else { // イベントに達していない場合、移行の処理はしない
        break;
      }
    }
  })
})