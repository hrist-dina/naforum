import $ from "jquery";
import mCustomScrollbar from "malihu-custom-scrollbar-plugin";
import select2 from "select2";
import slick from "slick-carousel";
import Validator from "../classes/Validator";
import Calendar from "../classes/Calendar";
import Inputmask from "inputmask/dist/inputmask/inputmask.numeric.extensions";
import Modal from "../classes/Modal";
import { Select } from "../../blocks/components/select/Select";

$(document).ready(function() {
  let contactForm = new Validator(".js-contact-form");
  contactForm.validateAgree();
  $(".js-contact-form").on("submit", function(e) {
    // Если вернулась ошибка, останавливаем отпраку формы
    if (contactForm.init()) {
      e.preventDefault();
    }
  });

  let im = new Inputmask("+7(999)999-99-99");
  im.mask($(".js-phone-inputmask"));

  let modals = new Modal(".js-modal", ".js-modal-open", ".js-modal-close", {
    transitionIn: "fadeInLeft",
    transitionOut: "fadeOutLeft",
    width: "auto"
  });

  // Перебираем массив иницализированных модалок
  modals.modal.map(i => {
    // Берем элемент
    let item = $(modals.modal[i]);

    // Находим форму с классом для валидации
    let form = item.find("form.validator");
    // Если не найдено выходим из цикла
    if (!form.length) {
      return false;
    }
    // Иначе идем далее, создаем объект класса валидатора,
    // Передаем агументом объект формы
    let validatorForm = new Validator(form);
    // Слушаем отправку формы
    form.on("submit", function(e) {
      // Если вернулась ошибка, останавливаем отпраку формы
      if (validatorForm.init()) {
        e.preventDefault();
      }
    });
  });

  let dates = [
    {
      year: 2019,
      months: [
        {
          number: 11,
          days: [
            {
              number: 25,
              events: ["orange", "green", "skyblue", "purple"]
            },
            {
              number: 28,
              events: ["orange", "green", "skyblue", "purple"]
            }
          ]
        },
        {
          number: 12,
          days: [
            {
              number: 10,
              events: ["orange", "green", "skyblue", "purple"]
            },
            {
              number: 15,
              events: ["orange", "green", "skyblue", "purple"]
            }
          ]
        }
      ]
    },
    {
      year: 2020,
      months: [
        {
          number: 1,
          days: [
            {
              number: 4,
              events: ["orange", "green", "skyblue", "purple"]
            },
            {
              number: 11,
              events: ["orange", "green", "skyblue", "purple"]
            }
          ]
        },
        {
          number: 2,
          days: [
            {
              number: 10,
              events: ["orange", "green", "skyblue", "purple"]
            },
            {
              number: 15,
              events: ["orange", "green", "skyblue", "purple"]
            }
          ]
        }
      ]
    }
  ];

  let calendar = new Calendar(".js-datepicker", dates);
  $(".js-calendar-show").on("click", function() {
    $(this).toggleClass("hide");
    $(".js-calendar").toggleClass("active");
    calendar.initSwipe();
  });

  $(".js-calendar").mCustomScrollbar({
    axis: "y",
    scrollbarPosition: "inside",
    advanced: {
      updateOnContentResize: true
    },
    mouseWheelPixels: 75,
    live: true,
    theme: "minimal"
  });

  new Select(".js-select2-purple", "naforum-purple");

  new Select(".js-select2-bunting", "naforum-bunting");

  $(".js-select2-bunting").on("select2:open", function() {
    setTimeout(function() {
      $("ul.select2-results__options").mCustomScrollbar({
        axis: "y",
        scrollbarPosition: "inside",
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
    $("html").toggleClass("overflow-hidden");
    $(".js-header-middle, .js-header-right").toggleClass("hide");
  });

  /* Autoresize textarea */
  $("textarea")
    .each(function() {
      console.log(this.scrollHeight);
      this.setAttribute(
        "style",
        "height:" + this.scrollHeight + "px;overflow-y:hidden;"
      );
    })
    .on("input", function() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });

  $(".js-slider-expert").slick({
    prevArrow: $(".js-slider-places-prev"),
    nextArrow: $(".js-slider-places-next"),
    rows: 0,
    arrows: true,
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: "unslick"
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  $(".js-slider-places").slick({
    prevArrow: $(".js-slider-places-prev"),
    nextArrow: $(".js-slider-places-next"),
    rows: 0,
    arrows: true,
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2
        }
      }
    ]
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
});
