(function($) {
    // WOW.js
    if (typeof WOW !== "undefined") {
        new WOW().init();
    }

    // Set active nav item according to location
    const pathname = window.location.pathname;
    const navpath = pathname.length > 1 ? pathname.slice(0, -1) : pathname;
    let parentLink = navpath.split("/");
    if (parentLink.length) {
        parentLink = "/" + parentLink[1]
    }
    $('#navbar-wrapper #navbarNav .js-scroll-trigger[href="' + navpath + '"]').parent().addClass('active');
    $('#navbar-wrapper #navbarNav .js-scroll-trigger[href="' + parentLink + '"]').parent().addClass('active');
    $('#navbar-wrapper #navbarNav .dropdown-menu a[href="' + navpath + '"]').addClass('active');


    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 50,
                }, 1000, 'easeInOutExpo');
                return false;
            }
        }
    });

    // Scroll to top button appear
    $(document).scroll(() => {
        const scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        }
        else {
            $('.scroll-to-top').fadeOut();
        }
    });


    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#navbar-wrapper',
        offset: 80
    });

    // Collapse Navbar
    const navbarCollapse = () => {
        if ($("#navbar-wrapper").offset().top > 100) {
            $("#navbar-wrapper").addClass("navbar-shrink");
        }
        else {
            $("#navbar-wrapper").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Expand product
    $(".product-footer .expand-product").on("click", (event) => {
        $(event.target).parent().prev().toggleClass("expanded");
        setTimeout(() => {
             $(event.target).parent().prev().toggleClass("overflow")
        }, 300)
    });
    
    
    const $contactForm = $('#contact-form');
    $contactForm.submit(function(e) {
        e.preventDefault();
        const $submit = $('.btn-primary', $contactForm);
        const defaultSubmitText = $submit.text();
        const data = $(this).serializeArray();
        $.post('https://formspree.io/oksankapl17@gmail.com', { name: data[0].value, email: data[1].value, question: data[1].value })
            .done(() => {
                $contactForm.prepend('<div class="alert alert-success alert-dismissible">Повідомлення надіслано!<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                $submit.text('Повідомлення надіслано!');
                setTimeout(function() {
                    $contactForm.find('.alert').remove();
                    $submit.attr('disabled', false).text(defaultSubmitText);
                    $('#contactModal').modal('hide');
                }, 3000);
            })
            .fail(() => {
                $contactForm.find('.alert').remove();
                $contactForm.prepend('<div class="alert alert-danger alert-dismissible"Ой, щось пішло не так :(<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
                $submit.text('Помилка');
                setTimeout(function() {
                    $('.alert').remove();
                    $submit.attr('disabled', false).text(defaultSubmitText);
                }, 3000);
            })
    });
})(jQuery);