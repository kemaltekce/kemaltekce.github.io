$(document).on('scroll', function(){
    $('div.moving-p').css('left', - 0.3 * window.scrollY + 'px')
    $('div.moving-p#reverse').css('left', 0.3 * window.scrollY + 'px')
})