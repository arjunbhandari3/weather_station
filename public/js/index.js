(function ($) {

    "use strict";
    $(function () {
        $('.navbar li a').each(function () {
            if ($(this).prop('href') == window.location.href) {
                $(this).addClass('active');
                $(this).parents('.navbar .nav-item').addClass('active');
            }
        });
    });
})(jQuery);