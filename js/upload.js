'use strict';
/** Загрузка фотографий */

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var fileChooserAvatar = document.querySelector('.ad-form__field .ad-form-header__input');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__upload .ad-form__input');
  var photosContainer = document.querySelector('.ad-form__photo-container');
  var priviewPhotoContainer = document.querySelector('.ad-form__photo');
  var isFirstPhotoChoosing = false;

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (element) {
        return fileName.endsWith(element);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewAvatar.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });

  fileChooserPhoto.addEventListener('change', function () {

    var file = fileChooserPhoto.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (element) {
        return fileName.endsWith(element);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (!isFirstPhotoChoosing) {
            var img = document.createElement('img');
            img.style.width = '100%';
            img.style.height = '100%';
            img.src = reader.result;
            priviewPhotoContainer.insertAdjacentElement('afterbegin', img);
            isFirstPhotoChoosing = true;
          } else {
            var priviewContainer = priviewPhotoContainer.cloneNode(true);
            var priview = priviewContainer.querySelector('img');
            priview.src = reader.result;
            photosContainer.appendChild(priviewContainer);
          }
        });

        reader.readAsDataURL(file);
      }
    }
  });
  /**
   * Удаляет загруженные фотографии
   */
  window.hideUploadedFiles = function () {
    previewAvatar.src = DEFAULT_AVATAR;
    var containers = Array.from(document.querySelectorAll('.ad-form__photo'));
    var firstPhoto = containers[0].querySelector('img');

    if (firstPhoto) {
      containers[0].removeChild(firstPhoto);
      isFirstPhotoChoosing = false;
    }
    var containersToRemove = containers.slice(1);
    containersToRemove.forEach(function (element) {
      photosContainer.removeChild(element);
    });
  };
})();
