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
        DG.marker([54.98, 82.89], { icon: mapIcon }).addTo(map);
    });
});
