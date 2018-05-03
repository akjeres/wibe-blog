(function() {

    $('.search input').focus(function() {
        $('.search').addClass('active');
    });
    $('.search input').blur(function() {
        $('.search').removeClass('active');
    });
})();

/*if (getScrollBarState().vScrollbar) {
    document.querySelector('html').classList.add('scroll');
}*/
