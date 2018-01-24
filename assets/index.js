import $ from "jquery/dist/jquery.js";

// define global $ which will be visible in the console always
window.$ = $

import _ from './index.css';

// If I use css importing here - it works fine
// And it doesn't work when I move this stuff it to corresponding chunks
import _ from "fotorama/fotorama.css";
import _ from "rangeslider.js/dist/rangeslider.css";

$(() => {
  $('body').css({color:'red'})

  $('#show_slider').click(() => {
    $('#show_slider').hide()

    import("rangeslider.js").then(_ => {
      $('#slider_block').show()
      $('#slider').rangeslider({polyfill: false})
    })
  })

  $('#show_gallery').click(() => {
    $('#show_gallery').hide()

    import("fotorama/fotorama.js").then(_ => {
      $('#gallery_block').show()
      $('#gallery').fotorama()
    })
  })
})
