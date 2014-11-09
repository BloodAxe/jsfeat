'use strict';

describe('jsfeat', function(){

  describe('imgproc', function(){

    it('grayscale', function(done) {

      var img = new Image();
      img.src = 'lena.png';
      img.onload = function() {

        var width = img.width;
        var height = img.height;

        var canvas = document.createElement('canvas');
        var context2d = canvas.getContext('2d');

        context2d.drawImage(img, 0, 0, width, height);
        var image_data = context2d.getImageData(0, 0, width, height);
 
        var gray_img = new jsfeat.matrix_t(width, height, jsfeat.U8_t | jsfeat.C1_t);
        var code = jsfeat.COLOR_RGBA2GRAY;

        jsfeat.imgproc.grayscale(image_data.data, width, height, gray_img, code);
        done();
      };

    });

  });
   
});