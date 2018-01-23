import $ from "jquery/dist/jquery.js";
window.$ = $

import _ from './index.css';

import _ from "rangeslider.js";
import _ from "rangeslider.js/dist/rangeslider.css";

import _ from "fotorama/fotorama.js";
import _ from "fotorama/fotorama.css";

$(() => {
  $('body').css({color:'red'})

  $('#show_slider').click(() => {
    $('#show_slider').hide()
    $('#slider_block').show()

    $('#slider').rangeslider({polyfill: false})
  })

  $('#show_gallery').click(() => {
    $('#show_gallery').hide()
    $('#gallery_block').show()

    $('#gallery').fotorama()
  })
})
