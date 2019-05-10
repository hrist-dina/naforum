import Validator from './Validator'
import Calendar from  './Calendar'
import Inputmask from 'inputmask/dist/inputmask/inputmask.numeric.extensions'
$(document).ready(function() {
    let contactForm = new Validator('.js-contact-form');
    contactForm.validateAgree();
    $('.js-contact-form').on('submit', function (e) {
        // Если вернулась ошибка, останавливаем отпраку формы
        if (contactForm.init()) {
            e.preventDefault();
        }
    });

    let im = new Inputmask('+7(999)999-99-99');
    im.mask($('.js-phone-inputmask'));

    let dates = [{
        year: 2019,
        months: [
            {
                number: 4,
                days: [
                    {
                        number: 2,
                        events: [
                            'orange',
                            'green',
                            'skyblue',
                            'purple'
                        ]
                    },
                    {
                        number: 5,
                        events: [
                            'orange',
                            'green',
                            'skyblue',
                            'purple'
                        ]
                    },

                ]
            },
            {
                number: 5,
                days: [
                    {
                        number: 10,
                        events: [
                            'orange',
                            'green',
                            'skyblue',
                            'purple'
                        ]
                    },
                    {
                        number: 15,
                        events: [
                            'orange',
                            'green',
                            'skyblue',
                            'purple'
                        ]
                    },

                ]
            }
        ]
    }];

    let calendar = new Calendar('.js-datepicker', dates);
    $(".js-calendar-show").on('click', function () {
        $(this).toggleClass("hide");
        $('.js-calendar').toggleClass("active");
        calendar.initSwipe()
    });

    $('.js-calendar').mCustomScrollbar({
        axis: 'y',
        scrollbarPosition: 'inside',
        advanced: {
            updateOnContentResize: true
        },
        live: true,
        theme: "minimal"
    });

    $('.js-select2-purple').select2({
        minimumResultsForSearch: Infinity,
        theme: 'naforum-purple',
        width: 'resolve'
    });

    $('.js-select2-bunting').select2({
        minimumResultsForSearch: Infinity,
        theme: 'naforum-bunting',
        width: 'resolve'
    });

    $('.js-select2-bunting').on('select2:open', function () {
        setTimeout(function () {
            $('ul.select2-results__options').mCustomScrollbar({
                axis: 'y',
                scrollbarPosition: 'inside',
                advanced: {
                    updateOnContentResize: true
                },
                live: true,
                theme: "minimal"
            });
        }, 0);
    });

    $(".js-hamburger").on("click", function() {
        $(this).toggleClass("is-active");
        $(".js-mobile-menu").toggleClass("mobile-menu_active");
        $("html").toggleClass("overflow-hiiden");
    });

    $(".js-slider-expert").slick({
        rows: 0,
        arrows: false,
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    });

    $(".js-slider-places").slick({
        rows: 0,
        arrows: false,
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    });

    $(".js-event-slider").slick({
        rows: 0,
        arrows: false,
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    });



    if ($("#js-map").length) {
        ymaps.ready(init);
    }

    function init() {

        var map = new ymaps.Map(
            // ID DOM-элемента, в который будет добавлена карта.
            "js-map",
            // Параметры карты.
            {
                // Географические координаты центра отображаемой карты.
                center: [54.98, 82.89],
                // Масштаб.
                zoom: 16,
                // Элементы управления
                controls: ["zoomControl"]
            }
        );

        map.behaviors.disable("scrollZoom");

        var myPlacemark = new ymaps.Placemark(
            [54.98, 82.89],
            {
                hintContent: "Собственный значок метки с контентом",
                balloonContent: "А эта — новогодняя",
                iconContent: "12"
            },
            {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: "default#image",
                // Своё изображение иконки метки.
                iconImageHref: "/img/map-balloon.svg",
                // Размеры метки.
                iconImageSize: [52, 53],
            }
        );

        map.geoObjects.add(myPlacemark);
    }
});