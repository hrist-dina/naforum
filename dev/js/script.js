$(document).ready(function() {
    $(".js-hamburger").on("click", function() {
        $(this).toggleClass("is-active");
        $(".js-mobile-menu").toggleClass("mobile-menu_active");
        $("html").toggleClass("overflow-hiiden");
    });

    $(".js-slider-expert").slick({
        arrows: false,
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    });

    $(".js-slider-places").slick({
        arrows: false,
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    });

    $(".js-event-slider").slick({
        arrows: false,
        infinite: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    });

    var map;
    DG.then(function() {
        map = DG.map("js-event-map", {
            center: [54.98, 82.89],
            zoom: 13
        });

        var mapIcon = DG.divIcon({
            className: "map-balloon",
            iconSize: [52, 53]
        });
        DG.marker([54.98, 82.89], {icon: mapIcon}).addTo(map);
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
                zoom: 3,
                // Тип покрытия карты: "Спутник".
                type: "",
                // Элементы управления
                controls: ["geolocationControl", "zoomControl"]
            },
            {
                // Поиск по организациям.
                //searchControlProvider: 'yandex#search'
            }
        );

        map.behaviors.disable("scrollZoom");

        myPlacemark = new ymaps.Placemark(
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
                iconImageHref: "/img/balloon.svg",
                // Размеры метки.
                iconImageSize: [52, 53],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-5, -38]
            }
        );

        map.geoObjects.add(myPlacemark);
    }
});
