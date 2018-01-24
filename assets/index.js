import $ from "jquery/dist/jquery.js";

// define global $ which will be visible in the console always
window.$ = $

import _ from './index.css';

$(() => {
  $('body').css({color:'red'})

  $('#show_slider').click(() => {
    $('#show_slider').hide()

    import("./rangeslider.js").then(_ => {
      $('#slider_block').show()
      $('#slider').rangeslider({polyfill: false})
    })
  })

  $('#show_gallery').click(() => {
    $('#show_gallery').hide()

    import("./fotorama.js").then(_ => {
      $('#gallery_block').show()
      $('#gallery').fotorama()
    })
  })
})
