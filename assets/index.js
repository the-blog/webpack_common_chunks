import $ from "jquery/dist/jquery.js";
import css from './index.css';
window.$ = $

$(() => {
  $('body').css({color:'red'})

  $('#show_slider').click(() => {
    $('#slider').show()
    $('#show_slider').hide()
  })
})
