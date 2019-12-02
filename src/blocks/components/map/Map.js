import $ from "jquery";

export class Map {
  constructor(id = "map") {
    this.selector = id;
    this.idZoomIn = "zoom-in";
    this.idZoomOut = "zoom-out";

    this.map = $("#" + this.selector);

    this.init();
  }

  init() {
    this.initMap();
  }

  isMobile() {
    return $(window).width() <= 992;
  }

  zoomTemplate() {
    return (
      "<div class='map-zoom'>" +
      `<div id='${this.idZoomIn}' class='plus'>+</div>` +
      `<div id='${this.idZoomOut}' class='minus'>−</div>` +
      "</div>"
    );
  }

  controlOptions() {
    return {
      position: {
        top: this.isMobile() ? 130 : 130,
        right: 50
      }
    };
  }

  get placemark() {
    const img = this.map.data("img");
    return img ? img : "img/map/placemark.svg";
  }

  get hint() {
    return this.map.data("hint");
  }

  get coords() {
    return [this.map.data("coord-x"), this.map.data("coord-y")];
  }

  get center() {
    const x = this.map.data("center-x");
    const y = this.map.data("center-y");
    if (x && y) {
      return [x, y];
    } else {
      return this.coords;
    }
  }

  get zoom() {
    const zoom = this.map.data("zoom");
    return zoom ? zoom : 16;
  }

  initMap() {
    ymaps.ready().then(() => {
      let map = new ymaps.Map(this.selector, {
        center: this.center,
        zoom: this.zoom,
        controls: []
      });

      map.behaviors.disable("scrollZoom");

      let placemark = new ymaps.Placemark(
        this.coords,
        {
          hintContent: this.hint
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: "default#image",
          // Своё изображение иконки метки.
          iconImageHref: this.placemark,
          // Размеры метки.
          iconImageSize: [75, 95],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-32, -70]
        }
      );
      map.geoObjects.add(placemark);

      const self = this;
      // Создадим пользовательский макет ползунка масштаба.
      let ZoomLayout = ymaps.templateLayoutFactory.createClass(
          this.zoomTemplate(),
          {
            // Переопределяем методы макета, чтобы выполнять дополнительные действия
            // при построении и очистке макета.
            build: function() {
              // Вызываем родительский метод build.
              ZoomLayout.superclass.build.call(this);

              // Привязываем функции-обработчики к контексту и сохраняем ссылки
              // на них, чтобы потом отписаться от событий.
              this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
              this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

              // Начинаем слушать клики на кнопках макета.
              $(`#${self.idZoomIn}`).bind("click", this.zoomInCallback);
              $(`#${self.idZoomOut}`).bind("click", this.zoomOutCallback);
            },

            clear: function() {
              // Снимаем обработчики кликов.
              $(`#${self.idZoomIn}`).unbind("click", this.zoomInCallback);
              $(`#${self.idZoomOut}`).unbind("click", this.zoomOutCallback);

              // Вызываем родительский метод clear.
              ZoomLayout.superclass.clear.call(this);
            },

            zoomIn: function() {
              var map = this.getData().control.getMap();
              map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
            },

            zoomOut: function() {
              var map = this.getData().control.getMap();
              map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
            }
          }
        ),
        zoomControl = new ymaps.control.ZoomControl({
          options: { layout: ZoomLayout }
        });

      map.controls.add(zoomControl, this.controlOptions());
    });
  }
}
