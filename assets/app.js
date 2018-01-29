import $ from '@jquery'

$(() => {
  $('body').css({color:'red'})

  $('#show_gallery').click(() => {
    $('#show_gallery').hide()

    import("@components/photo_gallery").then(_ => {
      $('#gallery_block').show()
      $('#gallery').fotorama()
    })
  })

  $('#show_slider').click(() => {
    $('#show_slider').hide()

    import("@rangeslider").then(_ => {
      $('#slider_block').show()
      $('#slider').rangeslider({polyfill: false})
    })
  })
})
