import swipe from "jquery-touchswipe";
import "jquery-mousewheel";
import datapicker from "air-datepicker";
export default class Calendar {
  /**
     * @param selector - string (пример: '.js-datepicker')
     * @param dateEvents - array (пример:
     * let dates = [{
            year: 2019,
            months: [
                {
                    number: 5,
                    days: [
                        {
                            number: 2,
                            event: [
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
                }
            ]
        }];
     )
     */
  constructor(selector, dateEvents) {
    // Селектор, на который вешается датапикер
    this.selector = selector;

    // Массив объектов с событиями
    this.dateEvents = dateEvents;

    this.eventTemplate = {
      list: '<ul class="calendar__day-event"></ul>',
      item: "<li></li>"
    };

    // Инициализация
    if ($(this.selector).length) {
      this.datepicker = $(this.selector)
        .datepicker({
          inline: true,
          navTitles: {
            days: "MM yyyy"
          },
          onRenderCell: this.onRenderCell,
          // Пробрасываем массив и шаблон в конструктор датапикера, чтобы использовать в методах класса
          dateEvents: this.dateEvents,
          eventTemplate: this.eventTemplate
        })
        .data("datepicker");

      // Инициализируем кастомную навигацию
      this.initCustomNavigation();
    }
  }

  initCustomNavigation() {
    // Устанавливаем заголовок даты в кастомную навигацию
    this.getDateTitle();

    // Ловим события для переключения каледаря, меняем заголовок
    $(".js-datepicker-prev").on("click", () => {
      this.datepicker.prev();
      this.getDateTitle();
    });
    $(".js-datepicker-next").on("click", () => {
      this.datepicker.next();
      this.getDateTitle();
    });
  }

  initSwipe() {
    let that = this;

    if ($(".js-calendar").hasClass("active")) {
      $(".js-calendar.active")
        .find(".datepicker--content")
        .swipe({
          swipeStatus: function(
            event,
            phase,
            direction,
            distance,
            duration,
            fingerCount,
            fingerData,
            currentDirection
          ) {
            if (phase === "end") {
              // Сработает через 20 пикселей то число которое выбрали в threshold
              if (direction === "left") {
                that.datepicker.next();
                // Сработает при движении влево
              }
              if (direction === "right") {
                that.datepicker.prev();
                // Сработает при движении вправо
              }

              that.getDateTitle();
            }
          },
          triggerOnTouchEnd: false,
          threshold: 10 // сработает через 20 пикселей
        });
    } else {
      $(".datepicker--content").swipe("destroy");
    }
  }

  getDateTitle() {
    $(".js-datepicker-title").text(
      this.datepicker.nav._getTitle(this.datepicker.currentDate)
    );
  }

  onRenderCell(date, cellType) {
    let currentDay = date.getDate();
    // +1 так как отсчет идет с 0
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    for (let i = 0; i < this.dateEvents.length; i++) {
      if (this.dateEvents[i].year !== currentYear) {
        continue;
      }
      let months = this.dateEvents[i].months;

      for (let i = 0; i < months.length; i++) {
        if (months[i].number !== currentMonth) {
          continue;
        }
        let days = months[i].days;

        for (let i = 0; i < days.length; i++) {
          if (days[i].number !== currentDay) {
            continue;
          }
          if (days[i].events.length) {
            let list = $(this.eventTemplate.list);

            days[i].events.map(itemEvent => {
              list.append($(this.eventTemplate.item).addClass(itemEvent));
            });

            if (cellType === "day") {
              return {
                html: `<span>${currentDay}</span>` + list[0].outerHTML
              };
            }
          }
        }
      }
    }

    if (cellType === "day") {
      return {
        html: `<span>${currentDay}</span>`
      };
    }
  }
}
