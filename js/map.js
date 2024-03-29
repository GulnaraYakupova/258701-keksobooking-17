'use strict';

/**
* Взаимодействие с картой, перетаскивание метки
* Зависит от модуля data.js
* метод window.showMapInactiveStatement доступен для других модулей
*/
(function () {
  var MIN_X_MAIN = 0;
  var MAIN_PIN_WIDTH = 65;
  var MAX_X_MAIN = 1200 - MAIN_PIN_WIDTH;
  var MIN_Y_MAIN = 130;
  var MAX_Y_MAIN = 630;
  var MAIN_PIN_LEFT = 570;
  var MAIN_PIN_TOP = 375;
  var isMapActive = false;
  var form = document.querySelector('.ad-form');
  var formFieldsets = form.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var activateMap = function () {
    map.classList.remove('map--faded');
    isMapActive = true;
  };

  var onPinMouseDown = function (evt) {
    evt.preventDefault();
    var pinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onPinMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var diff = {
        x: pinCoords.x - evtMove.clientX,
        y: pinCoords.y - evtMove.clientY
      };

      pinCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var coordX = mainPin.offsetLeft - diff.x;
      var coordY = mainPin.offsetTop - diff.y;

      if (coordX > MAX_X_MAIN) {
        coordX = MAX_X_MAIN;
      } else if (coordX < MIN_X_MAIN) {
        coordX = MIN_X_MAIN;
      }

      if (coordY > MAX_Y_MAIN) {
        coordY = MAX_Y_MAIN;
      } else if (coordY < MIN_Y_MAIN) {
        coordY = MIN_Y_MAIN;
      }

      mainPin.style.left = coordX + 'px';
      mainPin.style.top = coordY + 'px';
      window.util.setAddress(coordX, coordY);
    };

    var enableFormElements = function () {
      for (var j = 0; j < formFieldsets.length; j++) {
        formFieldsets[j].disabled = false;
      }
    };

    var enableForm = function () {
      form.classList.remove('ad-form--disabled');
    };
    var onPinMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onPinMouseUp);

      if (!isMapActive) {
        window.data.load();
        activateMap();
        enableForm();
        enableFormElements();
      }

      window.util.setAddress(mainPin.style.left, mainPin.style.top);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onPinMouseUp);
  };

  mainPin.addEventListener('mousedown', onPinMouseDown);

  /**
  * Переводит карту в неактивное состояние
  */
  var disableMap = function () {
    map.classList.add('map--faded');
    isMapActive = false;
  };

  /**
  * Возврат карты в первоначальное состояние
  */
  window.showMapsInactiveStatement = function () {
    disableMap();
    window.pins.remove();
    mainPin.style.left = MAIN_PIN_LEFT + 'px';
    mainPin.style.top = MAIN_PIN_TOP + 'px';
    window.util.setAddress(MAIN_PIN_LEFT, MAIN_PIN_TOP);
  };
})();
