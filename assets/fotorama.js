import $ from "jquery/dist/jquery.js";
window.$ = $

import _ from './index.css';

import _ from "fotorama/fotorama.js";
import _ from "fotorama/fotorama.css";

$(() => {
  $('#show_gallery').click(() => {
    $('#show_gallery').hide()
    $('#gallery_block').show()

    $('#gallery').fotorama()
  })
})
