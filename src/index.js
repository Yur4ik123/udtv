import "./assets/scss/main.scss";
import UIkit from 'uikit';
import SlimSelect from 'slim-select'
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

const image = document.getElementById('editor_container');
const uploader = document.getElementById('form__custom')
var bar = document.getElementById('js-progressbar');
let save_btn = document.querySelector('.save__image');
let cropper;
UIkit.upload('.js-upload', {

  url: 'image-upload',
  multiple: false,

  beforeSend: function (environment) {
    console.log('beforeSend', arguments);

    // The environment object can still be modified here.
    // var {data, method, headers, xhr, responseType} = environment;

  },
  beforeAll: function () {
    console.log('beforeAll', arguments);
  },
  load: function () {
    console.log('load', arguments);
  },
  error: function () {
    console.log('error', arguments);
  },
  complete: function () {
    console.log('complete', arguments);
  },

  loadStart: function (e) {
    console.log('loadStart', arguments);

    bar.removeAttribute('hidden');
    bar.max = e.total;
    bar.value = e.loaded;
  },

  progress: function (e) {
    console.log('progress', arguments);

    bar.max = e.total;
    bar.value = e.loaded;
  },

  loadEnd: function (e) {
    uploader.style.display = 'none';
    bar.setAttribute('hidden', true);
    image.style.display = 'block';
    save_btn.style.display = 'block';
    cropper = new Cropper(image, {
      aspectRatio: 4 / 3,
      dragMode: 'move',
      cropBoxResizable: false,
    });

    bar.max = e.total;
    bar.value = e.loaded;
  },

  completeAll: function () {
    console.log('completeAll', arguments);

    setTimeout(function () {
      bar.setAttribute('hidden', 'hidden');
    }, 1000);

    alert('Upload Completed');
  }

});


function saveImage() {
  let cropped_image = cropper.getCroppedCanvas().toDataURL('image/jpeg');
  document.getElementById('input_image').value = cropped_image
  cropper.destroy();
  image.setAttribute('src', cropped_image);
  save_btn.style.display = 'none';
}

save_btn.addEventListener('click', () => {
  saveImage();
})
document.querySelectorAll(".custom__select").forEach(el => {
  new SlimSelect({
    select: el,
    settings: {
      showSearch: false,
    }
  })
});
