import $ from './vendors/JQuery'

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
