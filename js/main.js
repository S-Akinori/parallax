$(function() {
  const windowWidth = $(window).width();
  const windowHeight = $(window).height();
  const $targets = $('.parallax');
  let targetPositions = []
  $targets.each(function(index, el) {
    targetPositions[index] = $(el).offset().top - 50;
  })
  for(let i = 0; i < targetPositions.length; i++) {
    if(targetPositions[i] < windowHeight) {
      const theTarget = $targets[i]
      $(theTarget).addClass('on-load-parallax')
    }
  }
  $(window).scroll(function() {
    const scroll = $(window).scrollTop();
    for(let i = 0; i < targetPositions.length; i++) {
      if(scroll >= targetPositions[i] - windowHeight) {
        let speed = 0.1
        const theTarget = $targets[i];
        if(windowWidth <= 768) {//スマホ時のスピード
          speed = speed / 2
        }

        let translateY = 0;
        if($(theTarget).hasClass('on-load-parallax')) {
          translateY = scroll * speed
        } else {
          translateY = (scroll - targetPositions[i] + windowHeight) * speed
        }
        $(theTarget).css('transform', 'translateY('+ translateY + 'px)')
      } else {
        break;
      }
    }
  })
})