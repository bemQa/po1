$(document).ready(function () {
    $('.burger').click(function(e){
        e.preventDefault();
        (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");

        $('.menu-links').toggleClass('active');
        $('body').on('click', function (e) {
            var div = $('.menu-links, .burger');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    });

    $('.anchor[href^="#"]').click(function () {
        if($(window).innerWidth() <= 1000) {
           $('.menu').removeClass('active'); 
           $('.burger').removeClass('active');
           $('header, .banner, .content, footer').removeClass('active-menu'); 
        }
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top-50;
        $('html, body').animate( { scrollTop: destination }, 500, 'swing' );
        return false;
    });

    function OpenPopup(popupId) {
        $('body').removeClass('no-scrolling');
        $('.popup').removeClass('js-popup-show');
        popupId = '#' + popupId;
        $(popupId).addClass('js-popup-show');
        $('body').addClass('no-scrolling');
    }

    $('.pop-op').click(function (e) {
        e.preventDefault();
        let data = $(this).data('popup');
        OpenPopup(data);
    });

    function closePopup() {
        $('.js-close-popup').on('click', function (e) {
            e.preventDefault();
            $('.popup').removeClass('js-popup-show');
            $('body').removeClass('no-scrolling');
        });
    }
    closePopup();

    function clickClosePopup(popupId) {
        popupId = '#' + popupId;
        $(popupId).removeClass('js-popup-show');
        $('body').removeClass('no-scrolling');
    }

    $('.email-form .js-submit').click(function(e){
        e.preventDefault();
        OpenPopup("email-confirm");
    });

    $('.table-wrapper').scrollbar();

    function maskInit() {
        $(".phone-mask").inputmask({
            mask:"+7(999)999-99-99",
            "clearIncomplete": true
        });
    }
    maskInit();

    function checkValidate() {
        var form = $('form');

        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorElement : 'span',
                errorPlacement: function(error, element) {
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.insertBefore(element);
                    }
                },
                messages: {
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value);
        });
    }
    checkValidate();

    function openAccordion() {
        var wrap = $('.accordion-wrap');
        var accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
          var $this = $(this);
          var $parent = $(this).parent();
          var content = $this.next();

          if (content.is(':visible')) {
            $this.removeClass('active');
            $parent.removeClass('active');
            content.slideUp('fast');
          } else {
            $this.addClass('active');
            $parent.addClass('active');
            content.slideDown('fast');
          }

        });
    }
    openAccordion();

    if($('.select').length > 1) {
        var parent = $('select').not('.select-search').parents('.select');
        $('select').not('.select-search').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: parent
        });
        $('.select-search').each(function() {
            let $this = $(this);
            let parent = $(this).parents('.select');
            $this.select2({
                dropdownParent: parent
            });
        });
    } else {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            dropdownParent: $('.select')
        });
    }

    function formatDate(date) {
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yyyy = date.getFullYear();
        if (yyyy < 10) yyyy = '0' + yyyy;

        return dd + '.' + mm + '.' + yyyy;
    }

    if($('.datepicker-here').length) {
        $('.datepicker-here').datepicker({
            minDate: new Date(2020, 1, 1)
        });
        $('.datepicker-here').val(formatDate(new Date()));
    }

    // восстановление пароля
    $('#restore-password .btn').click(function(e){
        e.preventDefault();
        if($('#restore-password form').valid()) {
            $('#restore-password .btn').addClass('disabled');
            $('.clock-text, .after-send').show();
            $('.before-send').hide();
            let dt = new Date();
            let time = dt.getFullYear() + '/' + (dt.getMonth()+1) + '/' + dt.getDate() + ' ' + dt.getHours() + ":" + (dt.getMinutes()+1) + ":" + dt.getSeconds();
            $('.clock').parent().show();
            $('.clock').countdown(time)
            .on('update.countdown', function(event) {
                $(this).html(event.strftime('%M:%S'));
            })
            .on('finish.countdown', function(event) {
                $(this).parent().hide();
                $('.after-send').hide();
                $('.before-send').show();
                $('#restore-password .btn').removeClass('disabled');
            });
        }
    });

    $('.register-code button').click(function(e){
        e.preventDefault();
        if($('.register-code').valid()) {
            OpenPopup('code-confirm');
        }
    });

    if($('.products-slider').length) {
        $('.products-slider').slick({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 300,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            verticalSwiping: true,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        verticalSwiping: false
                    }
                }
            ]
        });
        $('.products-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
            $('.register-code-title').removeClass('black-title');
            if($('.slick-active').hasClass('ag-slide') || $('.slick-active').hasClass('tuc-slide')) {
                $('.register-code-title').addClass('black-title');
            }
        });
    }

    if($('.tm-slider').length) {
        $('.tm-slider').slick({
            dots: false,
            arrows: true,
            infinite: false,
            speed: 300,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }

    if($('.scoreboard-messages').length && window.innerWidth > 1000) {
        $jScroller.add(".scoreboard-messages","#scroller","left",10, true);

        $jScroller.start();
    }

    $('.tab-trigger').click(function(){
        var tab = $(this).data('tab');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.tab-item').removeClass('active');
        $('.tab-item.' + tab).addClass('active');
        if($('.tab-item.tab-check').hasClass('active')) {
            $('.lk-info').addClass('active');
        } else {
            $('.lk-info').removeClass('active');
        }
    });

    if($('.dropify').length) {
        $('.dropify').dropify({
            tpl: {
                clearButton: '<button type="button" class="dropify-clear"><img src="img/delete.svg"></button>'
            }
        });
    }

    $('#get-prize button').click(function(e) {
        e.preventDefault();
        if($('#get-prize form').valid()) {
            OpenPopup('get-prize-address');
        }
    });

    $('#get-prize-address button').click(function(e) {
        e.preventDefault();
        if($('#get-prize-address form').valid()) {
            OpenPopup('get-prize-address-confirm');
        }
    });

    if($('.map').length) {
        $('.overlay-attr, .hidden-title, .hidden-line, .road, .stadium').addClass('overlay');

        $('body').on('click', function (e) {
            var div = $('.hidden-btn, .game-about');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                $('.overlay-attr, .hidden-title, .hidden-line, .road, .stadium').removeClass('overlay');
            }
        });
    }

    $('.ingame-btn').click(function(e) {
        e.preventDefault();
        var stadium_text = $(this).data('stadium');
        $('.ingame-stadium-name').text(stadium_text);
        $('body').removeClass('no-scrolling');
        $('.map-bg, .map, .game').addClass('ingame');
    });

    $('.target').click(function(e){
        var target = $(this).data('target');
        $(this).addClass('active');
        $('.target').addClass('disabled');
        $('.ingame-ball').addClass('active target'+target);
        setTimeout(function(){
            $('.ingame-ball').removeClass('active');
        },700);
        $('.goalkeeper').addClass('active target'+target);
        setTimeout(function(){
            OpenPopup('goal');
        },1500);
        setTimeout(function(){
            clickClosePopup('goal');
            OpenPopup('prize');
        },4000);
    });

    if($('[data-countchar]').length) {
        $('[data-countchar]').countChar();
    }

    if($('.main-prizes-section').length && window.innerWidth > 1000) {
        $(window).on('scroll',function () {
            var top = $(window).scrollTop();
            var destination = $('.main-prizes-section').offset().top-250;
            if(top >= destination) {
                $('.cup').addClass('active');
            }
        });
    } else if($('.main-prizes-section').length && window.innerWidth < 1000)  {
        $('.cup').addClass('active');
    }

    if($(".scoreboard-section").length && window.innerWidth > 1000) {
        $(".scoreboard-section").mousemove(function(e) {
            var $this = $(this);
            parallaxIt(e, ".lightning", -50, $this);
        });
    }

    if($(".products-slider").length && window.innerWidth > 1000) {
        $(".products-slider").mousemove(function(e) {
            var $this = $(this);
            parallaxIt(e, ".bg-slide", -15, $this);
        });
    }

    function parallaxIt(e, target, movement, container) {
        var $this = container;
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;

        TweenMax.to(target, 1, {
            x: (relX - $this.width() / 2) / $this.width() * movement,
            y: (relY - $this.height() / 2) / $this.height() * movement
        });
    }
});

$(window).on('load', function() {
    $('.wrapper').addClass('load');
    setTimeout(function(){
        $('#preloader').removeClass('js-popup-show');
    },500);
});