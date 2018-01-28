import $ from './vendors/JQuery'

$(() => {
  $('body').css({color:'red'})

  $('#show_gallery').click(() => {
    $('#show_gallery').hide()

    import("./photo_gallery.jsx").then(_ => {
      $('#gallery_block').show()
      $('#gallery').fotorama()
    })
  })

  $('#show_slider').click(() => {
    $('#show_slider').hide()

    import("./vendors/rangeslider.js").then(_ => {
      $('#slider_block').show()
      $('#slider').rangeslider({polyfill: false})
    })
  })
})
