$(document).ready(function() {
    var slickSlider = $(".js-slider-expert");
    slickSlider.slick({
        arrows: false,
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
        //centerMode: true,
        //centerPadding: '15px',
        //prevArrow:
        //'<div class="slider-brand__arrow-left"><i class="fas fa-angle-left"></i></div>',
        //nextArrow:
        //'<div class="slider-brand__arrow-right"><i class="fas fa-angle-right"></i></div>'
        /*responsive: [
            {
              settings: {
                slidesToShow: 1,
                arrows: false,
              }
            }
        ],*/
    });

    var slickSlider = $(".js-slider-places");
    slickSlider.slick({
        arrows: false,
        infinite: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
        //centerMode: true,
        //centerPadding: '15px',
        //prevArrow:
        //'<div class="slider-brand__arrow-left"><i class="fas fa-angle-left"></i></div>',
        //nextArrow:
        //'<div class="slider-brand__arrow-right"><i class="fas fa-angle-right"></i></div>'
        /*responsive: [
            {
              settings: {
                slidesToShow: 1,
                arrows: false,
              }
            }
        ],*/
    });
});
