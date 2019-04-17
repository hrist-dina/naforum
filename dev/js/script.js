$(document).ready(function() {
    var slickSlider = $(".js-slider-expert");
    slickSlider.slick({
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
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
