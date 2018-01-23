import $ from "jquery/dist/jquery.js";
window.$ = $

import _ from './index.css';
import _ from "fotorama/fotorama.css";
import _ from "rangeslider.js/dist/rangeslider.css";

$(() => {
  $('body').css({color:'red'})

  $('#show_slider').click(() => {
    $('#show_slider').hide()

    import("rangeslider.js").then(component => {
      $('#slider_block').show()
      $('#slider').rangeslider({polyfill: false})
    })
  })

  $('#show_gallery').click(() => {
    $('#show_gallery').hide()

    import("fotorama/fotorama.js").then(component => {
      $('#gallery_block').show()
      $('#gallery').fotorama()
    })
  })
})
