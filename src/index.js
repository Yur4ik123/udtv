import "./assets/scss/main.scss";
import UIkit from 'uikit';
import SlimSelect from 'slim-select'
import 'cropperjs/dist/cropper.css';
import Croppie from 'croppie';


let files = [];

function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
    ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], {
    type: mimeString
  })
}

let car_select = document.getElementById('car_select');
if (car_select) {
  let car_info = document.getElementById('car__row');
  car_select.addEventListener('change', (evt) => {
    car_select.value == 'true' ? car_info.style.display = 'grid' : car_info.style.display = 'none'
  })
}
let upload_image = document.getElementById('upload_input');
if (upload_image) {
  upload_image.addEventListener('change', function (evt) {
      let file = evt.target.files;
      let f = file[0];
      if (!f.type.match('image.*')) {
        alert("Image only please....");
        return false;
      }

      let reader = new FileReader();
      console.log(reader)
      reader.onload = (function (theFile) {
        return function (e) {
          let modal = document.getElementById('crop_modal')
          UIkit.modal(modal).show();
          let basic = new Croppie(document.querySelector('.append_crop_imgs'), {
            viewport: {
              width: 300,
              height: 400
            },
            showZoomer: false,
            enableResize: false,
          });
          console.log(basic)
          basic.bind({
            url: e.target.result,
          });
          document.getElementById('save_crop').addEventListener('click', function () {
            let size = 'viewport';
            basic.result({}).then(function (resp) {
              UIkit.modal(modal).hide();
              document.querySelector('.append_image_loadeds').innerHTML = '<img class="thumb" title="' + theFile.name + '" src="' + resp + '"  alt=""/>';
              var blobFile = DataURIToBlob(resp);
              files[0] = blobFile;
              basic.destroy();
            });
          })

        };
      })(f);
      reader.readAsDataURL(f);
    }
  )
}


document.querySelectorAll(".custom__select").forEach(el => {
  new SlimSelect({
    select: el,
    settings: {
      showSearch: false,
    }
  })
});
