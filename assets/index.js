import $ from "jquery/dist/jquery.js";
window.$ = $

import css from './index.css';

import _ from "rangeslider.js";
import _ from "rangeslider.js/dist/rangeslider.css";

$(() => {
  $('body').css({color:'red'})

  $('#show_slider').click(() => {
    $('#show_slider').hide()
    $('#slider_block').show()

    $('#slider').rangeslider({polyfill: false})
  })
})
